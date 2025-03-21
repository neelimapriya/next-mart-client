"use client";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "../button";
import Logo from "@/app/assets/svgs/Logo";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { protectedRoute } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Logout();
    setIsLoading(true);
    if (protectedRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <Link href="/">
        <h1 className="text-2xl font-black flex items-center">
          <Logo />
          ext Mart
        </h1>
        </Link>
        <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Link href="/cart">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag />
          </Button>
          </Link>
          
          {user ? (
            <>
              <Link href="create-shop">
                <Button className="rounded-full" >
                  Create shop
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{user?.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <Link href={"/user/dashboard"}>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
