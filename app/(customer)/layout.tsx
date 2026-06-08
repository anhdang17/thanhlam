import { TooltipProvider } from "@/components/shared/ui/tooltip";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <div className="pt-16 md:pt-20">
        {children}
      </div>
    </TooltipProvider>
  );
}
