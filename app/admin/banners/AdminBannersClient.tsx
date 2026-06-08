"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Card } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";
import { deleteBanner } from "@/lib/actions";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  isActive: boolean;
  position: number;
}

interface Props {
  initialBanners: Banner[];
}

export function AdminBannersClient({ initialBanners }: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [banners, setBanners] = useState(initialBanners);

  const handleDelete = () => {
    if (!deleteId) return;
    startTransition(async () => {
      await deleteBanner(deleteId);
      setBanners((prev) => prev.filter((b) => b.id !== deleteId));
      setDeleteId(null);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Banners</h2>
          <p className="text-sm text-text-secondary">{banners.length} banner</p>
        </div>
        <Link href="/admin/banners/new">
          <Button className="gap-2"><Plus className="w-4 h-4" /> Thêm banner</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <Card key={banner.id} className="bg-card border-border overflow-hidden group">
            <div className="relative aspect-[16/7] bg-background-secondary">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Link href={`/admin/banners/${banner.id}/edit`}>
                  <Button size="sm" variant="secondary"><Pencil className="w-4 h-4 mr-1" /> Sửa</Button>
                </Link>
                <Button size="sm" variant="destructive" onClick={() => setDeleteId(banner.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
              {!banner.isActive && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="px-3 py-1 bg-black/80 text-white text-sm rounded">Tạm khoá</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-text">{banner.title}</h3>
              <p className="text-sm text-text-secondary">{banner.subtitle}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-text-secondary">Vị trí: {banner.position}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${banner.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                  {banner.isActive ? "Hoạt động" : "Tạm khoá"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá banner</DialogTitle>
            <DialogDescription>Bạn có chắc muốn xoá banner này?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Huỷ</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
              {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang xoá...</> : "Xoá"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
