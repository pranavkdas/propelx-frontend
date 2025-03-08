import SidebarLayout from "@/components/ui/sidebarlayout";

export default function ExperimentsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarLayout>
            {children}
        </SidebarLayout>
    );
}
