import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ConversationModalProvider } from "@/contexts/ConversationModalContext";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ConversationModalProvider>
      <div className="min-h-screen flex flex-col overflow-x-clip">
        <ScrollProgress />
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">{children ?? <Outlet />}</main>
        <Footer />
      </div>
    </ConversationModalProvider>
  );
};
