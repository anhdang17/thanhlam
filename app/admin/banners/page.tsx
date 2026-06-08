"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";

const banners = [
  { id: "1", title: "Bộ sưu tập giày mới", subtitle: "Nike xem ngay", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", isActive: true, position: 1 },
  { id: "2", title: "Sale up to 50%", subtitle: "Khuyến mãi lớn", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80", isActive: true, position: 2 },
  { id: "3", title: "Lookbook mùa hè", subtitle: "Xu hướng 2026", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", isActive: false, position: 3 },
];

export default function AdminBannersPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
            <Button variant="destructive" onClick={() => setDeleteId(null)}>Xoá</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
