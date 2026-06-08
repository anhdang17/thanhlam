"use client";

import { useState } from "react";
import Link from "next/link";
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
import { productSchema, type ProductFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "cat1", name: "Giày" },
  { id: "cat2", name: "Dép" },
  { id: "cat3", name: "Balo" },
  { id: "cat4", name: "Vali" },
  { id: "cat5", name: "Phụ kiện" },
  { id: "cat6", name: "Thắt lưng" },
  { id: "cat7", name: "Chăm sóc cá nhân" },
];

const brands = [
  { id: "b1", name: "Nike" },
  { id: "b2", name: "Adidas" },
  { id: "b3", name: "Puma" },
  { id: "b4", name: "New Balance" },
  { id: "b5", name: "Converse" },
  { id: "b6", name: "Biti's" },
  { id: "b7", name: "Casio" },
  { id: "b8", name: "Samsonite" },
];

export default function NewProductPage() {
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", description: "", price: undefined, originalPrice: undefined, material: "", color: "", size: "", gender: "MALE", isFeatured: false, categoryId: "", brandId: undefined },
  });

  const handleImageUpload = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    toast({ title: "Tạo sản phẩm thành công!", variant: "default" });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-text">Thêm sản phẩm mới</h2>
          <p className="text-sm text-text-secondary">Điền thông tin sản phẩm bên dưới</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
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

            {/* Images */}
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
                  {images.length === 0 && (
                    <div className="col-span-3 flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg">
                      <p className="text-sm text-text-secondary">Chưa có ảnh nào</p>
                    </div>
                  )}
                </div>
                <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => handleImageUpload("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80")}>
                  <Plus className="w-4 h-4" />
                  Thêm ảnh
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle>Phân loại</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Danh mục <span className="text-red-400">*</span></Label>
                  <Select onValueChange={(v) => setValue("categoryId", v)}>
                    <SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && <p className="text-xs text-red-400">{errors.categoryId.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Thương hiệu</Label>
                  <Select onValueChange={(v) => setValue("brandId", v)}>
                    <SelectTrigger><SelectValue placeholder="Chọn thương hiệu" /></SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <Select defaultValue="MALE" onValueChange={(v) => setValue("gender", v as "MALE" | "FEMALE" | "UNISEX")}>
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
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</> : "Tạo sản phẩm"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
