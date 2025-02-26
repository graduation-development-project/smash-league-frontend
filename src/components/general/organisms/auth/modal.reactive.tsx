"use client";

import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";

const ModalReactive = (props: any) => {
  const { isModalOpen, setIsModalOpen, userEmail } = props;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState("");

  const hasMounted = useHasMounted();

  useEffect(() => {
    if (userEmail) {
      form.setFieldValue("email", userEmail);
    }
  }, [userEmail, form]);

  if (!hasMounted) return <></>;

  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/resend-otp`,
      method: "POST",
      body: {
        email,
      },
    });

    if (res.status === 200 || res.status === 201) {
      setCurrent(1);
    } else {
      notification.error({
        message: "Call APIs error",
        description: "Please try again",
      });
    }
  };

  const onFinishStep1 = async (values: any) => {
    const { otp } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp`,
      method: "PUT",
      body: {
        email: userEmail,
        otp,
      },
    });

    if (res?.status === 200 || res?.status === 201) {
      setCurrent(2);
    } else {
      notification.error({
        message: "Verify error",
        description: res?.message,
      });
    }
  };
  return (
    <>
      <Modal
        title="Kích hoạt tài khoản"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
          setCurrent(0);
        }}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Login",
              // status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              // status: 'finish',
              icon: <SolutionOutlined />,
            },

            {
              title: "Done",
              // status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current === 0 && (
          <>
            <div style={{ margin: "20px 0" }}>
              <p>Tải khoản của bạn chưa được kích hoạt</p>
            </div>
            <Form
              name="verify"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
              <Form.Item label="" name="email">
                <Input disabled value={userEmail} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Resend
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 1 && (
          <>
            <div style={{ margin: "20px 0" }}>
              <p>Vui lòng nhập mã xác nhận</p>
            </div>

            <Form
              name="verify2"
              onFinish={onFinishStep1}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please input your OTP!",
                  },
                ]}
              >
                <Input.OTP />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Activate
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 2 && (
          <div style={{ margin: "20px 0" }}>
            <p>
              Tải khoản của bạn đã được kích hoạt thành công. Vui lòng đăng nhập
              lại
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalReactive;
