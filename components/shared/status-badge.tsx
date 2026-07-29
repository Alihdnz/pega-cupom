import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  active: boolean;
}

export function StatusBadge({
  active,
}: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        active
          ? "bg-emerald-500 hover:bg-emerald-500"
          : "bg-muted text-muted-foreground hover:bg-muted"
      )}
    >
      {active ? "Ativa" : "Inativa"}
    </Badge>
  );
}