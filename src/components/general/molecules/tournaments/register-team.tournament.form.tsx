import { Button, ConfigProvider, Form, Modal, Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import RegisterTeamStep1Form from '../../atoms/tournaments/register-team-step1.tournament.form';
import RegisterTeamStep2Form from '../../atoms/tournaments/register-team-step2.tournament.form';
import { RegisterAthleteTournamentFormProps } from '@/types/types';

const RegisterTeamTourForm = ({
    isModalOpen,
    setIsModalOpen,
    detail,
    detailId,
}: {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    detail: any;
    detailId: string;
}) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
            }
        }
    }, []);
    console.log(user, "user");
    
    console.log('teamId lead', user?.teamLeaderOf?.id);
    const teamId = user?.teamLeaderOf?.id;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const [currentStep, setCurrentStep] = useState(0);
    const [athleteFiles, setAthleteFiles] = useState<Record<number, Record<string, File[]>>>({});
    const [dataStep1, setDataStep1] = useState<any>(null);
    const [registerAthleteList, setRegisterAthleteList] = useState<RegisterAthleteTournamentFormProps[]>([]);


    const steps = [
        {
            title: "Athlete Information",
            content: <RegisterTeamStep1Form
                form={form}
                teamId={user?.teamId}
                detail={detail}
                registerAthleteList={registerAthleteList}
                setRegisterAthleteList={setRegisterAthleteList}
                // dataStep1={dataStep1}
                // setDataStep1={setDataStep1}
                // athleteFiles={athleteFiles}
                // setAthleteFiles={setAthleteFiles}
            />
        },
        {
            title: "Choose Events",
            content: <RegisterTeamStep2Form
                detailId={detailId}
                registerAthleteList={registerAthleteList}
                detail={detail}
            />
        },

    ]




    const nextStep = async () => {
        const values = await form.getFieldsValue();
        console.log('Check values step1', values);
        // const { createTournamentEvent } = values
        // console.log(createTournamentEvent, "createTournamentEvent");
        // setDataStep1(values);
        setCurrentStep(currentStep + 1);
        // console.log('bg tour', fileBgTour);
    };

    const prevStep = async () => {
        const values = await form.validateFields();
        // console.log('Check values step2', values);
        // setDataStep2(values);
        setCurrentStep(currentStep - 1);
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

    const handleDataStep1 = () => {

    }

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

    const handleFinish = async () => {
        setIsLoading(true);

        setIsLoading(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        // setIdentificationCardFiles([]);
        // setFile(undefined);
        // setIdentificationCardFilesPartner([]);
        // setFilePartner(undefined);
        form.resetFields();
    };


    return (
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
            <Modal
                title="Registration Form"
                width={"80%"}
                open={isModalOpen}
                //   onOk={handleOk}
                okButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                onCancel={handleCancel}
                cancelButtonProps={{
                    style: { fontWeight: '600', display: 'none' },
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
                        <Steps
                            current={currentStep}
                            items={steps.map((item) => ({ key: item.title, title: item.title }))}
                        />

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
            </Modal>
        </ConfigProvider>
    )
}

export default RegisterTeamTourForm