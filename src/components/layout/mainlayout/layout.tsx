import React from "react";
import Header from "./header";
import Footer from "./footer";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex flex-col gap-5 font-quicksand">
      <Header />
      <div className="font-quicksand">{children}</div>
      <Footer />
    </main>
  );
};

export default MainLayout;
