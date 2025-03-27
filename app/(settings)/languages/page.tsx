import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SettingsHeader from "../_components/settings_header";
import Image from "next/image";

const languages = [
  { title: "English", image_url: "/united-kingdom.png", value: "1" },
  { title: "Français", image_url: "/france.png", value: "2" },
  { title: "Español", image_url: "/spain.png", value: "3" },
  { title: "Italiano", image_url: "/italy.png", value: "4" },
  { title: "Türkçe", image_url: "/turkey.png", value: "5" },
  { title: "русский", image_url: "/russia.png", value: "6" },
  { title: "中國人", image_url: "/china.png", value: "7" },
  { title: "Deutsch", image_url: "/germany.png", value: "8" },
  { title: "العربية", image_url: "/palestine.png", value: "9" },
];

export default function Home() {
  return (
    <div className="p-4">
      <SettingsHeader title="Language" />
      <div className="bg-[#18181b] m-8 px-4 py-6 rounded-xl flex flex-col gap-6">
        <p className="text-base font-medium">Select your language</p>
        <RadioGroup defaultValue="1" className="flex flex-col gap-1">
          {languages.map((language) => (
            <div
              key={language.value}
              className="flex justify-between items-center p-4 bg-[#27272a] rounded-xl hover:bg-[#3f3f46] transition-colors"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value={language.value} id={language.value} />
                <Label htmlFor={language.value}>{language.title}</Label>
              </div>
              <Image
                src={language.image_url}
                alt={language.title}
                width={24}
                height={24}
                className="rounded-full w-6 h-6"
              />
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
