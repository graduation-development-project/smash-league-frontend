'use client';

import { Alert, ConfigProvider, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const AlertCreateTeamsModal = ({
  isModalOpen,
  setIsModalOpen,
  message,
  description,
  linkText,
  path,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  description?: string;
  linkText?: string;
  path?: string;
}) => {
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
          message={message}
          description={
            <>
              {description}
              {'\t'}
              <span
                className=" hover:underline hover:text-primaryColor cursor-pointer transition-all duration-200"
                onClick={() => {
                  router.push(`${path}`);
                }}
              >
                {linkText}
              </span>
            </>
          }
          type="info"
          showIcon
          style={{ marginTop: 30, width: '100%' }}
        />
      </ConfigProvider>
    </Modal>
  );
};

export default AlertCreateTeamsModal;
