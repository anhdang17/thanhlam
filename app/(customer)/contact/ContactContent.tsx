"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { Textarea } from "@/components/shared/ui/textarea";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, label: "Địa chỉ", value: "Chợ Cảnh Dương, Hòa Trạch, Quảng Trị" },
  { icon: Phone, label: "Điện thoại", value: "094 868 84 70" },
  { icon: Mail, label: "Email", value: "thanhlamstorevn@gmail.com" },
  { icon: Clock, label: "Giờ làm việc", value: "8:00 - 21:00 (T2 - CN)" },
];

export function ContactContent() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({ title: "Gửi liên hệ thành công!", description: "Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất." });
        reset();
      } else {
        throw new Error();
      }
    } catch {
      toast({ title: "Gửi thất bại", description: "Vui lòng thử lại sau.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-background-secondary/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Liên hệ</h1>
            <p className="text-text-secondary">Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-text mb-6">Thông tin liên hệ</h2>
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{item.label}</p>
                  <p className="text-sm text-text-secondary">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold text-text mb-6">Gửi tin nhắn</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ tên <span className="text-red-400">*</span></Label>
                    <Input id="name" placeholder="Nguyễn Văn A" {...register("name")} />
                    {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-400">*</span></Label>
                    <Input id="email" type="email" placeholder="email@example.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" type="tel" placeholder="0909 123 456" {...register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Chủ đề</Label>
                    <Input id="subject" placeholder="Tư vấn sản phẩm" {...register("subject")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Nội dung <span className="text-red-400">*</span></Label>
                  <Textarea id="message" rows={5} placeholder="Viết nội dung tin nhắn..." {...register("message")} />
                  {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
                  {submitting ? (
                    "Đang gửi..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Gửi liên hệ
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
