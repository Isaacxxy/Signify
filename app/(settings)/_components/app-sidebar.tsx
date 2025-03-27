"use client";
import Link from "next/link";
import {
  Keyboard,
  Languages,
  LogOut,
  Info,
  Settings2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const sections = [
  {
    label: "Customize your application :",
    items: [
      { title: "Keybinds", url: "/keybinds", icon: Keyboard },
      { title: "Language", url: "/languages", icon: Languages },
    ],
  },
];

const footerItems = [
  { title: "About", url: "/about", icon: Info },
  { title: "Log out", url: "/", icon: LogOut },
];

function SidebarSection({ label, items }: { label: string; items: any[] }) {
  return (
    <SidebarGroup className="space-y-2">
      <SidebarGroupLabel className="text-base cursor-default">{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu >
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={() => { }} asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="h-fit">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-950 text-white">
                  <Settings2 className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="truncate text-xl font-semibold up">Settings</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem >
        </SidebarMenu >
      </SidebarHeader >
      <SidebarContent>
        {sections.map((section) => (
          <SidebarSection
            key={section.label}
            label={section.label}
            items={section.items}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroupContent>
          <SidebarMenu>
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar >
  );
}
