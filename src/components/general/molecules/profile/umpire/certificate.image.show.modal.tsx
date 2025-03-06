'use client';
import { Image, Modal } from 'antd';
import React, { useState } from 'react';

const CertificateImageShowModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreateTeamsModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      closable={false}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      style={{display:"flex", justifyContent: "center", alignItems: "center", backgroundColor: "transparent"}}
    >
      <Image
        src={
          'https://images.squarespace-cdn.com/content/v1/55c0f3b6e4b02ba00aaac617/fb2bbbce-0c10-44c3-a3e6-0b54d3332d97/CERT+U.png'
        }
        width={500}
        height={350}
        alt="Certificate Image"
      />
    </Modal>
  );
};

export default CertificateImageShowModal;
