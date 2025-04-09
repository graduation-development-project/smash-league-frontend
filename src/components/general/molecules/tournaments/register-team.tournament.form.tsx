import { Button, ConfigProvider, Form, Modal, Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import RegisterTeamStep1Form from '../../atoms/tournaments/register-team-step1.tournament.form';
import RegisterTeamStep2Form from '../../atoms/tournaments/register-team-step2.tournament.form';
import { RegisterAthleteTournamentBeforeSubmitFormProps, RegisterAthleteTournamentFormProps, RegisterAthleteTournamentSubmitFormProps } from '@/types/types';
import { uploadMerchandiseImageAPI } from '@/services/create-tour';
import { registerTournamentByTeamAPI } from '@/services/team';

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
    

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const [currentStep, setCurrentStep] = useState(0);
    const [athleteFiles, setAthleteFiles] = useState<Record<number, Record<string, File[]>>>({});
    const [dataStep1, setDataStep1] = useState<any>(null);
    const [registerAthleteList, setRegisterAthleteList] = useState<RegisterAthleteTournamentFormProps[]>([]);
    const [beforeSubmit, setBeforeSubmit] = useState<RegisterAthleteTournamentBeforeSubmitFormProps[]>([]);
    const [submitList, setSubmitList] = useState<RegisterAthleteTournamentSubmitFormProps[]>([]);

    const steps = [
        {
            title: "Athlete Information",
            content: <RegisterTeamStep1Form
                form={form}
                teamId={user?.teamLeaderOf[0]?.id}
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
                setBeforeSubmitList={setBeforeSubmit}
                detailId={detailId}
                registerAthleteList={registerAthleteList}
                detail={detail}
                beforeSubmitList={beforeSubmit}
            />
        },

    ]




    const nextStep = async () => {
        const values = await form.getFieldsValue();
        // console.log('Check values step1', values);
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

    const fetchUploadImage = async (fileList: File[]) => {
        try {
            const response = await uploadMerchandiseImageAPI(fileList);
            return response;
        } catch (error) {
            console.error(error, "uploadMerchandiseImageAPI");
        }
    }

    const fetchRegisterSubmit = async () => {
        try {
            // console.log("user", user.accessToken);
            
            const response = await registerTournamentByTeamAPI(submitList, user.access_token);
            console.log(response, "registerTournamentByTeamAPI");
        } catch (error) {
            console.error(error, "register Tournament By Team API");
        }
    }

    const handleFinish = async () => {
        setIsLoading(true);
        try {
            for (const athlete of beforeSubmit) {
                const registrationDocumentCreator : any[] =[];
                const registerationDocumentPartner: any[] = [];

                for (const [docType, files] of Object.entries(athlete.registrationDocumentCreator)) {
                    
                    const response = await fetchUploadImage(files);
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        registrationDocumentCreator.push(...response.data);
                    }else {
                        throw new Error('Upload athlete docs failed');
                    }
                    
                }

                if (athlete.partnerId && athlete.partnerId !== '' && athlete.registerationDocumentPartner) {
                    
                    for (const [docType, files] of Object.entries(athlete.registerationDocumentPartner)) {
                        const response = await fetchUploadImage(files);
                        if (response.statusCode === 201 || response.statusCode === 200) {
                            registerationDocumentPartner.push(...response.data);
                        }
                    }
                }
                submitList.push({
                    playerId: athlete.playerId,
                    playerName: athlete.playerName,
                    fromTeamId: athlete.fromTeamId,
                    tournamentId: athlete.tournamentId,
                    tournamentEventId: athlete.tournamentEventId,
                    registrationDocumentCreator,
                    partnerId: athlete.partnerId || undefined,
                    partnerName: athlete.partnerName || undefined,
                    registerationDocumentPartner: athlete.partnerId ? registerationDocumentPartner : [],
                  });
            }
            console.log("submitList", submitList);
            
            await fetchRegisterSubmit();
            
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
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