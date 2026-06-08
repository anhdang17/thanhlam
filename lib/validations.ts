import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự").max(100),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự").max(2000),
});

export const productSchema = z.object({
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự").max(200),
  slug: z.string().min(2).max(200).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().optional().nullable(),
  originalPrice: z.coerce.number().positive().optional().nullable(),
  material: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "UNISEX"]).default("MALE"),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  subCategoryId: z.string().optional().nullable(),
  brandId: z.string().optional().nullable(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Tên danh mục phải có ít nhất 2 ký tự").max(100),
  slug: z.string().min(2).max(100).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  isFeatured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  parentId: z.string().optional().nullable(),
});

export const brandSchema = z.object({
  name: z.string().min(2, "Tên thương hiệu phải có ít nhất 2 ký tự").max(100),
  slug: z.string().min(2).max(100).optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
});

export const bannerSchema = z.object({
  title: z.string().min(2, "Tiêu đề phải có ít nhất 2 ký tự").max(200),
  subtitle: z.string().optional(),
  image: z.string().min(1, "Vui lòng chọn ảnh banner"),
  link: z.string().url().optional().or(z.literal("")),
  linkText: z.string().max(50).optional(),
  position: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "popular"]).default("newest"),
  page: z.coerce.number().int().positive().default(1),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type BrandFormData = z.infer<typeof brandSchema>;
export type BannerFormData = z.infer<typeof bannerSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
