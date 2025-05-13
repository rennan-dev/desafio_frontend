import { cn } from "@/lib/utils"; 

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white text-black shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn("p-4 border-b", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-4", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div className={cn("flex items-center p-4 border-t", className)} {...props} />
  );
}