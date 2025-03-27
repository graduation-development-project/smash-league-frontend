"use client"
import React, { useState } from 'react'
import { Button, ConfigProvider, Form, message, Steps, theme, Typography } from 'antd';
import CreateTourStep1 from '@/components/general/molecules/tournaments/create-step1.step';
import CreateTourStep2 from '@/components/general/molecules/tournaments/create-step2.step';
import { createTourAPI } from '@/services/tournament';




const CreateTourPage = ({session}: any) => {
    const accessToken = session?.user?.access_token;
    const steps = [
        {
            title: 'Tournament Information',
            content: <CreateTourStep1 />,
        },
        {
            title: 'Invitations & Additional Options',
            content: <CreateTourStep2 />,
        },
        // {
        //     title: 'Last',
        //     content: 'Last-content',
        // },
    ];
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [dataStep1, setDataStep1] = useState({});
    const [dataStep2, setDataStep2] = useState({});

    const nextStep = async () => {
        const values = await form.getFieldsValue();
        console.log('Check values step1', values);
        setDataStep1(values);
        setCurrentStep(currentStep + 1);
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

    const fetchCreateTour = async (accessToken: string, values: any) => {
        try {
            const response = await createTourAPI(
                accessToken,
                values,
            )
            console.log(response.data, "response");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }


    const handleFinish = async () => {
        const valuesStep2 = await form.validateFields(); 
        const finalValues = { ...dataStep1, ...valuesStep2 }
        
        const { street, ward, district, province, registrationDate, drawDate, occurDate, checkIn, ...rest } = finalValues
        const [provinceId, provinceName] = province?.split('|') || ['', ''];
        const [districtId, districtName] = district?.split('|') || ['', ''];
        const location = [street, ward, districtName, provinceName].join(', ');

        const registrationOpeningDate = registrationDate? registrationDate[0].toISOString() : null;
        const registrationClosingDate = registrationDate? registrationDate[1].toISOString() : null;
        const drawStartDate = drawDate? drawDate[0].toISOString() : null;
        const startDate = occurDate? occurDate[0].toISOString() : null;
        const endDate = occurDate? occurDate[1].toISOString() : null;
        const checkInBeforeStart = checkIn? checkIn.toISOString() : null;
        console.log("checkIn", checkIn);
        console.log("checkInStart", checkInBeforeStart);
        
  
        const submitData = { ...rest, location, registrationOpeningDate, registrationClosingDate, drawStartDate, startDate, endDate, checkInBeforeStart };
        console.log("submitData", submitData);
        
        await fetchCreateTour(
            accessToken,
            submitData,
        );
    }


    return (
        <div className='w-full h-max  py-10 px-10 '>
            <div className='w-full h-max flex flex-col rounded-md shadow-shadowBtn py-10 px-10 gap-5'>
                <div className='w-max border-b-4 border-primaryColor'>
                    <h1 className='text-[32px] font-bold leading-normal text-textColor  px-4'>New<span className='text-primaryColor'> Tournaments</span> </h1>
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            // colorBorder: " #FF8243",
                            fontFamily: 'inherit',
                            fontWeightStrong: 700,
                            colorPrimary: "#FF8243",

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
                                lineWidth: 10
                            },
                            Radio: {
                                // buttonSolidCheckedActiveBg: "#FF8243",
                                // buttonSolidCheckedBg: "#FF8243",
                            },
                            Typography: {
                                fontFamily: 'inherit',
                            }
                        },
                    }}
                >
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
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
                        validateMessages={validateMessages}
                    >
                        <div className='w-1/2 flex justify-center items-center'>
                            <Steps current={currentStep} items={items} />

                        </div>

                        <div style={contentStyle}>{steps[currentStep].content}</div>
                        <div className='w-full flex justify-center items-center gap-5 font-semibold text-primaryColor'>
                            {currentStep > 0 && (
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
                            )}


                        </div>



                    </Form>
                </ConfigProvider>


            </div>
        </div >
    );
}



export default CreateTourPage