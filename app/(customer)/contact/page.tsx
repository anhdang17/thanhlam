import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ THANH LÂM STORE để được tư vấn về sản phẩm, giá cả, chính sách đổi trả và hỗ trợ khách hàng.",
};

export default function ContactPage() {
  return <ContactContent />;
}
