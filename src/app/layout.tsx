import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthWrapper from "@/library/next.auth.wrapper";
import { ToastContainer } from "react-toastify";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Specify the weights you need
  style: ["normal"], // Include styles if needed
  variable: "--font-quicksand", // Optional: Create a CSS variable for the font
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        {" "}
        <AntdRegistry>
          <NextAuthWrapper>
            {children}
            <ToastContainer />
          </NextAuthWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
