'use client';
import { Button, ConfigProvider, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const WinningShowModal = ({
  isModalOpen,
  setIsModalOpen,
  winningCompetitor,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  winningCompetitor: any;
}) => {
  const router = useRouter();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: '#FF8243',
              defaultHoverColor: '#FF8243',
              defaultActiveColor: '#FF8243',
              defaultActiveBorderColor: '#FF8243',
            },
          },
        }}
      >
        <Modal
          title={
            <div className="w-full text-center text-2xl font-semibold">
              The Winner
            </div>
          }
          width={1000}
          open={isModalOpen}
          okButtonProps={{
            style: {
              display: 'none',
            },
          }}
          onCancel={handleCancel}
          cancelButtonProps={{
            style: { fontWeight: '600', display: 'none' },
          }}
          closable={false}
          footer={null}
        >
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <div className="text-xl font-semibold text-center">
              <h2>{winningCompetitor.userName}</h2>
              <h2>{winningCompetitor.partnerName}</h2>
            </div>
            <Button
              type="primary"
              onClick={() => {
                router.push('/tournaments');
              }}
            >
              Go Tournaments
            </Button>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default WinningShowModal;
