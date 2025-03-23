"use client"

import { useState } from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"

export function NavMain({
  items,
}: {
  items: {
    items?: {
      title: string
      url: string
      avatar?: string
      email?: string
      onClick?: () => void
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Users</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((subItem) =>
          subItem.items?.map((item) => {
            const [isPopoverOpen, setPopoverOpen] = useState(false)

            const handleCallClick = () => {
              setPopoverOpen(false)
              item.onClick?.()
            }

            return (
              <SidebarMenuItem key={item.title}>
                <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <div className="flex items-center gap-2 relative cursor-pointer">
                        <div className="relative">
                          {item.avatar && (
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={item.avatar} alt={item.title} />
                              <AvatarFallback>{item.title?.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
                        </div>
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent className="mx-4 relative rounded-xl overflow-hidden flex flex-col items-center shadow-lg bg-black font-Roboto-light">
                    <div className=" h-24 w-full rounded-lg">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-24 w-full rounded-lg"></div>
                    </div>
                    <div className="z-10 flex items-center flex-col gap-4 px-5 py-7">
                      <Avatar className="w-[4.7rem] h-[4.7rem] -mt-20">
                        <AvatarImage src={item.avatar} alt={item.title} />
                        <AvatarFallback>{item.title?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center flex-col">
                        <h3 className="text-white font-Roboto-md">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          {item.email}
                        </p>
                      </div>
                      <Button size="sm" className="bg-green-500" onClick={handleCallClick}>
                        Call
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            )
          })
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
