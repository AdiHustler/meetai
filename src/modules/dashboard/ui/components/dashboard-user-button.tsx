import { authClient } from "@/lib/auth-client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Drawer, DrawerContent, DrawerDescription, DrawerTrigger, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, CreditCard, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";


export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const {data, isPending} = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions:{
        onSuccess: () => {
          router.push("/sign-in");
        }
      }
    });
  };

  if(isPending || !data?.user){
    return null;
  }
  if(isMobile){
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
          {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} alt={data.user.name} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            className="size-9 mr-3"
            variant="initials"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <span className="text-sm font-medium">{data.user.name}</span>
          <span className="text-sm text-muted-foreground">{data.user.email}</span>
        </div>
        <ChevronDownIcon className="size-4 shrink-0"/>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex flex-col gap-1">
              <span className="text-m font-medium">{data.user.name}</span>
              <span className="text-m text-muted-foreground">{data.user.email}</span>
            </DrawerTitle>
            <DrawerDescription>
              Manage your account settings and preferences.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-col gap-2">
            <Button variant="outline" onClick={() => {}} className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded-lg">
              Billing
              <CreditCardIcon className="size-4 shrink-0" />
            </Button>
            <Button variant="outline" onClick={onLogout} className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded-lg">
              Logout
              <LogOutIcon className="size-4 shrink-0" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return(
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden"> 
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} alt={data.user.name} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            className="size-9 mr-3"
            variant="initials"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <span className="text-sm font-medium">{data.user.name}</span>
          <span className="text-sm text-muted-foreground">{data.user.email}</span>
        </div>
        <ChevronDownIcon className="size-4 shrink-0"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">{data.user.name}</span>
            <span className="text-sm text-muted-foreground">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4 shrink-0" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}
        className="cursor-pointer flex items-center justify-between">
          Logout
          <LogOutIcon className="size-4 shrink-0" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};
