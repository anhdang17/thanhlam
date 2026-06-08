"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Textarea } from "@/components/shared/ui/textarea";
import { Switch } from "@/components/shared/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { categorySchema, type CategoryFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

interface Props {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    isFeatured: boolean;
    isActive: boolean;
    sortOrder: number;
  };
}

export function CategoryFormClient({ initialData }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState<string | undefined>(initialData?.image ?? undefined);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? undefined,
      description: initialData?.description ?? undefined,
      isFeatured: initialData?.isFeatured ?? false,
      sortOrder: initialData?.sortOrder ?? 0,
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    setSaving(true);
    try {
      const url = initialData
        ? `/api/admin/categories/${initialData.id}`
        : "/api/admin/categories";
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image }),
      });
      if (res.ok) {
        toast({ title: initialData ? "Cập nhật danh mục thành công!" : "Tạo danh mục thành công!" });
        router.push("/admin/categories");
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
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-text">{initialData ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Thông tin danh mục</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tên danh mục <span className="text-red-400">*</span></Label>
              <Input placeholder="VD: Giày" {...register("name")} />
              {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea rows={3} placeholder="Mô tả danh mục..." {...register("description")} />
            </div>
            <div className="space-y-2">
              <Label>URL Slug</Label>
              <Input placeholder="giay" {...register("slug")} />
              <p className="text-xs text-text-secondary">Để trống để tự động tạo từ tên</p>
            </div>
            <div className="flex items-center justify-between">
              <Label>Danh mục nổi bật</Label>
              <Switch onCheckedChange={(v) => setValue("isFeatured", v)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Hình ảnh</CardTitle></CardHeader>
          <CardContent>
            <ImageUploader
              value={image}
              onChange={(url) => setImage(url)}
              onClear={() => setImage(undefined)}
              label="Ảnh danh mục"
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="gap-2" disabled={saving}>
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</> : (initialData ? "Cập nhật danh mục" : "Tạo danh mục")}
        </Button>
      </form>
    </div>
  );
}
