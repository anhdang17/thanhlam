"use client";

import { useState } from "react";
import { Mail, Phone, Eye, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Card } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";

const contacts = [
  { id: "1", name: "Nguyễn Văn A", email: "vana@email.com", phone: "0909 123 456", subject: "Tư vấn sản phẩm", message: "Tôi muốn biết về giày Nike Air Max 90. Sản phẩm còn hàng size 43 không? Giá có thể giảm thêm không?", isRead: false, createdAt: "2 giờ trước" },
  { id: "2", name: "Trần Văn B", email: "vanb@email.com", phone: "0912 345 678", subject: "Giao hàng", message: "Có giao hàng ra Hà Nội không? Thời gian giao hàng bao lâu?", isRead: false, createdAt: "5 giờ trước" },
  { id: "3", name: "Lê Văn C", email: "vanc@email.com", phone: "0934 567 890", subject: "Đổi trả", message: "Tôi muốn đổi dép Biti's Hunter vì size không vừa. Quy trình đổi trả như thế nào?", isRead: true, createdAt: "1 ngày trước" },
  { id: "4", name: "Phạm Văn D", email: "vand@email.com", phone: "0945 678 901", subject: "Hợp tác", message: "Tôi muốn hợp tác bán sỉ các sản phẩm của shop. Vui lòng liên hệ lại.", isRead: true, createdAt: "2 ngày trước" },
  { id: "5", name: "Hoàng Văn E", email: "vane@email.com", phone: "0956 789 012", subject: "Bảo hành", message: "Đồng hồ Casio Edifice của tôi bị lỗi. Tôi muốn được bảo hành. Sản phẩm mua được 3 tháng.", isRead: true, createdAt: "3 ngày trước" },
];

export default function AdminContactsPage() {
  const [selected, setSelected] = useState<(typeof contacts)[0] | null>(null);

  const unread = contacts.filter((c) => !c.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text">Liên hệ</h2>
          <p className="text-sm text-text-secondary">{contacts.length} liên hệ ({unread} chưa đọc)</p>
        </div>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="divide-y divide-border">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-start gap-4 p-4 hover:bg-background-secondary/30 transition-colors cursor-pointer ${!contact.isRead ? "bg-accent/5" : ""}`}
              onClick={() => setSelected(contact)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!contact.isRead ? "bg-accent/10" : "bg-background-secondary"}`}>
                <span className={`text-sm font-semibold ${!contact.isRead ? "text-accent" : "text-text-secondary"}`}>
                  {contact.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-medium ${!contact.isRead ? "text-text" : "text-text-secondary"}`}>
                    {contact.name}
                  </h3>
                  {!contact.isRead && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                </div>
                <p className="text-sm text-text-secondary truncate">{contact.subject || "Không có chủ đề"}</p>
                <p className="text-xs text-text-secondary/60 truncate mt-0.5">{contact.message}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-text-secondary/60">{contact.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>
              Gửi {selected?.createdAt} {selected?.isRead ? "" : "(chưa đọc)"}
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-text-secondary">
                  <Mail className="w-4 h-4" /> {selected.email}
                </span>
                {selected.phone && (
                  <span className="flex items-center gap-1 text-text-secondary">
                    <Phone className="w-4 h-4" /> {selected.phone}
                  </span>
                )}
              </div>
              {selected.subject && (
                <div className="text-sm">
                  <span className="font-medium text-text-secondary">Chủ đề: </span>
                  <span className="text-text">{selected.subject}</span>
                </div>
              )}
              <div className="p-4 bg-background-secondary rounded-lg">
                <p className="text-sm text-text whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Đóng</Button>
            <Button className="gap-2"><Mail className="w-4 h-4" /> Trả lời</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
