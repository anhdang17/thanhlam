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
import { brandSchema, type BrandFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

interface Props {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    website: string | null;
    isFeatured: boolean;
    isActive: boolean;
  };
}

export function BrandFormClient({ initialData }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [logo, setLogo] = useState<string | undefined>(initialData?.logo ?? undefined);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? undefined,
      description: initialData?.description ?? undefined,
      website: initialData?.website ?? undefined,
      isFeatured: initialData?.isFeatured ?? false,
    },
  });

  const onSubmit = async (data: BrandFormData) => {
    setSaving(true);
    try {
      const url = initialData
        ? `/api/admin/brands/${initialData.id}`
        : "/api/admin/brands";
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, logo }),
      });
      if (res.ok) {
        toast({ title: initialData ? "Cập nhật thương hiệu thành công!" : "Tạo thương hiệu thành công!" });
        router.push("/admin/brands");
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
        <Link href="/admin/brands">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-text">{initialData ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}</h2>
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

        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Logo</CardTitle></CardHeader>
          <CardContent>
            <ImageUploader
              value={logo}
              onChange={(url) => setLogo(url)}
              onClear={() => setLogo(undefined)}
              label="Logo thương hiệu"
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="gap-2" disabled={saving}>
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</> : (initialData ? "Cập nhật thương hiệu" : "Tạo thương hiệu")}
        </Button>
      </form>
    </div>
  );
}
