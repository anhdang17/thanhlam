"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/shared/ui/dialog";
import { formatPrice } from "@/lib/utils";

const products = [
  { id: "1", name: "Giày Nike Air Max 90", price: 3500000, originalPrice: 4200000, category: "Giày", brand: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80", isFeatured: true, isActive: true },
  { id: "2", name: "Giày Adidas Ultraboost 23", price: 4800000, category: "Giày", brand: "Adidas", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&q=80", isFeatured: true, isActive: true },
  { id: "3", name: "Balo Laptop Pro 15 inch", price: 890000, originalPrice: 1200000, category: "Balo", brand: "Thanh Lam", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80", isFeatured: true, isActive: true },
  { id: "4", name: "Dép Biti's Hunter Classic", price: 450000, category: "Dép", brand: "Biti's", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=200&q=80", isFeatured: false, isActive: true },
  { id: "5", name: "Vali Du Lịch Nhựa ABS 24 inch", price: 1800000, originalPrice: 2200000, category: "Vali", brand: "Samsonite", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=200&q=80", isFeatured: true, isActive: true },
  { id: "6", name: "Đồng Hồ Casio Edifice", price: 3500000, category: "Phụ kiện", brand: "Casio", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&q=80", isFeatured: true, isActive: true },
  { id: "7", name: "Thắt Lưng Da Bò Cao Cấp", price: 650000, category: "Thắt lưng", brand: "Thanh Lam", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=200&q=80", isFeatured: false, isActive: false },
  { id: "8", name: "Giày Converse Chuck Taylor", price: 1600000, category: "Giày", brand: "Converse", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=200&q=80", isFeatured: true, isActive: true },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Sản phẩm</h2>
          <p className="text-sm text-text-secondary">{filtered.length} sản phẩm</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 max-w-md"
        />
      </div>

      {/* Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Sản phẩm</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Danh mục</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Thương hiệu</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Giá</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Nổi bật</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-background-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-background-secondary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs text-text-secondary md:hidden">{product.category} / {product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary hidden md:table-cell">{product.category}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary hidden md:table-cell">{product.brand}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-accent">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-xs text-text-secondary line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${product.isFeatured ? "bg-green-500/10 text-green-400" : "bg-background-secondary text-text-secondary"}`}>
                      {product.isFeatured ? "Có" : "Không"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/products/${product.id}`} className="p-2 rounded-md hover:bg-background-secondary text-text-secondary hover:text-text transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="p-2 rounded-md hover:bg-background-secondary text-text-secondary hover:text-accent transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="p-2 rounded-md hover:bg-red-500/10 text-text-secondary hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">Không tìm thấy sản phẩm nào.</p>
          </div>
        )}
      </Card>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá sản phẩm</DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn xoá sản phẩm này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Huỷ</Button>
            <Button variant="destructive" onClick={() => { setDeleteId(null); }}>Xoá</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
