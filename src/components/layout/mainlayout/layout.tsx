import React from "react";
import Header from "./header";
import Footer from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
  session?: any; // Add session as an optional prop
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, session }) => {
  return (
    <main className="flex flex-col gap-5 font-quicksand w-full h-full relative z-0">
      <Header session={session} />
      <div className="font-quicksand">{children}</div>
      <Footer />
    </main>
  );
};

export default MainLayout;
