import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import SettingsHeader from "./_components/settings_header";
import { Separator } from "@/components/ui/separator";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}