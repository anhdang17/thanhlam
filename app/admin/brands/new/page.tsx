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
import { brandSchema, type BrandFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

export default function NewBrandPage() {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: { name: "", description: "", website: "", isFeatured: false },
  });

  const onSubmit = async (data: BrandFormData) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast({ title: "Tạo thương hiệu thành công!" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/brands">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-text">Thêm thương hiệu mới</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Thông tin thương hiệu</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tên thương hiệu <span className="text-red-400">*</span></Label>
              <Input placeholder="VD: Nike" {...register("name")} />
              {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea rows={3} placeholder="Mô tả thương hiệu..." {...register("description")} />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input placeholder="https://nike.com" {...register("website")} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Thương hiệu nổi bật</Label>
              <Switch onCheckedChange={(v) => setValue("isFeatured", v)} />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="gap-2" disabled={saving}>
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</> : "Tạo thương hiệu"}
        </Button>
      </form>
    </div>
  );
}
