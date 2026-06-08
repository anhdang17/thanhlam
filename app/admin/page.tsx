"use client";

import { Package, Layers, Tag, MessageSquare, TrendingUp, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { formatPrice } from "@/lib/utils";

const stats = [
  { label: "Tổng sản phẩm", value: "32", icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Danh mục", value: "8", icon: Layers, color: "text-green-400", bg: "bg-green-400/10" },
  { label: "Thương hiệu", value: "12", icon: Tag, color: "text-purple-400", bg: "bg-purple-400/10" },
  { label: "Liên hệ mới", value: "3", icon: MessageSquare, color: "text-orange-400", bg: "bg-orange-400/10" },
];

const recentContacts = [
  { id: "1", name: "Nguyễn Văn A", email: "vana@email.com", message: "Tôi muốn biết về giày Nike Air Max 90...", time: "2 giờ trước", isRead: false },
  { id: "2", name: "Trần Văn B", email: "vanb@email.com", message: "Có giao hàng ra Hà Nội không?", time: "5 giờ trước", isRead: false },
  { id: "3", name: "Lê Văn C", email: "vanc@email.com", message: "Dép Biti's có size 43 không?", time: "1 ngày trước", isRead: true },
];

const topProducts = [
  { name: "Giày Nike Air Max 90", views: 1240, revenue: 3500000 },
  { name: "Giày Adidas Ultraboost 23", views: 980, revenue: 4800000 },
  { name: "Balo Laptop Pro 15 inch", views: 756, revenue: 890000 },
  { name: "Vali Du Lịch Nhựa ABS", views: 623, revenue: 1800000 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent contacts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              Liên hệ gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-background-secondary/50 hover:bg-background-secondary transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-accent">{contact.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-text">{contact.name}</p>
                    {!contact.isRead && (
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-text-secondary truncate mt-0.5">{contact.message}</p>
                  <p className="text-xs text-text-secondary/60 mt-1">{contact.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top products */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Sản phẩm xem nhiều
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-4 p-3 rounded-lg bg-background-secondary/50"
              >
                <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-xs font-bold text-accent shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{product.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                      <Eye className="w-3 h-3" />
                      {product.views}
                    </span>
                    <span className="text-xs font-medium text-green-400">
                      {formatPrice(product.revenue)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
