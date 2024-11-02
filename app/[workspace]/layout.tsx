import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { type PropsWithChildren } from "react";

export default function WorkspaceLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-w">
        <header className="p-2">
          <SidebarTrigger />
        </header>
        <main className="container flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
