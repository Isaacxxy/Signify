"use client"

import * as React from "react"
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@heroui/dropdown";

export default function ModeToggle() {
  const { setTheme } = useTheme()
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["flight type"]));
  let FlightType = "Round Trip"
  FlightType = Array.from(selectedKeys).join(", ");

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
}
