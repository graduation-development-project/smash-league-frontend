'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: File | undefined;
  onChange: (file: File) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Generate local preview URL
    setTimeout(() => {
      const localImageUrl = URL.createObjectURL(file);
      setPreviewUrl(localImageUrl);
      onChange(file); // Pass back actual File
      setIsUploading(false);
    }, 1000);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange(undefined as any); // Reset the File
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {previewUrl ? (
        <div className="relative w-full max-w-[750px] aspect-[16/9] rounded-md overflow-hidden border">
          <Image src={previewUrl} alt="Certificate" fill className="object-cover" />
          <Button
            onClick={handleRemove}
            variant="default"
            shadow={'shadowNone'}
            colorBtn={'whiteBtn'}
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label
          className={cn(
            'flex flex-col items-center justify-center w-full max-w-[750px] aspect-[16/9] rounded-md border border-dashed',
            'cursor-pointer hover:bg-muted/50 transition',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or PDF (max. 10MB)
            </p>
            {isUploading && (
              <p className="text-sm font-medium text-primary mt-2">
                Uploading...
              </p>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={disabled || isUploading}
          />
        </label>
      )}
    </div>
  );
}