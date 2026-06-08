import type { Metadata } from "next";
import { getContacts } from "@/lib/actions";
import { AdminContactsClient } from "./AdminContactsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default async function AdminContactsPage() {
  const contacts = await getContacts();
  return (
    <AdminContactsClient
      initialContacts={contacts.map((c) => ({
        ...c,
        createdAt: new Date(c.createdAt).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      })) as any}
    />
  );
}
