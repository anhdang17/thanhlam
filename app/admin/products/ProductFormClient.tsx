"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Textarea } from "@/components/shared/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";
import { Switch } from "@/components/shared/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { productSchema, type ProductFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

interface Category { id: string; name: string; }
interface Brand { id: string; name: string; }
interface Props {
  categories: Category[];
  brands: Brand[];
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number | null;
    originalPrice: number | null;
    material: string | null;
    color: string | null;
    size: string | null;
    gender: "MALE" | "FEMALE" | "UNISEX";
    isFeatured: boolean;
    isActive: boolean;
    categoryId: string;
    brandId: string | null;
    images: { url: string }[];
  };
}

export function ProductFormClient({ categories, brands, initialData }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images.map((i) => i.url) ?? []);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? undefined,
      description: initialData?.description ?? undefined,
      price: initialData?.price ?? undefined,
      originalPrice: initialData?.originalPrice ?? undefined,
      material: initialData?.material ?? undefined,
      color: initialData?.color ?? undefined,
      size: initialData?.size ?? undefined,
      gender: initialData?.gender ?? "MALE",
      isFeatured: initialData?.isFeatured ?? false,
      categoryId: initialData?.categoryId ?? "",
      brandId: initialData?.brandId ?? undefined,
    },
  });

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    setSaving(true);
    try {
      const url = initialData
        ? `/api/admin/products/${initialData.id}`
        : "/api/admin/products";
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, images }),
      });
      if (res.ok) {
        toast({ title: initialData ? "Cập nhật sản phẩm thành công!" : "Tạo sản phẩm thành công!" });
        router.push("/admin/products");
        router.refresh();
      } else {
        const err = await res.json();
        throw new Error(err.error || "Lỗi");
      }
    } catch (e: any) {
      toast({ title: "Thất bại", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-text">{initialData ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
          <p className="text-sm text-text-secondary">Điền thông tin sản phẩm bên dưới</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle>Thông tin cơ bản</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tên sản phẩm <span className="text-red-400">*</span></Label>
                  <Input placeholder="Nhập tên sản phẩm" {...register("name")} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Mô tả</Label>
                  <Textarea rows={5} placeholder="Mô tả chi tiết sản phẩm..." {...register("description")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Giá</Label>
                    <Input type="number" placeholder="0" {...register("price")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Giá gốc</Label>
                    <Input type="number" placeholder="0" {...register("originalPrice")} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Chất liệu</Label>
                    <Input placeholder="Da, vải..." {...register("material")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Màu sắc</Label>
                    <Input placeholder="Đen, trắng..." {...register("color")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Size</Label>
                    <Input placeholder="39-44" {...register("size")} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader><CardTitle>Hình ảnh</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-background-secondary group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
                <ImageUploader
                  value={images[0]}
                  onChange={(url) => setImages((prev) => [...prev, url])}
                  onClear={() => setImages([])}
                  label="Tải ảnh lên"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle>Phân loại</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Danh mục <span className="text-red-400">*</span></Label>
                  <Select value={initialData?.categoryId} onValueChange={(v) => setValue("categoryId", v)}>
                    <SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && <p className="text-xs text-red-400">{errors.categoryId.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Thương hiệu</Label>
                  <Select value={initialData?.brandId ?? ""} onValueChange={(v) => setValue("brandId", v === "" ? undefined : v)}>
                    <SelectTrigger><SelectValue placeholder="Chọn thương hiệu" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Không chọn</SelectItem>
                      {brands.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <Select defaultValue={initialData?.gender ?? "MALE"} onValueChange={(v) => setValue("gender", v as "MALE" | "FEMALE" | "UNISEX")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Nam</SelectItem>
                      <SelectItem value="FEMALE">Nữ</SelectItem>
                      <SelectItem value="UNISEX">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Sản phẩm nổi bật</Label>
                  <Switch onCheckedChange={(v) => setValue("isFeatured", v)} />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={saving}>
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</> : (initialData ? "Cập nhật sản phẩm" : "Tạo sản phẩm")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
