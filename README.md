# THANH LÂM STORE

Website giới thiệu sản phẩm thời trang nam cao cấp. Được xây dựng với Next.js 15, Prisma, Cookie-based Authentication, và Cloudinary.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React
- **UI**: Shadcn UI (Radix UI primitives)
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Auth**: Cookie-based (env credentials)
- **Storage**: Cloudinary
- **Validation**: Zod + React Hook Form
- **Deploy**: Vercel

## Yêu cầu

- Node.js 18+
- PostgreSQL database (Neon)
- Cloudinary account

## Thông tin đăng nhập Admin

> **Tài khoản duy nhất:**
> - **Username:** `thanhlamstore`
> - **Password:** `thanhlam94`
>
> Truy cập: `/admin/login`

## Cài đặt

### 1. Clone và cài dependencies

```bash
npm install
```

### 2. Cấu hình biến môi trường

```bash
cp .env.example .env
```

Sau đó điền các giá trị:

| Biến | Mô tả |
|-------|--------|
| `DATABASE_URL` | Connection string từ Neon PostgreSQL |
| `ADMIN_USERNAME` | Tên đăng nhập admin (mặc định: thanhlamstore) |
| `ADMIN_PASSWORD` | Mật khẩu admin (mặc định: thanhlam94) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Từ Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Từ Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Từ Cloudinary Dashboard |
| `NEXT_PUBLIC_APP_URL` | URL app (http://localhost:3000) |

### 3. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed data (optional)
npm run db:seed
```

### 4. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Cấu trúc thư mục

```
app/
  (customer)/           # Public pages
    _components/       # Customer-specific components
    products/          # Products listing & detail
    about/             # About page
    lookbook/          # Lookbook page
    contact/           # Contact page
  admin/               # Admin dashboard
    login/             # Login page
    products/           # Product CRUD
    categories/        # Category CRUD
    brands/            # Brand CRUD
    banners/           # Banner CRUD
    contacts/          # Contact management
  api/                 # API routes
    admin/             # Admin auth (login/logout)
    contact/           # Contact form
    upload/           # Image upload (admin only)
components/
  shared/              # Shared components
    ui/               # Shadcn UI base components
lib/                   # Utilities & config
types/                 # TypeScript types
prisma/
  schema.prisma        # Database schema
  seed.ts              # Seed data
```

## Scripts

| Command | Mô tả |
|---------|--------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production |
| `npm run start` | Chạy production server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed data |
| `npm run db:studio` | Mở Prisma Studio |

## Deploy lên Vercel

### 1. Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create thanhlam-store --public --push
```

### 2. Deploy trên Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Import repository `thanhlam-store`
3. Thêm các Environment Variables trong Vercel Dashboard:
   - `DATABASE_URL`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_APP_URL`
4. Click **Deploy**

## Cloudinary Setup

1. Tạo account tại [cloudinary.com](https://cloudinary.com)
2. Trong Dashboard, lấy:
   - Cloud Name
   - API Key
   - API Secret
3. Tạo upload preset:
   - Settings -> Upload -> Upload Presets
   - Tạo preset `thanhlam_store` (Unsigned hoặc Signed tùy nhu cầu)

## Neon PostgreSQL Setup

1. Tạo project tại [neon.tech](https://neon.tech)
2. Trong Dashboard -> Connection Details:
   - Copy connection string
3. Paste vào `DATABASE_URL` trong `.env`

## Database Schema

Models:
- **Category** - Danh mục sản phẩm (có hierarchy)
- **SubCategory** - Danh mục con
- **Brand** - Thương hiệu
- **Product** - Sản phẩm
- **ProductImage** - Hình ảnh sản phẩm
- **Banner** - Banner trang chủ
- **Contact** - Liên hệ từ khách

## Bảo mật

- Chỉ có **một tài khoản admin duy nhất** được cấu hình qua biến môi trường
- Session được lưu trong httpOnly cookie (secure khi production)
- Thay đổi `ADMIN_USERNAME` và `ADMIN_PASSWORD` trong `.env` để bảo mật
- Khuyến nghị: sử dụng mật khẩu mạnh trong production

## License

MIT
