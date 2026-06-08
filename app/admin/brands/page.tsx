"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card, CardContent } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";

const brands = [
  { id: "1", name: "Nike", slug: "nike", productCount: 8, isFeatured: true, isActive: true, logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" },
  { id: "2", name: "Adidas", slug: "adidas", productCount: 6, isFeatured: true, isActive: true, logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=100&q=80" },
  { id: "3", name: "Puma", slug: "puma", productCount: 4, isFeatured: false, isActive: true, logo: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&q=80" },
  { id: "4", name: "New Balance", slug: "new-balance", productCount: 3, isFeatured: true, isActive: true, logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=100&q=80" },
  { id: "5", name: "Converse", slug: "converse", productCount: 5, isFeatured: true, isActive: true, logo: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=100&q=80" },
  { id: "6", name: "Biti's", slug: "bitis", productCount: 7, isFeatured: true, isActive: true, logo: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=100&q=80" },
  { id: "7", name: "Casio", slug: "casio", productCount: 3, isFeatured: false, isActive: true, logo: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&q=80" },
  { id: "8", name: "Samsonite", slug: "samsonite", productCount: 2, isFeatured: false, isActive: true, logo: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=100&q=80" },
  { id: "9", name: "Reuzel", slug: "reuzel", productCount: 2, isFeatured: false, isActive: true, logo: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=100&q=80" },
];

export default function AdminBrandsPage() {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = brands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

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
                      <img src={brand.logo} alt="" className="w-10 h-10 rounded-lg object-cover bg-background-secondary" />
                      <span className="font-medium text-text">{brand.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary hidden md:table-cell">{brand.slug}</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">{brand.productCount}</td>
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
            <DialogDescription>Bạn có chắc muốn xoá thương hiệu này?</DialogDescription>
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
