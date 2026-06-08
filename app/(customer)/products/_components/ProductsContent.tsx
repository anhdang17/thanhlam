"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";

const ITEMS_PER_PAGE = 12;

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number | null;
  originalPrice: number | null;
  image: string | null;
  category?: { name: string } | null;
  brand?: { name: string } | null;
  isFeatured: boolean;
}

interface Category { id: string; name: string; slug: string; }
interface Brand { id: string; name: string; }

interface Props {
  initialProducts: Product[];
  initialTotal: number;
  categories: Category[];
  brands: Brand[];
}

export function ProductsContent({ initialProducts, initialTotal, categories, brands }: Props) {
  const searchParams = useSearchParams();
  const initialCategorySlug = searchParams.get("category") || "";
  const matchedCategory = categories.find((c) => c.slug === initialCategorySlug);
  const initialCategoryId = matchedCategory?.id || "";

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [brandId, setBrandId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const categoryName = categories.find((c) => c.id === categoryId)?.name || "";

  const filtered = initialProducts.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryId && p.category?.name !== categoryName) return false;
    if (brandId && p.brand?.name !== brands.find((b) => b.id === brandId)?.name) return false;
    if (minPrice && (p.price === null || p.price < Number(minPrice))) return false;
    if (maxPrice && (p.price === null || p.price > Number(maxPrice))) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price_asc") return (a.price ?? 0) - (b.price ?? 0);
    if (sort === "price_desc") return (b.price ?? 0) - (a.price ?? 0);
    if (sort === "popular") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch("");
    setCategoryId("");
    setBrandId("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setPage(1);
  };

  const hasFilters = search || categoryId || brandId || minPrice || maxPrice;

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-background-secondary/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Sản phẩm</h1>
            <p className="text-text-secondary">{filtered.length} sản phẩm</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <label className="text-sm font-medium text-text mb-2 block">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <Input
                    placeholder="Tên sản phẩm..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text mb-2 block">Danh mục</label>
                <Select value={categoryId} onValueChange={(v) => { setCategoryId(v); setPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Tất cả" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-text mb-2 block">Thương hiệu</label>
                <Select value={brandId} onValueChange={(v) => { setBrandId(v); setPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Tất cả" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả</SelectItem>
                    {brands.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-text mb-2 block">Khoảng giá</label>
                <div className="flex gap-2 items-center">
                  <Input type="number" placeholder="Từ" value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setPage(1); }} className="text-sm" />
                  <span className="text-text-secondary">-</span>
                  <Input type="number" placeholder="Đến" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }} className="text-sm" />
                </div>
              </div>

              {hasFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full gap-2">
                  <X className="w-4 h-4" />
                  Xoá bộ lọc
                </Button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-secondary">
                Hiển thị {filtered.length > 0 ? `${(page - 1) * ITEMS_PER_PAGE + 1}-${Math.min(page * ITEMS_PER_PAGE, filtered.length)}` : "0"} của {filtered.length} sản phẩm
              </p>
              <Select value={sort} onValueChange={(v) => { setSort(v); setPage(1); }}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="price_asc">Giá: Thấp đến cao</SelectItem>
                  <SelectItem value="price_desc">Giá: Cao đến thấp</SelectItem>
                  <SelectItem value="popular">Phổ biến nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-secondary mb-4">Không tìm thấy sản phẩm nào.</p>
                <Button variant="outline" onClick={clearFilters}>Xoá bộ lọc</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                {paginated.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button variant="outline" size="icon" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="w-10">
                    {p}
                  </Button>
                ))}
                <Button variant="outline" size="icon" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
