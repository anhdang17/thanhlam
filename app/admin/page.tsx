import { Package, Layers, Tag, MessageSquare, TrendingUp, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { formatPrice } from "@/lib/utils";
import { getDashboardStats, getRecentContacts, getTopProducts } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, recentContacts, topProducts] = await Promise.all([
    getDashboardStats(),
    getRecentContacts(5),
    getTopProducts(5),
  ]);

  const dashboardStats = [
    { label: "Tổng sản phẩm", value: stats.productCount, icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Danh mục", value: stats.categoryCount, icon: Layers, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Thương hiệu", value: stats.brandCount, icon: Tag, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Liên hệ mới", value: stats.unreadCount, icon: MessageSquare, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
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
                  <p className="text-xs text-text-secondary/60 mt-1">
                    {new Date(contact.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            ))}
            {recentContacts.length === 0 && (
              <p className="text-sm text-text-secondary text-center py-4">Chưa có liên hệ nào.</p>
            )}
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
                key={product.id}
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
                      {product.viewCount}
                    </span>
                    {product.price && (
                      <span className="text-xs font-medium text-green-400">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-sm text-text-secondary text-center py-4">Chưa có sản phẩm nào.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
