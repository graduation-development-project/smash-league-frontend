"use client";

import { Button, ConfigProvider, Form, Input } from "antd";
import React, { useState } from "react";
import ModalChangePassword from "../../auth/modal.change.password";

const UpdateInformationProfile = (props: any) => {
  const { session } = props;
  const [changePassword, setChangePassword] = useState(false);
  const handleUpdateInformation = (values: any) => {
    console.log("Check", values);
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <h1 className="text-[20px] font-bold">Updates Infomation</h1>
      <Form
        autoComplete="off"
        onFinish={handleUpdateInformation}
        layout="vertical"
        style={{ width: "50%", fontFamily: "inherit", fontWeight: "400" }}
      >
        <ConfigProvider
          theme={{
            components: {
              Input: {
                /* here is your component tokens */
                activeBorderColor: "#FF8243",
                activeShadow: "0 0 0 2px #fffff",
                hoverBorderColor: "#FF8243",
              },
            },
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            initialValue={session?.user?.name}
            style={{ fontFamily: "inherit" }}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            initialValue={session?.user?.name}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item label="Age" name="age" initialValue={24}>
            <Input placeholder="Enter your age" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            initialValue={"Dist. 12, Ho Chi Minh"}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
        </ConfigProvider>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#74ba74",
            },
          }}
        >
          <Form.Item>
            <div className="flex justify-end gap-1">
              <Button
                style={{ fontFamily: "inherit", fontWeight: "500" }}
                onClick={() => setChangePassword(true)}
              >
                Change Password
              </Button>
              <Button
                style={{ fontFamily: "inherit", fontWeight: "500" }}
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </div>
          </Form.Item>
        </ConfigProvider>
      </Form>

      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </div>
  );
};

export default UpdateInformationProfile;
