'use client';

import { ConfigProvider, Layout } from 'antd';

const AdminContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { Content } = Layout;

  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorPrimary: '#FF8243',
        },
      }}
    >
      <Content>
        <div
          style={{
            padding: 24,
            marginBottom: '50px',
            minHeight: 'calc(100vh - 180px)',
            // background: "#ccc",
            // borderRadius: "#ccc",
            fontFamily: 'inherit',
          }}
        >
          {children}
        </div>
      </Content>
    </ConfigProvider>
  );
};

export default AdminContent;
