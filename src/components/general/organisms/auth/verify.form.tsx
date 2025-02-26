"use client";
import React from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const VerifyForm = (props: any) => {
  const { email } = props;

  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, otp } = values;

    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp`,
      method: "PUT",
      body: {
        email,
        otp,
      },
    });

    if (res?.status === 200) {
      message.success("Verify successfully.");
      router.push(`/auth/login`);
    } else {
      notification.error({
        message: "Verify error",
        description: res?.message,
      });
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Kích hoạt tài khoản</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="Email" name="email" initialValue={email} hidden>
              <Input disabled />
            </Form.Item>
            <div>
              Mã OTP đã được gửi tới email đăng ký, vui lòng kiểm tra email.
            </div>
            <Divider />

            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    hoverBorderColor: "#FF8243",
                    activeBorderColor: "#FF8243",
                  },
                },
              }}
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
            </ConfigProvider>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default VerifyForm;
