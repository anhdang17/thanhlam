"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Switch } from "@/components/shared/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { bannerSchema, type BannerFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

export default function NewBannerPage() {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: { title: "", subtitle: "", image: "", link: "", linkText: "Xem ngay", position: 0, isActive: true },
  });

  const onSubmit = async (data: BannerFormData) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast({ title: "Tạo banner thành công!" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/banners">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-text">Thêm banner mới</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Thông tin banner</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tiêu đề <span className="text-red-400">*</span></Label>
              <Input placeholder="VD: Bộ sưu tập mùa hè" {...register("title")} />
              {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Phụ đề</Label>
              <Input placeholder="VD: Sale up to 50%" {...register("subtitle")} />
            </div>
            <div className="space-y-2">
              <Label>Link liên kết</Label>
              <Input placeholder="/products" {...register("link")} />
            </div>
            <div className="space-y-2">
              <Label>Text nút</Label>
              <Input placeholder="Xem ngay" {...register("linkText")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vị trí</Label>
                <Input type="number" {...register("position")} />
              </div>
              <div className="flex items-center justify-between pt-6">
                <Label>Hoạt động</Label>
                <Switch onCheckedChange={(v) => setValue("isActive", v)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Hình ảnh banner</CardTitle></CardHeader>
          <CardContent>
            <ImageUploader
              value={watch("image")}
              onChange={(url) => setValue("image", url)}
              onClear={() => setValue("image", "")}
              label="Ảnh banner"
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="gap-2" disabled={saving}>
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</> : "Tạo banner"}
        </Button>
      </form>
    </div>
  );
}
