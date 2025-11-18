"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";

const ImagePreview = ({
  url,
  onRemove,
  type,
  size,
}: {
  url: string;
  onRemove: () => void;
  type?: string;
  size?: Size;
}) => (
  <div
    className={cn(
      "relative",
      SIZE_STYLES[size ?? (type === "avatar" ? "sm" : "md")].box
    )}
  >
    <button
      className="absolute -top-2 -right-2 z-10 bg-background rounded-full p-1 shadow-md hover:bg-secondary transition-colors"
      onClick={onRemove}
    >
      <XCircleIcon className="h-4 w-4 text-destructive" />
    </button>
    <div
      className={cn(
        "w-full h-full rounded-md overflow-hidden border border-border bg-muted",
        "flex items-center justify-center"
      )}
    >
      <img
        src={url}
        alt="Preview"
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          target.parentElement!.innerHTML =
            '<div class="text-muted-foreground text-sm">Erro ao carregar imagem</div>';
        }}
      />
    </div>
  </div>
);

interface ImageDropzoneProps {
  label?: string;
  setFile: (file: File) => void;
  initialImage?: string;
  onRemove?: () => void;
  type?: string;
  size?: Size;
}

export default function ImageDropzone({
  label,
  setFile,
  initialImage,
  onRemove,
  type,
  size,
}: ImageDropzoneProps) {
  const [imagePicture, setImagePicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    setImagePicture(initialImage ?? null);
  }, [initialImage]);

  const handleRemove = () => {
    setImagePicture(null);
    setError(null);
    onRemove?.();
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

    if (file.size > maxSize) {
      return 'Arquivo muito grande. Máximo 5MB permitido.';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Tipo de arquivo não suportado. Use PNG, JPG, JPEG ou WebP.';
    }

    return null;
  };

  const handleFileDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = URL.createObjectURL(file);
      setImagePicture(imageUrl);
      setFile(file);
    } catch (err) {
      setError('Erro ao processar a imagem.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {label && (<Label className="my-3">{label}</Label>)}
      <div className="mt-1 w-full">
        {imagePicture ? (
          <ImagePreview url={imagePicture} onRemove={handleRemove} type={type} size={size} />
        ) : (
          <div className="space-y-2">
            <Dropzone
              onDrop={handleFileDrop}
              accept={{
                "image/png": [".png"],
                "image/jpg": [".jpg"],
                "image/jpeg": [".jpeg"],
                "image/webp": [".webp"],
              }}
              maxFiles={1}
              disabled={isLoading}
            >
              {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
                const computedSize: Size = size ?? (type === "avatar" ? "sm" : "md");
                return (
                  <div
                    {...getRootProps()}
                    className={cn(
                      "border-2 border-dashed rounded-md transition-all duration-200 cursor-pointer",
                      "flex flex-col items-center justify-center gap-2",
                      "hover:border-primary hover:bg-secondary/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      {
                        "border-primary bg-secondary": isDragActive && isDragAccept,
                        "border-destructive bg-destructive/10": isDragActive && isDragReject,
                        "opacity-50 cursor-not-allowed": isLoading,
                      },
                      SIZE_STYLES[computedSize].box,
                      SIZE_STYLES[computedSize].padding
                    )}
                  >
                    <input {...getInputProps()} id="profile" disabled={isLoading} />
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    ) : (
                      <>
                        <ImageIcon
                          className={cn("text-muted-foreground", SIZE_STYLES[computedSize].icon)}
                          strokeWidth={1.25}
                        />
                        <div className="text-center">
                          <p className={cn("text-muted-foreground font-medium", SIZE_STYLES[computedSize].text)}>
                            {isDragActive ? "Solte aqui" : "Clique ou arraste"}
                          </p>
                          {type !== "avatar" && (
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP (máx. 5MB)</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              }}
            </Dropzone>
            {error && (
              <div className="text-destructive text-xs mt-2 p-2 bg-destructive/10 rounded border border-destructive/20 w-">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


type Size = "sm" | "md" | "lg" | "xl" | "wide" | "mobo_wide";

const SIZE_STYLES: Record<Size, { box: string; icon: string; padding: string; text: string }> = {
  sm: { box: "w-24 h-24", icon: "h-6 w-6", padding: "p-2", text: "text-xs" },
  md: { box: "w-36 h-36", icon: "h-12 w-12", padding: "p-6", text: "text-sm" },
  lg: { box: "w-48 h-48", icon: "h-16 w-16", padding: "p-8", text: "text-base" },
  wide: { box: "w-full h-48", icon: "h-20 w-20", padding: "p-10", text: "text-base" },
  mobo_wide: { box: "w-60 h-48", icon: "h-20 w-20", padding: "p-10", text: "text-base" },
  xl: { box: "w-64 h-64", icon: "h-20 w-20", padding: "p-10", text: "text-base" },
};
