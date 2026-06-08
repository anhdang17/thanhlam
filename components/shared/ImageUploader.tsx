"use client";

import { useCallback, useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/ui/button";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  className?: string;
  label?: string;
  multiple?: boolean;
}

export function ImageUploader({
  value,
  onChange,
  onClear,
  className,
  label = "Tải ảnh lên",
  multiple = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        setError("Kích thước file không được vượt quá 10MB");
        return;
      }

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        onChange(data.url);
      } catch (err) {
        setError("Upload thất bại. Vui lòng thử lại.");
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }, [onChange]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <p className="text-sm font-medium text-text">{label}</p>
      )}

      {value ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-card border border-border group">
          <Image
            src={value}
            alt="Uploaded"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleUpload}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-1" />
              Đổi ảnh
            </Button>
            {onClear && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onClear}
              >
                <X className="w-4 h-4 mr-1" />
                Xoá
              </Button>
            )}
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="w-full h-48 rounded-lg border-2 border-dashed border-border hover:border-accent bg-background-secondary/50 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
              <p className="text-sm text-text-secondary">Đang tải lên...</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-text">{label}</p>
                <p className="text-xs text-text-secondary mt-1">
                  PNG, JPG, WEBP (tối đa 10MB)
                </p>
              </div>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
