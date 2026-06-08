import { Suspense } from "react";
import { LookbookContent } from "./_components/LookbookContent";
import { PageLoader } from "@/components/shared/LoadingSpinner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Khám phá bộ sưu tập thời trang nam của THANH LÂM STORE. Phong cách Urban, Business, Casual.",
};

export default function LookbookPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <LookbookContent />
    </Suspense>
  );
}
