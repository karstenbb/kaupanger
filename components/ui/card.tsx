import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated";
}

export function Card({ children, className, variant = "default" }: CardProps) {
  const variants = {
    default: "bg-background-card border border-surface-border",
    glass: "bg-background-glass backdrop-blur-xl border border-surface-border/50",
    elevated: "bg-background-elevated shadow-elevated",
  };

  return (
    <div
      className={cn(
        "rounded-2xl",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-4 pb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-bold text-text-primary", className)}>{children}</h3>;
}
