import React from 'react';
import Header from './header';
import Footer from './footer';
import Navigation from './navigation';

interface MainLayoutProps {
  children: React.ReactNode;
  session?: any; // Add session as an optional prop
  noHero?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  session,
  noHero = false,
}) => {
  return (
    <main className="flex flex-col gap-5 font-quicksand w-full h-full relative z-0">
      {noHero ? (
        <div className="px-10 w-full bg-[#2c2c2c] z-20 shadow-lg rounded-[5px] fixed top-0">
          <Navigation session={session} />
        </div>
      ) : (
        <Header session={session} />
      )}

      <div className="font-quicksand mt-20">{children}</div>
      <Footer />
    </main>
  );
};

export default MainLayout;
