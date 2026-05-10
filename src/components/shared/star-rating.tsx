import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  size = 14,
  showValue = true,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const fill =
          i < Math.floor(rating)
            ? "full"
            : i < rating
              ? "half"
              : "empty";
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              fill === "full" && "fill-amber-400 text-amber-400",
              fill === "half" && "fill-amber-400/50 text-amber-400",
              fill === "empty" && "text-muted-foreground/30"
            )}
          />
        );
      })}
      {showValue && (
        <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
