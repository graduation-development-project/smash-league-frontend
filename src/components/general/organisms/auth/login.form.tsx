'use client';
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  notification,
  Row,
} from 'antd';
import Link from 'next/link';
import { authenticate } from '@/utils/actions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ModalReactive from '@/components/general/organisms/auth/modal.reactive';
import { useState } from 'react';
import ModalChangePassword from '@/components/general/organisms/auth/modal.change.password';
import Image from 'next/image';
import images from '@/assets/images';
import { ArrowLeft, Home } from 'lucide-react';
import styles from '@/components/general/organisms/auth/auth.module.scss';
// import { useProfileContext } from '@/context/profile.context';
import { LoadingOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [isBack, setIsBack] = useState(false);

  //   console.log("Check Session ", session);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    const { username, password } = values;

    setUserEmail('');
    //trigger sign-in
    setIsLoading(true);
    const res = await authenticate(username.trim(), password.trim());

    // console.log('Check res', res);
    // console.log('Check sesion', session?.user);
    if (res?.error) {
      //error
      if (res?.code === 2) {
        setIsModalOpen(true);
        setUserEmail(username);
        return;
      }
      setIsLoading(false);
      notification.error({
        message: 'Error login',
        description: 'Please try again',
      });
    } else {
      //redirect to /dashboard
      setIsLoading(false);
      router.push('/');
      router.refresh();
      // console.log("Success login");
    }
  };

  const handleLoginGoogle = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <>
      <Row justify={'center'} style={{ marginTop: '80px' }}>
        <Col xs={24} md={16} lg={40}>
          <fieldset
            style={{
              padding: '15px',
              margin: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <legend className="text-center font-bold text-[22px]  border-none outline-none ">
              Log In <span className="text-primaryColor ">Smash League</span>
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
                      activeBorderColor: '#FF8243',
                      activeShadow: '0 0 0 2px #fffff',
                      hoverBorderColor: '#FF8243',
                    },
                  },
                }}
              >
                <Form.Item
                  label="Email"
                  name="username"
                  style={{
                    fontWeight: 'bold',
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input
                    style={{
                      padding: '8px',
                    }}
                  />
                </Form.Item>
              </ConfigProvider>

              <ConfigProvider
                theme={{
                  components: {
                    Input: {
                      /* here is your component tokens */
                      activeBorderColor: '#FF8243',
                      activeShadow: '0 0 0 2px #fffff',
                      hoverBorderColor: '#FF8243',
                    },
                  },
                }}
              >
                <Form.Item
                  label="Password"
                  name="password"
                  style={{
                    fontWeight: 'bold',
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password
                    style={{
                      padding: '8px',
                    }}
                  />
                </Form.Item>
              </ConfigProvider>

              <Form.Item>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: '10px',
                    marginTop: '20px',
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{
                      padding: '20px',
                      backgroundColor: '#FF8243',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    Log In {isLoading && <LoadingOutlined />}
                  </Button>
                  <Button
                    type="link"
                    style={{
                      alignSelf: 'flex-end',
                      color: 'black',
                    }}
                    onClick={() => setChangePassword(true)}
                  >
                    <span
                      className={`${styles.textForgetPassword} hover:text-primaryColor before:bg-primaryColor`}
                    >
                      Forgot Password?
                    </span>
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <div className="flex flex-col gap-3 justify-center items-center max-w-full">
              <div className="text-center ">or</div>

              <Button
                onClick={handleLoginGoogle}
                type="text"
                block
                style={{
                  border: '1px solid #ccc',
                  padding: '20px 20px',
                  borderRadius: '5px',
                  width: '70%',
                }}
              >
                <Image
                  src={images.googleImage}
                  alt="Google"
                  width={20}
                  height={20}
                />
                Login with Google
              </Button>
            </div>

            <div
              // onMouseEnter={() => router.push("/")}
              onClick={() => router.push('/')}
              className="flex justify-center items-center mt-5"
            >
              <Link
                href="/home"
                onMouseEnter={() => setIsBack(true)}
                onMouseLeave={() => setIsBack(false)}
                className={`group border border-primaryColor p-[5px] rounded-full transition-transform duration-300 ${
                  isBack ? 'bg-primaryColor' : ''
                }`}
              >
                {isBack ? (
                  <ArrowLeft
                    size={20}
                    className="text-primaryColor group-hover:text-white transition"
                  />
                ) : (
                  <Home
                    size={20}
                    className="text-primaryColor group-hover:text-white transition"
                  />
                )}
              </Link>
            </div>

            <Divider />
            <div style={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link href={'/auth/register'} style={{ color: '#FF8243' }}>
                Sign Up
              </Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ModalReactive
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userEmail={userEmail}
      />
      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </>
  );
};

export default LoginForm;
