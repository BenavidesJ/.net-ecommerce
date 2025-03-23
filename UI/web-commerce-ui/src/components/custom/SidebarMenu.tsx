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
  ShoppingCartIcon,
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
} from '@/components/ui/sidebar';
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
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useAuth } from '@/context';
import { getInitials } from '@/lib/utils';
import { EditUserModal } from './EditUserModal';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

const items = [
  {
    title: 'Gestion de Usuarios',
    url: '/gestion-usuarios',
    admin: true,
    icon: UserPlus2,
  },
  {
    title: 'Gestion de Pedidos',
    url: '/gestion-pedidos',
    admin: true,
    icon: Truck,
  },
  {
    title: 'Gestion de Productos',
    url: '/gestion-productos',
    admin: true,
    icon: Package2,
  },
  {
    title: 'Preferencias',
    icon: Settings,
  },
];

const clientItems = [
  {
    title: 'Principal',
    url: '/dashboard',
    admin: false,
    icon: Home,
  },
  {
    title: 'Carrito de Compras',
    url: '/compras',
    admin: false,
    icon: ShoppingCartIcon,
  },
  {
    title: 'Ver mis Pedidos',
    url: '/pedidos',
    admin: false,
    icon: Truck,
  },
  {
    title: 'Preferencias',
    icon: Settings,
  },
];

export const SidebarMenuApp = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const { signOffUser, currentUser, setCurrentUser, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initials = getInitials(
    currentUser?.id,
    currentUser?.nombre,
    currentUser?.apellido
  );
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
                <>
                  {isAdmin ? (
                    <>
                      {items.map((item) => (
                        <>
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              {item.title === 'Preferencias' ? (
                                <button onClick={() => setOpenSettings(true)}>
                                  <item.icon />
                                  <span>{item.title}</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    nav(item.url!, { replace: true })
                                  }
                                >
                                  <item.icon />
                                  <span>{item.title}</span>
                                </button>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {clientItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            {item.title === 'Preferencias' ? (
                              <button onClick={() => setOpenSettings(true)}>
                                <item.icon />
                                <span>{item.title}</span>
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  nav(item.url!, { replace: true })
                                }
                              >
                                <item.icon />
                                <span>{item.title}</span>
                                {item.title === 'Carrito de Compras' &&
                                  totalItems > 0 && (
                                    <Badge variant="destructive">
                                      {totalItems}
                                    </Badge>
                                  )}
                              </button>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </>
                  )}
                </>
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
                      <AvatarFallback className="rounded-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {!currentUser?.nombre ? 'Usuario' : currentUser.nombre}
                      </span>
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
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {!currentUser?.nombre
                            ? 'Usuario'
                            : currentUser.nombre}
                        </span>
                        <span className="truncate text-xs">
                          {!currentUser?.correo ? 'Correo' : currentUser.correo}
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
                      <button onClick={() => setIsModalOpen(true)}>
                        <span>Perfil</span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Metodo de pago
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

      {currentUser && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userID={currentUser.id}
          onModify={setCurrentUser}
          isProfilePage
        />
      )}
    </>
  );
};
