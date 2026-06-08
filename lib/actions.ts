"use server";

import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";

// ===== PRODUCTS =====

export async function getProducts(params?: {
  search?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "popular";
  page?: number;
  limit?: number;
}) {
  const { search, categoryId, brandId, minPrice, maxPrice, sort = "newest", page = 1, limit = 12 } = params ?? {};

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    deletedAt: null,
    ...(categoryId && { categoryId }),
    ...(brandId && { brandId }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price_asc" ? { price: "asc" }
    : sort === "price_desc" ? { price: "desc" }
    : sort === "popular" ? { viewCount: "desc" }
    : { createdAt: "desc" };

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true,
        brand: true,
      },
    }),
    db.product.count({ where }),
  ]);

  return {
    products: products.map((p) => ({
      ...p,
      price: p.price != null ? Number(p.price) : null,
      originalPrice: p.originalPrice != null ? Number(p.originalPrice) : null,
      image: p.images[0]?.url ?? null,
      images: undefined,
    })),
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}

export async function getFeaturedProducts(limit = 8) {
  const products = await db.product.findMany({
    where: { isFeatured: true, isActive: true, deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: true,
      brand: true,
    },
  });
  return products.map((p) => ({
    ...p,
    price: p.price ? Number(p.price) : null,
    originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
    image: p.images[0]?.url ?? null,
    images: undefined,
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await db.product.findUnique({
    where: { slug, isActive: true, deletedAt: null },
    include: {
      images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] },
      category: true,
      brand: true,
      subCategory: true,
    },
  });
  if (product) {
    await db.product.update({
      where: { id: product.id },
      data: { viewCount: { increment: 1 } },
    });
    return {
      ...product,
      price: product.price != null ? Number(product.price) : null,
      originalPrice: product.originalPrice != null ? Number(product.originalPrice) : null,
    };
  }
  return product;
}

export async function getProductById(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] },
      category: true,
      brand: true,
    },
  });
  if (!product) return product;
  return {
    ...product,
    price: product.price != null ? Number(product.price) : null,
    originalPrice: product.originalPrice != null ? Number(product.originalPrice) : null,
  };
}

export async function createProduct(data: {
  name: string;
  slug?: string;
  description?: string;
  price?: number | null;
  originalPrice?: number | null;
  material?: string;
  color?: string;
  size?: string;
  gender: "MALE" | "FEMALE" | "UNISEX";
  isFeatured: boolean;
  categoryId: string;
  brandId?: string | null;
  subCategoryId?: string | null;
  images?: string[];
}) {
  const slug = data.slug || slugify(data.name);
  const product = await db.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      originalPrice: data.originalPrice,
      material: data.material,
      color: data.color,
      size: data.size,
      gender: data.gender,
      isFeatured: data.isFeatured,
      categoryId: data.categoryId,
      brandId: data.brandId,
      subCategoryId: data.subCategoryId,
      images: data.images
        ? {
            create: data.images.map((url, i) => ({
              url,
              isPrimary: i === 0,
              sortOrder: i,
            })),
          }
        : undefined,
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
  return product;
}

export async function updateProduct(id: string, data: {
  name?: string;
  slug?: string;
  description?: string;
  price?: number | null;
  originalPrice?: number | null;
  material?: string;
  color?: string;
  size?: string;
  gender?: "MALE" | "FEMALE" | "UNISEX";
  isFeatured?: boolean;
  isActive?: boolean;
  categoryId?: string;
  brandId?: string | null;
  subCategoryId?: string | null;
  images?: string[];
}) {
  const slug = data.slug ?? undefined;
  if (data.images) {
    await db.productImage.deleteMany({ where: { productId: id } });
  }
  const product = await db.product.update({
    where: { id },
    data: {
      ...data,
      slug,
      images: data.images
        ? {
            create: data.images.map((url, i) => ({
              url,
              isPrimary: i === 0,
              sortOrder: i,
            })),
          }
        : undefined,
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/products/[slug]");
  revalidatePath("/");
  return product;
}

export async function deleteProduct(id: string) {
  await db.product.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
}

// ===== CATEGORIES =====

export async function getCategories() {
  return db.category.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });
}

export async function getAllCategories() {
  return db.category.findMany({
    where: { deletedAt: null },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({
    where: { slug, isActive: true, deletedAt: null },
    include: { products: true, _count: { select: { products: true } } },
  });
}

export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isFeatured?: boolean;
  sortOrder?: number;
  parentId?: string | null;
}) {
  const slug = data.slug || slugify(data.name);
  const category = await db.category.create({
    data: { ...data, slug },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/");
  return category;
}

export async function updateCategory(id: string, data: {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  parentId?: string | null;
}) {
  const slug = data.slug ?? undefined;
  const category = await db.category.update({
    where: { id },
    data: { ...data, slug },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/");
  return category;
}

export async function deleteCategory(id: string) {
  await db.category.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/");
}

// ===== BRANDS =====

export async function getBrands() {
  return db.brand.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });
}

export async function getAllBrands() {
  return db.brand.findMany({
    where: { deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });
}

export async function getBrandBySlug(slug: string) {
  return db.brand.findUnique({
    where: { slug, isActive: true, deletedAt: null },
    include: { products: true },
  });
}

export async function createBrand(data: {
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  website?: string;
  isFeatured?: boolean;
}) {
  const slug = data.slug || slugify(data.name);
  const brand = await db.brand.create({
    data: { ...data, slug },
  });
  revalidatePath("/admin/brands");
  revalidatePath("/admin");
  revalidatePath("/");
  return brand;
}

export async function updateBrand(id: string, data: {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
  website?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}) {
  const slug = data.slug ?? undefined;
  const brand = await db.brand.update({
    where: { id },
    data: { ...data, slug },
  });
  revalidatePath("/admin/brands");
  revalidatePath("/admin");
  revalidatePath("/");
  return brand;
}

export async function deleteBrand(id: string) {
  await db.brand.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  revalidatePath("/admin/brands");
  revalidatePath("/admin");
  revalidatePath("/");
}

// ===== BANNERS =====

export async function getBanners() {
  return db.banner.findMany({
    where: { deletedAt: null },
    orderBy: [{ position: "asc" }, { createdAt: "desc" }],
  });
}

export async function getActiveBanners() {
  return db.banner.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: [{ position: "asc" }],
  });
}

export async function createBanner(data: {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  linkText?: string;
  position?: number;
  isActive?: boolean;
}) {
  const banner = await db.banner.create({ data });
  revalidatePath("/admin/banners");
  revalidatePath("/admin");
  revalidatePath("/");
  return banner;
}

export async function updateBanner(id: string, data: {
  title?: string;
  subtitle?: string;
  image?: string;
  link?: string;
  linkText?: string;
  position?: number;
  isActive?: boolean;
}) {
  const banner = await db.banner.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/banners");
  revalidatePath("/admin");
  revalidatePath("/");
  return banner;
}

export async function deleteBanner(id: string) {
  await db.banner.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/admin");
}

// ===== CONTACTS =====

export async function getContacts() {
  return db.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getUnreadContactCount() {
  return db.contact.count({ where: { isRead: false } });
}

export async function markContactAsRead(id: string) {
  return db.contact.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function deleteContact(id: string) {
  await db.contact.delete({ where: { id } });
  revalidatePath("/admin/contacts");
}

// ===== DASHBOARD STATS =====

export async function getDashboardStats() {
  const [productCount, categoryCount, brandCount, unreadCount] = await Promise.all([
    db.product.count({ where: { isActive: true, deletedAt: null } }),
    db.category.count({ where: { isActive: true, deletedAt: null } }),
    db.brand.count({ where: { isActive: true, deletedAt: null } }),
    db.contact.count({ where: { isRead: false } }),
  ]);
  return {
    productCount,
    categoryCount,
    brandCount,
    unreadCount,
  };
}

export async function getRecentContacts(limit = 5) {
  return db.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getTopProducts(limit = 5) {
  const products = await db.product.findMany({
    where: { isActive: true, deletedAt: null },
    orderBy: { viewCount: "desc" },
    take: limit,
    include: {
      images: { where: { isPrimary: true }, take: 1 },
    },
  });
  return products.map((p) => ({
    ...p,
    price: p.price != null ? Number(p.price) : null,
    originalPrice: p.originalPrice != null ? Number(p.originalPrice) : null,
  }));
}
