'use client';
import React, { useState } from 'react';
import {
  Button,
  ConfigProvider,
  Form,
  message,
  Steps,
  theme,
  Typography,
} from 'antd';
import CreateTourStep1 from '@/components/general/molecules/tournaments/create-step1.step';
import CreateTourStep2 from '@/components/general/molecules/tournaments/create-step2.step';
import { createTourAPI } from '@/services/tournament';
import {
  uploadBgTourImageAPI,
  uploadMerchandiseImageAPI,
} from '@/services/create-tour';
import Loaders from '@/components/general/atoms/loaders/loaders';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const CreateTourPage = ({ session }: any) => {
  const accessToken = session?.user?.access_token;
  const router = useRouter();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [dataStep1, setDataStep1] = useState({});
  const [dataStep2, setDataStep2] = useState({});
  const [fileBgTour, setFileBgTour] = useState<File | null>(null);
  const [fileImgMerchandiseList, setFileImgMerchandiseList] = useState<File[]>(
    [],
  );
  const [isLoadingCreateTour, setIsLoadingCreateTour] = useState(false);

  const steps = [
    {
      title: 'Tournament Information',
      content: (
        <CreateTourStep1
          dataStep1={dataStep1}
          form={form}
          accessToken={accessToken}
          fileBgTour={fileBgTour}
          setFileBgTour={setFileBgTour}
          fileImgMerchandiseList={fileImgMerchandiseList}
          setFileImgMerchandiseList={setFileImgMerchandiseList}
        />
      ),
    },
    {
      title: 'Invitations & Additional Options',
      content: <CreateTourStep2 />,
    },
  ];

  const nextStep = async () => {
    const values = await form.getFieldsValue();
    console.log('Check values step1', values);
    const { createTournamentEvent } = values;
    console.log(createTournamentEvent, 'createTournamentEvent');
    setDataStep1(values);
    setCurrentStep(currentStep + 1);
    console.log('bg tour', fileBgTour);
  };

  const prevStep = async () => {
    const values = await form.validateFields();
    console.log('Check values step2', values);
    setDataStep2(values);
    setCurrentStep(currentStep - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    width: '95%',
    // lineHeight: '260px',
    // textAlign: 'center',
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const fetchUploadBgTourImage = async (file: File) => {
    try {
      const response = await uploadBgTourImageAPI(file);
      return response;
    } catch (error) {
      console.error(error, 'uploadBgTourImageAPI');
    }
  };
  const fetchUploadMerchandiseTourImage = async (fileList: File[]) => {
    try {
      const response = await uploadMerchandiseImageAPI(fileList);
      return response;
    } catch (error) {
      console.error(error, 'uploadMerchandiseImageAPI');
    }
  };

  const fetchCreateTour = async (
    accessToken: string,
    values: any,
    hasMerchandise: boolean,
  ) => {
    try {
      if (fileBgTour) {
        const uploadBgTourImage = await fetchUploadBgTourImage(fileBgTour);
        if (
          uploadBgTourImage?.statusCode === 200 ||
          uploadBgTourImage?.statusCode === 201
        ) {
          values = { ...values, backgroundTournament: uploadBgTourImage.data };
        } else {
          values = { ...values, backgroundTournament: '' };
          message.error('Failed to upload Image');
        }
      }
      if (hasMerchandise) {
        const uploadMerchandiseImage = await fetchUploadMerchandiseTourImage(
          fileImgMerchandiseList,
        );
        if (
          uploadMerchandiseImage.statusCode === 200 ||
          uploadMerchandiseImage.statusCode === 201
        ) {
          values = {
            ...values,
            merchandiseImages: uploadMerchandiseImage.data,
          };
        } else {
          values = { ...values, merchandiseImages: [] };
          message.error('Failed to upload merchandise images');
        }
      }
      console.log();

      const response = await createTourAPI(accessToken, values);
      console.log(response, 'create tour API');
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        router.push('/tournaments/details/' + response?.data?.id);
        toast.success(`${response?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return true;
      }
      if (response?.statusCode === 400 && response?.message.includes("Credit")) {
        console.log("Status Code Create tour", response?.data?.statusCode);
        toast.error(`${response?.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      throw new Error('Failed to create tournament');
    } catch (error: any) {
      console.error(
        'Error creating tour API:',
        error.response?.data || error.message,
      );



      // router.push('/tournaments/create');
    }
  };

  const handleFinish = async () => {
    setIsLoadingCreateTour(true);
    const valuesStep2 = await form.validateFields();
    console.log(valuesStep2, 'valuesStep2');

    const finalValues = { ...dataStep1, ...valuesStep2 };

    const {
      street,
      ward,
      district,
      province,
      registrationDate,
      drawDate,
      occurDate,
      checkIn,
      hasMerchandise,
      createTournamentEvent,
      createCourts,
      ...rest
    } = finalValues;
    console.log(createCourts, 'createCourt');

    const registrationOpeningDate = registrationDate
      ? registrationDate[0].toISOString()
      : null;
    const registrationClosingDate = registrationDate
      ? registrationDate[1].toISOString()
      : null;
    const drawStartDate = drawDate ? drawDate.toISOString() : null;
    const startDate = occurDate ? occurDate[0].toISOString() : null;
    const endDate = occurDate ? occurDate[1].toISOString() : null;
    const checkInBeforeStart = checkIn ? checkIn.toISOString() : null;
    const createCourt = { createCourts: createCourts };

    const submitData = {
      ...rest,
      createCourts: createCourt,
      isRegister: true,
      createTournamentEvent,
      hasMerchandise,
      registrationOpeningDate,
      registrationClosingDate,
      drawStartDate,
      startDate,
      endDate,
      checkInBeforeStart,
    };

    console.log('submitData', submitData);

    await fetchCreateTour(accessToken, submitData, hasMerchandise);
    setIsLoadingCreateTour(false);
  };

  return (
    <>
      {isLoadingCreateTour ? (
        <Loaders isLoading={isLoadingCreateTour} />
      ) : (
        <div className="w-full h-max  py-10 px-10 ">
          <div className="w-full h-max flex flex-col rounded-md shadow-shadowBtn py-10 px-10 gap-5">
            <div className="w-max border-b-4 border-primaryColor">
              <h1 className="text-[32px] font-bold leading-normal text-textColor  px-4">
                New<span className="text-primaryColor"> Tournaments</span>{' '}
              </h1>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  // colorBorder: " #FF8243",
                  fontFamily: 'inherit',
                  fontWeightStrong: 700,
                  colorPrimary: '#FF8243',
                },
                components: {
                  Form: {
                    fontFamily: 'inherit',
                  },
                  Input: {
                    fontFamily: 'inherit',
                    // hoverBorderColor: "#FF8243",
                    // activeBorderColor: "#FF8243",
                  },
                  Select: {
                    // activeBorderColor: "#FF8243",
                    // hoverBorderColor: "#FF8243",
                  },
                  List: {
                    lineWidth: 10,
                  },
                  Radio: {
                    // buttonSolidCheckedActiveBg: "#FF8243",
                    // buttonSolidCheckedBg: "#FF8243",
                  },
                  Typography: {
                    fontFamily: 'inherit',
                  },
                },
              }}
            >
              <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                form={form}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '50px',
                  maxWidth: '100%',
                  fontFamily: 'inherit',
                  alignItems: 'center',
                  // justifyContent: 'center'
                }}
                onFinish={handleFinish}
                validateMessages={validateMessages}
              >
                <CreateTourStep1
                  dataStep1={dataStep1}
                  form={form}
                  accessToken={accessToken}
                  fileBgTour={fileBgTour}
                  setFileBgTour={setFileBgTour}
                  fileImgMerchandiseList={fileImgMerchandiseList}
                  setFileImgMerchandiseList={setFileImgMerchandiseList}
                />

                {/* <div className='w-1/2 flex justify-center items-center'>
                                        <Steps current={currentStep} items={items} />
                                    </div> */}
                {/* <div style={contentStyle}>{steps[currentStep].content}</div> */}
                <div className="w-full flex justify-center items-center gap-5 font-semibold text-primaryColor">
                  {/* {currentStep > 0 && (
                                            <Button
                                                style={{ width: '20%', fontSize: '18px', padding: '25px', borderRadius: '10px', }}
                                                onClick={() => prevStep()}
                                            >
                                                Previous Step
                                            </Button>
                                        )}
                                        {currentStep === steps.length - 1 && (
                                            <Button
                                                htmlType='submit'
                                                type="primary"
                                                style={{ width: '20%', fontSize: '18px', padding: '25px', borderRadius: '10px', fontWeight: 'bold' }}
                                                onClick={() => handleFinish()}
                                            >
                                                Done
                                            </Button>
                                        )}
                                        {currentStep < steps.length - 1 && (
                                            <Button
                                                type="primary"
                                                style={{ width: '20%', fontSize: '18px', padding: '25px', borderRadius: '10px', fontWeight: 'bold' }}
                                                onClick={() => nextStep()}
                                            >
                                                Next Step
                                            </Button>
                                        )} */}
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{
                      width: '20%',
                      fontSize: '18px',
                      padding: '25px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                    }}
                  >
                    Done
                  </Button>
                </div>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTourPage;
