// src/components/InfoBanner/index.tsx
import clsx from "clsx";
import { ReactNode } from "react";

type BannerVariant = "info" | "warning" | "success" | "error";
type BannerSize = "default" | "sm" | "lg";

interface InfoBannerProps {
  badge?: string;
  title: string;
  description: string;
  variant?: BannerVariant;
  size?: BannerSize;
  className?: string;
  action?: ReactNode;
}

export function InfoBanner({
  badge,
  title,
  description,
  variant = "info",
  size = "default",
  className,
  action,
}: InfoBannerProps) {
  const bannerStyles = clsx(
    "rounded-lg shadow-sm",
    {
      // Variantes
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white":
        variant === "info",
      "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900":
        variant === "warning",
      "bg-gradient-to-r from-green-500 to-green-600 text-white":
        variant === "success",
      "bg-gradient-to-r from-red-500 to-red-600 text-white":
        variant === "error",
      // Tamanhos
      "p-4": size === "default",
      "p-3": size === "sm",
      "p-6": size === "lg",
    },
    className
  );

  const badgeStyles = clsx(
    "px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider",
    {
      "bg-white/20": variant !== "warning",
      "bg-yellow-600/20 text-yellow-900": variant === "warning",
    }
  );

  const descriptionStyles = clsx("text-sm", {
    "text-white/90": variant !== "warning",
    "text-yellow-900/90": variant === "warning",
  });

  return (
    <div className={bannerStyles}>
      <div className="flex items-start gap-1 flex-col justify-start">
        <div className="flex items-center justify-start gap-2">
          {badge && <div className={badgeStyles}>{badge}</div>}
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className={descriptionStyles}>{description}</p>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}
