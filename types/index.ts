import { type Gender } from "@prisma/client";

export interface ProductWithRelations {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: import("@prisma/client/runtime/library").Decimal | null;
  originalPrice: import("@prisma/client/runtime/library").Decimal | null;
  material: string | null;
  color: string | null;
  size: string | null;
  gender: Gender;
  isFeatured: boolean;
  isActive: boolean;
  viewCount: number;
  categoryId: string;
  subCategoryId: string | null;
  brandId: string | null;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  subCategory: {
    id: string;
    name: string;
    slug: string;
  } | null;
  brand: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
  } | null;
  images: {
    id: string;
    url: string;
    publicId: string | null;
    alt: string | null;
    isPrimary: boolean;
    sortOrder: number;
  }[];
}

export interface CategoryWithChildren {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isFeatured: boolean;
  children: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  totalContacts: number;
  recentContacts: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    isRead: boolean;
  }[];
  featuredProducts: {
    id: string;
    name: string;
    slug: string;
    viewCount: number;
    _count: { images: number };
  }[];
}

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};
