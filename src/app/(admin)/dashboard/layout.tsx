import { auth } from "@/auth";
import AdminContent from "@/components/layout/adminlayout/admin.content";
import AdminFooter from "@/components/layout/adminlayout/admin.footer";
import AdminHeader from "@/components/layout/adminlayout/admin.header";
import AdminSideBar from "@/components/layout/adminlayout/admin.sidebar";
import { AdminContextProvider } from "@/library/admin.context";
import { signIn } from "next-auth/react";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await signIn("google", { callbackUrl: "/dashboard" }); // Force sign in to obtain a new set of access and refresh tokens
  }

  return (
    <AdminContextProvider>
      <div style={{ display: "flex" }}>
        <div className="left-side" style={{ minWidth: 80 }}>
          <AdminSideBar />
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <AdminHeader session={session} />
          <AdminContent>{children}</AdminContent>
          <AdminFooter />
        </div>
      </div>
    </AdminContextProvider>
  );
};

export default AdminLayout;
