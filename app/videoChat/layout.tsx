import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@radix-ui/react-separator"
import { ThemeProvider } from "@/providers/theme-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-center">
              <h1 className="hidden sm:flex items-center justify-between gap-2 space-x-2 text-2xl font-bold py-4 text-center selection:bg-indigo-700/[0.2] selection:text-indigo-500 mr-10 text-white"><img src="./logo.svg" alt="" className="w-[32px]" />Signify</h1>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
