"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Textarea } from "@/components/shared/ui/textarea";
import { Switch } from "@/components/shared/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { categorySchema, type CategoryFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

export default function NewCategoryPage() {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "", isFeatured: false, sortOrder: 0 },
  });

  const onSubmit = async (data: CategoryFormData) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast({ title: "Tạo danh mục thành công!" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-text">Thêm danh mục mới</h2>
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

        <Button type="submit" size="lg" className="gap-2" disabled={saving}>
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</> : "Tạo danh mục"}
        </Button>
      </form>
    </div>
  );
}
