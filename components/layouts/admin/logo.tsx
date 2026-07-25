import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/admin"
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
        P
      </div>

      <div>
        <h2 className="text-sm font-bold">
          PegaCupom
        </h2>

        <p className="text-xs text-muted-foreground">
          Admin Panel
        </p>
      </div>
    </Link>
  );
}