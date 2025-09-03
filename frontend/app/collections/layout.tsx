import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export default function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar />
        {children}
        <Toaster />
    </div>
  );
}