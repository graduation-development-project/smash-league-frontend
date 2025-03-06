'use client';

import { Alert, ConfigProvider, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const AlertCreateTeamsModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreateTeamsModalProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();
  return (
    <Modal
      open={isModalOpen}
      //   onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={550}
    >
      <ConfigProvider
        theme={{
          token: {
            colorInfoBorder: '#FF8243',
            colorInfoBg: 'transparent',
            colorInfo: '#FF8243',
            colorTextHeading: '#FF8243',
          },
        }}
      >
        <Alert
          message="Do you want to create a new team?"
          description={
            <>
              You have not sign up yet.{'\t'}
              <span
                className=" hover:underline hover:text-primaryColor cursor-pointer transition-all duration-200"
                onClick={() => {
                  router.push('/auth/register');
                }}
              >
                Sign Up here
              </span>
            </>
          }
          type="info"
          showIcon
          style={{ marginTop: 30, width: "100%" }}
        />
      </ConfigProvider>
    </Modal>
  );
};

export default AlertCreateTeamsModal;
