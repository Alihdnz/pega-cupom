"use client";

import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  name?: string | null;
  email?: string | null;
}

export function UserMenu({
  name,
  email,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
  render={
    <Button
      variant="ghost"
      className="h-10 gap-3 px-2"
    />
  }
>
  <>
    <Avatar className="h-9 w-9">
      <AvatarFallback>
        {name?.charAt(0).toUpperCase() ?? "A"}
      </AvatarFallback>
    </Avatar>

    <div className="hidden text-left md:block">
      <p className="text-sm font-medium">
        {name}
      </p>

      <p className="text-xs text-muted-foreground">
        {email}
      </p>
    </div>
  </>
</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60"
      >
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}