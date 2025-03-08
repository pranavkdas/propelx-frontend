import { DnDProvider } from './DnDContext';
import { ReactFlowProvider } from '@xyflow/react';

export default function ExperimentsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                {/* <div className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-3 text-2xl backdrop-blur-lg"> */}
                <div className="border-b bg-background/50 p-3 text-2xl backdrop-blur-lg  pl-8">
                    <span>Experiment Canvas</span>
                </div>
                {children}
            </DnDProvider>
        </ReactFlowProvider>
    );
}
