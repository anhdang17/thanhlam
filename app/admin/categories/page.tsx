"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";

const categories = [
  { id: "1", name: "Giày", slug: "giay", productCount: 12, isFeatured: true, isActive: true, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
  { id: "2", name: "Dép", slug: "dep", productCount: 8, isFeatured: true, isActive: true, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=200&q=80" },
  { id: "3", name: "Balo", slug: "balo", productCount: 6, isFeatured: true, isActive: true, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80" },
  { id: "4", name: "Vali", slug: "vali", productCount: 4, isFeatured: false, isActive: true, image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=200&q=80" },
  { id: "5", name: "Phụ kiện", slug: "phu-kien", productCount: 15, isFeatured: true, isActive: true, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&q=80" },
  { id: "6", name: "Thắt lưng", slug: "that-lung", productCount: 5, isFeatured: false, isActive: true, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=200&q=80" },
  { id: "7", name: "Chăm sóc cá nhân", slug: "cham-soc-ca-nhan", productCount: 3, isFeatured: false, isActive: true, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=200&q=80" },
  { id: "8", name: "Trang sức", slug: "trang-suc", productCount: 7, isFeatured: false, isActive: false, image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=200&q=80" },
];

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Danh mục</h2>
          <p className="text-sm text-text-secondary">{filtered.length} danh mục</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="gap-2"><Plus className="w-4 h-4" /> Thêm danh mục</Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <Input placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((cat) => (
          <Card key={cat.id} className="bg-card border-border overflow-hidden group">
            <div className="relative aspect-video bg-background-secondary">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/categories/${cat.id}/edit`}>
                  <Button size="icon" variant="secondary" className="h-7 w-7"><Pencil className="w-3 h-3" /></Button>
                </Link>
                <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => setDeleteId(cat.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
              {cat.isFeatured && <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-white text-[10px] font-semibold rounded">Nổi bật</span>}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-text">{cat.name}</h3>
              <p className="text-sm text-text-secondary">{cat.productCount} sản phẩm</p>
              <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${cat.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                {cat.isActive ? "Hoạt động" : "Tạm khoá"}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá danh mục</DialogTitle>
            <DialogDescription>Bạn có chắc muốn xoá danh mục này? Sản phẩm trong danh mục sẽ không bị xoá.</DialogDescription>
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
