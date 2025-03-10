"use client";

import React, { useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  notification,
  Row,
} from "antd";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

const RegisterForm = () => {
  const router = useRouter();
  const [isBack, setIsBack] = useState(false);

  const onFinish = async (values: any) => {
    const { email, password, firstName, lastName, phoneNumber } = values;

    // console.log(values);

    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-up`,
      method: "POST",
      body: {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      },
    });

    if (res?.status === 200 || res?.status === 201) {
      router.push(`/verify/${encodeURIComponent(email)}`);
    } else {
      notification.error({
        message: "Register error",
        description: "Please try again",
      });
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "10px" }}>
      <Col xs={24} md={16} lg={14}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <legend className="text-center font-bold text-[22px] border-none outline-none ">
            Sign Up <span className="text-secondColor ">Smash League</span>
          </legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    activeBorderColor: "#74ba74",
                    activeShadow: "0 0 0 2px #fffff",
                    hoverBorderColor: "#74ba74",
                  },
                },
              }}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                style={{ fontWeight: "500" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input style={{ padding: "8px" }} />
              </Form.Item>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    activeBorderColor: "#74ba74",
                    activeShadow: "0 0 0 2px #fffff",
                    hoverBorderColor: "#74ba74",
                  },
                },
              }}
            >
              <Form.Item
                label="Last Name"
                name="lastName"
                style={{ fontWeight: "500" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input style={{ padding: "8px" }} />
              </Form.Item>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    activeBorderColor: "#74ba74",
                    activeShadow: "0 0 0 2px #fffff",
                    hoverBorderColor: "#74ba74",
                  },
                },
              }}
            >
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                style={{ fontWeight: "500" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ padding: "8px" }} />
              </Form.Item>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    activeBorderColor: "#74ba74",
                    activeShadow: "0 0 0 2px #fffff",
                    hoverBorderColor: "#74ba74",
                  },
                },
              }}
            >
              <Form.Item
                label="Email"
                name="email"
                style={{ fontWeight: "500" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input style={{ padding: "8px" }} />
              </Form.Item>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    activeBorderColor: "#74ba74",
                    activeShadow: "0 0 0 2px #fffff",
                    hoverBorderColor: "#74ba74",
                  },
                },
              }}
            >
              <Form.Item
                label="Password"
                name="password"
                style={{ fontWeight: "500" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password style={{ padding: "8px" }} />
              </Form.Item>
            </ConfigProvider>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  padding: "20px",
                  backgroundColor: "#74ba74",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div
            onClick={() => router.push("/")}
            className="flex justify-center items-center"
          >
            <Link
              href="/home"
              onMouseEnter={() => setIsBack(true)}
              onMouseLeave={() => setIsBack(false)}
              className={`group border border-secondColor p-[5px] rounded-full transition-transform duration-300 ${
                isBack ? "bg-secondColor" : ""
              }`}
            >
              {isBack ? (
                <ArrowLeft
                  size={20}
                  className="text-secondColor group-hover:text-white transition"
                />
              ) : (
                <Home
                  size={20}
                  className="text-secondColor group-hover:text-white transition"
                />
              )}
            </Link>
          </div>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href={"/auth/login"} style={{ color: "#74ba74" }}>
              Log In
            </Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default RegisterForm;
