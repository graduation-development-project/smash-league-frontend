import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import NextAuthWrapper from '@/context/next.auth.wrapper';
import { ToastContainer } from 'react-toastify';
import { ProfileContextProvider } from '@/context/profile.context';
import { TeamContextProvider } from '@/context/team.context';
import { TourContextProvider } from '@/context/tour.context';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Specify the weights you need
  style: ['normal'], // Include styles if needed
  variable: '--font-quicksand', // Optional: Create a CSS variable for the font
});

export const metadata: Metadata = {
  title: 'Smash League',
  description: 'Elevate your game, smash the league',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        {' '}
        <AntdRegistry>
          <NextAuthWrapper>
            <ProfileContextProvider>
              <TourContextProvider>
                <TeamContextProvider>
                  {children}
                  <ToastContainer />
                </TeamContextProvider>
              </TourContextProvider>
            </ProfileContextProvider>
          </NextAuthWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
