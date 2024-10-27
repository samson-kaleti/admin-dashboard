import React from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  FileUp,
  Printer,
  Users,
  Briefcase,
  UserCog,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Bell, LogOut, Settings, User, Sun, Moon, Menu } from "lucide-react";
import logo from "../../../utils/logo.png";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "College Data",
    href: "/dashboard/college-data",
    icon: GraduationCap,
  },
  {
    title: "Card Data",
    href: "/dashboard/card-data",
    icon: CreditCard,
  },
  {
    title: "PDF Uploads",
    href: "/dashboard/pdf-uploads",
    icon: FileUp,
  },
  {
    title: "Print Station",
    href: "/dashboard/print-station",
    icon: Printer,
  },
  {
    title: "Student Details",
    href: "/dashboard/student-details",
    icon: Users,
  },
  {
    title: "Internship/Placement",
    href: "/dashboard/internships",
    icon: Briefcase,
  },
  {
    title: "User Management",
    href: "/dashboard/user-management",
    icon: UserCog,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};

const NotificationBell = () => (
  <Button variant="ghost" size="icon" className="relative">
    <Bell className="h-5 w-5" />
    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
    <span className="sr-only">Notifications</span>
  </Button>
);

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 1024 : false;
  const [windowWidth, setWindowWidth] = React.useState(isMobile);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto relative">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none lg:flex-1">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {!windowWidth && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@johndoe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          John Doe
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john.doe@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <NotificationBell />
              </>
            )}

            {windowWidth && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@johndoe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                      <span className="ml-auto h-2 w-2 rounded-full bg-red-500" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : (
                        <Moon className="mr-2 h-4 w-4" />
                      )}
                      <span>Theme</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      <NavigationMenu.Root className="lg:hidden">
        <NavigationMenu.List
          className={`
            fixed w-full bg-background border-b z-40 shadow-lg transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <nav className="flex flex-col p-4">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start mb-1"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  );
}
