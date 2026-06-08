"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";

const allProducts = [
  { id: "1", slug: "giay-nike-air-max-90", name: "Giày Nike Air Max 90", price: 3500000, originalPrice: 4200000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", brand: "Nike", category: "Giày", isFeatured: true },
  { id: "2", slug: "giay-adidas-ultraboost", name: "Giày Adidas Ultraboost 23", price: 4800000, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80", brand: "Adidas", category: "Giày", isFeatured: true },
  { id: "3", slug: "balo-laptop-pro", name: "Balo Laptop Pro 15 inch", price: 890000, originalPrice: 1200000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", brand: "Thanh Lam", category: "Balo", isFeatured: true },
  { id: "4", slug: "dep-bitip-hunter", name: "Dép Biti's Hunter Classic", price: 450000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80", brand: "Biti's", category: "Dép", isFeatured: false },
  { id: "5", slug: "vali-du-lich-nhua", name: "Vali Du Lịch Nhựa ABS 24 inch", price: 1800000, originalPrice: 2200000, image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&q=80", brand: "Samsonite", category: "Vali", isFeatured: true },
  { id: "6", slug: "dong-ho-casio-edifice", name: "Đồng Hồ Casio Edifice", price: 3500000, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80", brand: "Casio", category: "Phụ kiện", isFeatured: true },
  { id: "7", slug: "that-lung-da-cao-cap", name: "Thắt Lưng Da Bò Cao Cấp", price: 650000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80", brand: "Thanh Lam", category: "Thắt lưng", isFeatured: false },
  { id: "8", slug: "giay-converse-chuck-taylor", name: "Giày Converse Chuck Taylor All Star", price: 1600000, image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80", brand: "Converse", category: "Giày", isFeatured: true },
  { id: "9", slug: "giay-puma-suede-classic", name: "Giày Puma Suede Classic", price: 2100000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80", brand: "Puma", category: "Giày", isFeatured: false },
  { id: "10", slug: "giay-new-balance-574", name: "Giày New Balance 574", price: 2800000, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80", brand: "New Balance", category: "Giày", isFeatured: true },
  { id: "11", slug: "dep-tong-go", name: "Dép Tông Gỗ Cao Cấp", price: 280000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80", brand: "Thanh Lam", category: "Dép", isFeatured: false },
  { id: "12", slug: "gum-xit-toc-reuzel", name: "Gôm Xịt Tóc Reuzel Pomade", price: 350000, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&q=80", brand: "Reuzel", category: "Chăm sóc cá nhân", isFeatured: false },
];

const ITEMS_PER_PAGE = 12;

const categories = ["Tất cả", "Giày", "Dép", "Balo", "Vali", "Phụ kiện", "Thắt lưng", "Chăm sóc cá nhân"];
const brands = ["Tất cả", "Nike", "Adidas", "Puma", "New Balance", "Converse", "Biti's", "Casio", "Samsonite", "Thanh Lam", "Reuzel"];

export function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category && category !== "Tất cả") result = result.filter((p) => p.category === category);
    if (brand && brand !== "Tất cả") result = result.filter((p) => p.brand === brand);
    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));
    if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "popular") result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return result;
  }, [search, category, brand, minPrice, maxPrice, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setPage(1);
  };

  const hasFilters = search || (category && category !== "Tất cả") || (brand && brand !== "Tất cả") || minPrice || maxPrice;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
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
          {/* Filters Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
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

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-text mb-2 block">Danh mục</label>
                <Select value={category || "Tất cả"} onValueChange={(v) => { setCategory(v === "Tất cả" ? "" : v); setPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Danh mục" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand */}
              <div>
                <label className="text-sm font-medium text-text mb-2 block">Thương hiệu</label>
                <Select value={brand || "Tất cả"} onValueChange={(v) => { setBrand(v === "Tất cả" ? "" : v); setPage(1); }}>
                  <SelectTrigger><SelectValue placeholder="Thương hiệu" /></SelectTrigger>
                  <SelectContent>
                    {brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
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

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort & results */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-secondary">
                Hiển thị {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, filtered.length)} của {filtered.length} sản phẩm
              </p>
              <Select value={sort} onValueChange={setSort}>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button variant="outline" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="w-10">
                    {p}
                  </Button>
                ))}
                <Button variant="outline" size="icon" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
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
