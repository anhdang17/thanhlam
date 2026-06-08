"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";
import { deleteBrand } from "@/lib/actions";

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  isFeatured: boolean;
  isActive: boolean;
  _count: { products: number };
}

interface Props {
  initialBrands: Brand[];
}

export function AdminBrandsClient({ initialBrands }: Props) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [brands, setBrands] = useState(initialBrands);

  const filtered = brands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = () => {
    if (!deleteId) return;
    startTransition(async () => {
      await deleteBrand(deleteId);
      setBrands((prev) => prev.filter((b) => b.id !== deleteId));
      setDeleteId(null);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Thương hiệu</h2>
          <p className="text-sm text-text-secondary">{filtered.length} thương hiệu</p>
        </div>
        <Link href="/admin/brands/new">
          <Button className="gap-2"><Plus className="w-4 h-4" /> Thêm thương hiệu</Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <Input placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Thương hiệu</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Slug</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Sản phẩm</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Nổi bật</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((brand) => (
                <tr key={brand.id} className="hover:bg-background-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {brand.logo ? (
                        <img src={brand.logo} alt="" className="w-10 h-10 rounded-lg object-cover bg-background-secondary" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-accent">{brand.name[0]}</span>
                        </div>
                      )}
                      <span className="font-medium text-text">{brand.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary hidden md:table-cell">{brand.slug}</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">{brand._count.products}</td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${brand.isFeatured ? "bg-green-500/10 text-green-400" : "bg-background-secondary text-text-secondary"}`}>
                      {brand.isFeatured ? "Có" : "Không"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/admin/brands/${brand.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                      </Link>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-text-secondary hover:text-red-400" onClick={() => setDeleteId(brand.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá thương hiệu</DialogTitle>
            <DialogDescription>Thương hiệu sẽ bị ẩn khỏi website.</DialogDescription>
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
