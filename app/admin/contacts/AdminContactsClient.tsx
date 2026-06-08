"use client";

import { useState } from "react";
import { Mail, Phone, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Card } from "@/components/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/shared/ui/dialog";
import { markContactAsRead } from "@/lib/actions";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Props {
  initialContacts: Contact[];
}

export function AdminContactsClient({ initialContacts }: Props) {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState(initialContacts);

  const unread = contacts.filter((c) => !c.isRead).length;

  const handleMarkRead = async (contact: Contact) => {
    await markContactAsRead(contact.id);
    setContacts((prev) =>
      prev.map((c) => c.id === contact.id ? { ...c, isRead: true } : c)
    );
    if (selected?.id === contact.id) {
      setSelected({ ...selected, isRead: true });
    }
  };

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
              onClick={async () => {
                setSelected(contact);
                if (!contact.isRead) handleMarkRead(contact);
              }}
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
              Gửi lúc {selected?.createdAt}
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
            <a href={`mailto:${selected?.email}`}>
              <Button className="gap-2"><Mail className="w-4 h-4" /> Trả lời</Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
