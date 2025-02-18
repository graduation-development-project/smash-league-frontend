import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const CreateTeamsModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreateTeamsModalProps) => {
  const handleCreateTeam = (values: any) => {
    console.log("check", values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [teamLeaderId, setTeamLeaderId] = React.useState<string>("1");

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              /* here is your component tokens */
              defaultHoverBorderColor: "#FF8243",
              defaultHoverColor: "#FF8243",
              defaultActiveColor: "#FF8243",
              defaultActiveBorderColor: "#FF8243",
            },
          },
        }}
      >
        <Modal
          title="Create Team Form"
          width={500}
          open={isModalOpen}
          //   onOk={handleOk}
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          onCancel={handleCancel}
          cancelButtonProps={{
            style: { fontWeight: "600", display: "none" },
          }}
        >
          <Form
            autoComplete="off"
            onFinish={handleCreateTeam}
            layout="vertical"
          >
            <Form.Item
              label="Team Leader Id"
              name="teamLeaderId"
              hidden
              initialValue={teamLeaderId}
            >
              <Input placeholder="Team Name" disabled />
            </Form.Item>

            <Form.Item
              label="Team Name"
              name="teamName"
              rules={[
                { required: true, message: "Please input your team name!" },
              ]}
            >
              <Input placeholder="Team Name" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="teamDescription"
              rules={[
                {
                  required: true,
                  message: "Please input your team description!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Team Description" />
            </Form.Item>

            <Form.Item>
              <div className="w-full flex justify-end gap-2">
                <Button type="default" htmlType="button" onClick={handleCancel}>
                  Cancel
                </Button>

                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#74ba74",
                    },
                  }}
                >
                  <Button
                    style={{ fontWeight: "500" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Create Team
                  </Button>
                </ConfigProvider>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default CreateTeamsModal;
