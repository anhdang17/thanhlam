import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/shared/ui/separator";
import { Button } from "@/components/shared/ui/button";
import { formatPrice } from "@/lib/utils";
import { getProductBySlug } from "@/lib/actions";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Sản phẩm" };
  return {
    title: product.name,
    description: product.description || `${product.name} - Chất lượng cao cấp tại THANH LÂM STORE`,
    openGraph: {
      title: product.name,
      description: product.description || "",
      images: product.images.map((img) => ({ url: img.url })),
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const hasDiscount = product.originalPrice && product.price && Number(product.originalPrice) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round((1 - Number(product.price) / Number(product.originalPrice!)) * 100)
    : 0;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-accent transition-colors">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            {product.images[0] && (
              <div className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border">
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {hasDiscount && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md">
                    -{discountPercent}%
                  </span>
                )}
              </div>
            )}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-accent/50 transition-colors cursor-pointer">
                    <Image src={img.url} alt="" fill className="object-cover" sizes="100px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">{product.brand?.name}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <span className="text-xl text-text-secondary line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              {[
                { label: "Chất liệu", value: product.material },
                { label: "Màu sắc", value: product.color },
                { label: "Size", value: product.size },
                { label: "Danh mục", value: product.category?.name },
              ].filter((item) => item.value).map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-sm text-text-secondary w-28">{item.label}:</span>
                  <span className="text-sm font-medium text-text">{item.value}</span>
                </div>
              ))}
            </div>

            <Separator />

            {product.description && (
              <div className="space-y-4">
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            <Separator />

            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full gap-2">
                Liên hệ đặt hàng
              </Button>
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
                <span className="flex items-center gap-1"><span className="w-4 h-4 text-green-400">&#10003;</span> Hàng chính hãng</span>
                <span className="flex items-center gap-1"><span className="w-4 h-4 text-green-400">&#10003;</span> Bảo hành 6 tháng</span>
                <span className="flex items-center gap-1"><span className="w-4 h-4 text-green-400">&#10003;</span> Đổi trả 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
