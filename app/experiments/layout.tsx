import SidebarLayout from "@/components/ui/sidebarlayout";
import { Toaster } from "@/components/ui/toaster"

export default function ExperimentsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarLayout>
            {children}
            <Toaster />
        </SidebarLayout>
    );
}
