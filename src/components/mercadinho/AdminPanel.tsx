import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ImagePlus, Loader2, LogOut, Lock, Mail, Plus, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/data/catalog";
import { useStaleGuard } from "@/hooks/use-stale-guard";
import { createFileFingerprint } from "@/lib/file-fingerprint";
import type { Category, Product, ProductInput } from "@/models/product";
import {
  compressImageForUpload,
  fileToDataUrl,
  formatFileSize,
  revokeCompressedImagePreview,
  type CompressedImage,
} from "@/services/image-compression";
import { formatBRL } from "@/services/whatsapp";
import { BrandLogo } from "@/components/mercadinho/BrandLogo";
import { STORE } from "@/config/store";

interface Props {
  products: Product[];
  onAdd: (p: ProductInput) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function AdminPanel({ products, onAdd, onDelete, onBack }: Props) {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <LoginScreen onBack={onBack} onSuccess={() => setAuthed(true)} />;

  return (
    <Dashboard
      products={products}
      onAdd={onAdd}
      onDelete={onDelete}
      onLogout={() => {
        setAuthed(false);
        onBack();
      }}
    />
  );
}

function LoginScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-surface px-4 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-sm">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a loja
        </button>
        <div className="rounded-3xl bg-card p-8 shadow-card">
          <div className="mb-6 flex flex-col items-center text-center">
            <BrandLogo size="xl" className="rounded-2xl bg-white p-2 shadow-soft" />
            <h1 className="mt-4 text-xl font-bold tracking-tight">Acesso Restrito</h1>
            <p className="mt-1 text-sm text-muted-foreground">{STORE.name}</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSuccess();
            }}
            className="space-y-3"
          >
            <Field icon={<Mail className="h-4 w-4" />} type="email" placeholder="E-mail" value={email} onChange={setEmail} />
            <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder="Senha" value={password} onChange={setPassword} />
            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              Entrar
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo · qualquer credencial entra
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  type,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-input px-4 py-3.5 focus-within:ring-2 focus-within:ring-ring">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}

function Dashboard({
  products,
  onAdd,
  onDelete,
  onLogout,
}: {
  products: Product[];
  onAdd: (p: ProductInput) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Hortifrúti");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [compressedImage, setCompressedImage] = useState<CompressedImage | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const compressedImageRef = useRef<CompressedImage | null>(null);
  const lastFingerprintRef = useRef<string | null>(null);
  const { nextGeneration, isStale } = useStaleGuard();

  compressedImageRef.current = compressedImage;

  useEffect(() => {
    return () => revokeCompressedImagePreview(compressedImageRef.current);
  }, []);

  const resetImage = () => {
    revokeCompressedImagePreview(compressedImage);
    setCompressedImage(null);
    setImageDataUrl("");
    setImageError(null);
    lastFingerprintRef.current = null;
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = async (file?: File) => {
    if (!file || isCompressing || isSubmitting) return;

    const fingerprint = createFileFingerprint(file);
    if (fingerprint === lastFingerprintRef.current && compressedImage) return;

    const generation = nextGeneration();
    setImageError(null);
    setIsCompressing(true);

    try {
      revokeCompressedImagePreview(compressedImage);
      const result = await compressImageForUpload(file);
      if (isStale(generation)) {
        revokeCompressedImagePreview(result);
        return;
      }

      const dataUrl = await fileToDataUrl(result.file);
      if (isStale(generation)) {
        revokeCompressedImagePreview(result);
        return;
      }

      lastFingerprintRef.current = fingerprint;
      setCompressedImage(result);
      setImageDataUrl(dataUrl);
    } catch (error) {
      resetImage();
      setImageError(error instanceof Error ? error.message : "Erro ao processar a imagem.");
    } finally {
      if (!isStale(generation)) {
        setIsCompressing(false);
      }
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !newPrice || isSubmitting || isCompressing) return;

    const generation = nextGeneration();
    setIsSubmitting(true);
    try {
      onAdd({
        name,
        category,
        oldPrice: parseFloat(oldPrice) || parseFloat(newPrice) * 1.2,
        newPrice: parseFloat(newPrice),
        image:
          imageDataUrl ||
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
      });

      if (isStale(generation)) return;

      setName("");
      setOldPrice("");
      setNewPrice("");
      resetImage();
    } finally {
      if (!isStale(generation)) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-surface pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
        <div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6">
          <BrandLogo size="sm" className="rounded-lg bg-white p-0.5 shadow-soft" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Painel administrativo</p>
            <h1 className="truncate text-lg font-bold tracking-tight">Gestão da loja 👋</h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-muted touch-manipulation"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Produtos ativos" value={products.length.toString()} />
          <Stat label="Em oferta" value={products.length.toString()} />
          <Stat label="Categorias" value={CATEGORIES.length.toString()} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <section className="rounded-3xl bg-card p-6 shadow-soft lg:col-span-2">
            <h2 className="text-base font-bold tracking-tight">Cadastrar nova oferta</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Aparece imediatamente na vitrine. Fotos são compactadas automaticamente antes do envio.
            </p>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <Input label="Nome do produto" value={name} onChange={setName} placeholder="Ex: Refrigerante 2L" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full rounded-2xl bg-input px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Preço anterior" value={oldPrice} onChange={setOldPrice} placeholder="12,90" type="number" />
                <Input label="Preço novo" value={newPrice} onChange={setNewPrice} placeholder="8,99" type="number" required />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Imagem</label>
                <button
                  type="button"
                  disabled={isCompressing}
                  onClick={() => fileRef.current?.click()}
                  className="relative grid h-40 w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-input transition hover:border-primary hover:bg-secondary disabled:cursor-wait disabled:opacity-70"
                >
                  {isCompressing ? (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-xs font-medium">Compactando foto...</span>
                    </div>
                  ) : compressedImage ? (
                    <img
                      src={compressedImage.previewUrl}
                      alt="Pré-visualização"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImagePlus className="h-6 w-6" />
                      <span className="text-xs font-medium">Toque para enviar imagem</span>
                    </div>
                  )}
                </button>
                {compressedImage && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatFileSize(compressedImage.originalSize)} →{" "}
                    <span className="font-semibold text-primary">
                      {formatFileSize(compressedImage.compressedSize)}
                    </span>{" "}
                    · {compressedImage.width}×{compressedImage.height}px
                  </p>
                )}
                {imageError && <p className="mt-2 text-xs text-destructive">{imageError}</p>}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => void handleFile(e.target.files?.[0])}
                />
              </div>

              <button
                type="submit"
                disabled={isCompressing || isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus className="h-4 w-4" /> Adicionar à vitrine
              </button>
            </form>
          </section>

          {/* Manager */}
          <section className="rounded-3xl bg-card p-6 shadow-soft lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight">Produtos na vitrine</h2>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {products.length}
              </span>
            </div>

            {products.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                Sem produtos. Cadastre o primeiro ao lado.
              </div>
            ) : (
              <ul className="mt-5 space-y-3">
                {products.map((p) => (
                  <li
                    key={p.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl bg-surface p-3"
                  >
                    <img src={p.image} alt={p.name} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.category} · <span className="line-through">{formatBRL(p.oldPrice)}</span>{" "}
                        <span className="font-semibold text-primary">{formatBRL(p.newPrice)}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-destructive-foreground"
                      aria-label={`Excluir ${p.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        type={type}
        step="any"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-input px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-soft">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
