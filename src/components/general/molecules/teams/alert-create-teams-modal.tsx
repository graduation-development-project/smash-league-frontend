import { Alert, Modal } from "antd";
import React from "react";

const AlertCreateTeamsModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreateTeamsModalProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      //   onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      width={550}
    >
      <Alert
        message="Do you want to create a new team?"
        description={
          <>
            You have not been Team Leader yet.{"\t"}
            <span className="text-secondColor hover:underline hover:font-bold cursor-pointer transition-all duration-200 ">
              Become the Team Leader here
            </span>
          </>
        }
        type="info"
        showIcon
        style={{ marginTop: 30, width: "max-content" }}
      />
    </Modal>
  );
};

export default AlertCreateTeamsModal;
