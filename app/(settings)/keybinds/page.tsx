import React from "react";
import SettingsHeader from "../_components/settings_header";
import { Separator } from "@/components/ui/separator"
import Button from "@/components/ui/key";

export default function KeybindTile() {
  const keybinds = [
    { action: "Toggle Camera", key: ["Alt", "C"] },
    { action: "Toggle Microphone", key: ["Alt", "M"] },
    { action: "Toggle SubTitle", key: ["Ctrl", "S"] },
    { action: "Toggle Sidebar", key: ["Ctrl", "B"] },
    { action: "Toggle Chat", key: ["Ctrl", "M"] },
    { action: "Hang Up", key: ["Alt", "H"] },
    { action: "Toggle Settings", key: ["Ctrl", "Shift", "S"] },
  ];

  return (
    <div className="p-4">
      <SettingsHeader title="Key Binds" />
      <div className="bg-[#18181b] m-8 px-4 py-4 rounded-xl flex flex-col">
        <Separator className="my-3" />
        {keybinds.map((bind, index) => (
          <div>
            <div
              key={index}
              className="flex justify-between items-center rounded-lg"
            >
              <span className="text-white text-base font-mono">{bind.action}</span>
              <div className="flex gap-2 justify-center items-center">
                {bind.key.map((k, i) => (
                  <React.Fragment key={i}>
                    <Button name={k} />
                    {i < bind.key.length - 1 && <span className="text-white text-center text-xl ">+</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <Separator className="my-3" />
          </div>
        ))}
      </div>
    </div>
  );
}