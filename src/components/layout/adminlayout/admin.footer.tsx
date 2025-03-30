'use client';
import { Layout } from 'antd';

const AdminFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <Footer
        style={{
          textAlign: 'center',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        Smash League Project ©{new Date().getFullYear()} Created by @smashleague
      </Footer>
    </>
  );
};

export default AdminFooter;
