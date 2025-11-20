import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-marzetti-background-light text-marzetti-text-primary">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MadeWithDyad />
    </div>
  );
};

export default Layout;