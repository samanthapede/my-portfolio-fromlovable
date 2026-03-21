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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1 pt-16 lg:pt-20">{children ?? <Outlet />}</main>
        <Footer />
      </div>
    </ConversationModalProvider>
  );
};
