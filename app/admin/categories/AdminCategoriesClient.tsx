"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";
import { deleteCategory } from "@/lib/actions";

interface Category {
  id: string;
  name: string;
  slug: string;
  isFeatured: boolean;
  isActive: boolean;
  _count: { products: number };
  images?: { url: string }[];
}

interface Props {
  initialCategories: Category[];
}

export function AdminCategoriesClient({ initialCategories }: Props) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState(initialCategories);

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = () => {
    if (!deleteId) return;
    startTransition(async () => {
      await deleteCategory(deleteId);
      setCategories((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    });
  };

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
              {cat.images?.[0]?.url ? (
                <img src={cat.images[0].url} alt={cat.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-3xl font-bold text-white/30">{cat.name[0]}</span>
                </div>
              )}
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
              <p className="text-sm text-text-secondary">{cat._count.products} sản phẩm</p>
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
            <DialogDescription>Danh mục sẽ bị ẩn khỏi website. Sản phẩm trong danh mục sẽ không bị xoá.</DialogDescription>
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
