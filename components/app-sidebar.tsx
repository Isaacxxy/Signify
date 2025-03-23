"use client"

import * as React from "react"
import { useSocket } from '@/context/SocketContext';
import { useUser } from "@clerk/nextjs";
import {
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const { onlineUsers, handleCall, testStream } = useSocket();
  const onlineUsersData = onlineUsers
    ?.filter((onlineUser) => onlineUser.userId !== user?.id)
    .map((onlineUser) => ({
      title: onlineUser.profile.fullName?.split(' ').slice(0, 2).join(' ') ?? "Unknown",
      avatar: onlineUser.profile.imageUrl,
      url: "#",
      email: onlineUser.profile.emailAddresses[0]?.emailAddress,
      onClick: () => {
        testStream();
        handleCall(onlineUser);
      },
    }));

  console.log("email >>", user?.emailAddresses[0]?.emailAddress);
  const userdata =
  {
    name: user?.fullName ?? "",
    email: user?.emailAddresses[0]?.emailAddress,
    avatar: user?.imageUrl,
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Users className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold uppercase">Online Users</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              items: onlineUsersData,
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userdata={userdata} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
