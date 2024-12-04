import {
  Home,
  Settings,
  UserPlus2,
  Package2,
  Truck,
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  CreditCard,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu as SidebarMenuShadcn,
} from '../ui/sidebar';
import { useNavigate } from 'react-router';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useState } from 'react';
import { useAuth } from '@/context';

const items = [
  {
    title: 'Principal',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Gestion de Usuarios',
    url: '/gestion-usuarios',
    icon: UserPlus2,
  },
  {
    title: 'Gestion de Pedidos',
    url: '/gestion-pedidos',
    icon: Truck,
  },
  {
    title: 'Gestion de Productos',
    url: '/gestion-productos',
    icon: Package2,
  },
  {
    title: 'Preferencias',
    icon: Settings,
  },
];

export const SidebarMenuApp = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const { signOffUser, currentUser } = useAuth();
  const nav = useNavigate();
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <a onClick={() => nav('/')}>
                    <img
                      src="https://res.cloudinary.com/dh7qptl2n/image/upload/v1732929822/site-icon3_rd5gpd.jpg"
                      alt="Logo"
                      className=" cursor-pointer rounded-lg"
                    />
                  </a>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-xl font-semibold">
                    Propat.S.A
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuShadcn>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.title === 'Preferencias' ? (
                        <button onClick={() => setOpenSettings(true)}>
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => nav(item.url!, { replace: true })}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenuShadcn>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenuShadcn>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={''} alt={''} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{'User'}</span>
                      <span className="truncate text-xs">
                        {currentUser?.correo}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={'data.user.avatar'}
                          alt={'data.user.name'}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {'data.user.name'}
                        </span>
                        <span className="truncate text-xs">
                          {'data.user.email'}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup></DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      <button onClick={() => nav('/perfil', { replace: true })}>
                        <span>Perfil</span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    <button onClick={signOffUser}>
                      <span>Cerrar Sesión</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenuShadcn>
        </SidebarFooter>
      </Sidebar>

      <AlertDialog open={openSettings}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Preferencias</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid grid-cols-2">
                <div className="flex items-center">
                  <span className="font-medium">Tema del sitio</span>
                </div>
                <div className="flex items-center">
                  <ThemeToggle />
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Idioma</span>
                </div>
                <div className="flex items-center">Español</div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenSettings(false)}>
              Cerrar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
