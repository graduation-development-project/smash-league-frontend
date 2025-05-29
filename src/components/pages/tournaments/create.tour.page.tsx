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

import CreateTourStep2 from '@/components/general/molecules/tournaments/create-step2.step';
import { createTourAPI } from '@/services/tournament';
import {
  uploadBgTourImageAPI,
  uploadMerchandiseImageAPI,
} from '@/services/create-tour';
import Loaders from '@/components/general/atoms/loaders/loaders';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CreateTourStep1 from '@/components/general/molecules/tournaments/create-step1-1.step';




interface Prize {
  award: string;
  nameOfAward: "championship" | "runnerUp" | "thirdPlace" | "jointThirdPlace" | string;
}

interface AgeGroup {
  fromAge: number;
  toAge: number;
  championship?: string;
  runnerUp?: string;
  thirdPlace?: string;
  jointThirdPlace?: string;  
  createPrizes: {
    createPrize: Prize[]
  };
  createTournamentRequirements: any
}

type TournamentEventKey = string; // e.g., "MEN_SINGLE", "WOMEN_SINGLE"

type TournamentEvent = {
  [key in TournamentEventKey]: AgeGroup[];
};

type CreateTournamentEvent = TournamentEvent[];


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

  function transformCreateTournamentEventData(
    createTournamentEventData: any
  ): any[] {
    // Ensure the input is an array before proceeding
    if (!Array.isArray(createTournamentEventData)) {
      console.error("Input data is not an array.Returning empty array");
      return [];
    }

    // Use map to create a new array with the transformed data
    const transformedData: any[] = createTournamentEventData.map(
      (eventCategory: any) => {
        const newEventCategory: any = {};

        // Iterate over each category in the event (e.g., MEN_SINGLE, WOMEN_SINGLE)
        for (const categoryName in eventCategory) {
          if (Object.prototype.hasOwnProperty.call(eventCategory, categoryName)) {
            const categoryDetails: any[] = eventCategory[categoryName];

            // Transform each detail object within the category
            newEventCategory[categoryName] = categoryDetails.map(
              (detail: any) => {
                // Create the new structure for createTournamentRequirements
                // Ensure 'detail.createTournamentRequirements' exists and is an array
                const requirementsArray = Array.isArray(detail.createTournamentRequirements)
                  ? detail.createTournamentRequirements
                  : [];

                const newRequirements = {
                  createTournamentRequirements: requirementsArray,
                };

                // Return a new detail object with the transformed requirements
                return {
                  ...detail, // Spread existing properties
                  createTournamentRequirements: newRequirements, // Override with the new structure
                };
              }
            );
          }
        }
        console.log("Check newEventCategory", newEventCategory);

        return newEventCategory;
      }


    );

    return transformedData;
  }

  //   function formatTournamentDataWithPrizes(createTournamentEventData: any) {
  //   // Check if the input is a valid array
  //   if (!Array.isArray(createTournamentEventData)) {
  //     console.error("Input data is not an array. Please provide a valid array.");
  //     return []; // Return empty or throw an error, depending on desired handling
  //   }

  //   // Map over each event category object in the main array
  //   return createTournamentEventData.map(eventCategory => {
  //     const newEventCategory = {}; // Create a new object for the transformed category

  //     // Iterate over the keys in the event category (e.g., "MENS_SINGLE", "WOMENS_SINGLE")
  //     for (const categoryName in eventCategory) {
  //       if (Object.prototype.hasOwnProperty.call(eventCategory, categoryName)) {
  //         const detailsArray = eventCategory[categoryName];

  //         // Check if the detailsArray is actually an array
  //         if (!Array.isArray(detailsArray)) {
  //           console.warn(`Expected an array for category "${categoryName}", but received ${typeof detailsArray}. Preserving as is.`);
  //           newEventCategory[categoryName] = detailsArray; // Preserve non-array data
  //           continue;
  //         }

  //         // Map over each detail object within the category's array
  //         newEventCategory[categoryName] = detailsArray.map(detail => {
  //           // Shallow copy the original detail object to preserve all other properties
  //           const transformedDetail = { ...detail };

  //           const prizeFieldNames = [
  //             "championshipPrize",
  //             "runnerUpPrize",
  //             "thirdPlacePrize",
  //             "jointThirdPlacePrize"
  //           ];
  //           const prizesFromFields = [];

  //           // Extract prizes from the specified fields
  //           for (const fieldName of prizeFieldNames) {
  //             if (Object.prototype.hasOwnProperty.call(transformedDetail, fieldName)) {
  //               prizesFromFields.push({
  //                 prizeName: fieldName, // Use the original field name as prizeName
  //                 prize: transformedDetail[fieldName]
  //               });
  //               delete transformedDetail[fieldName]; // Remove the original field from the detail object
  //             }
  //           }

  //           // Get the existing createPrizes array, or initialize an empty one if it doesn't exist or isn't an array
  //           const existingPrizesArray = Array.isArray(transformedDetail.createPrizes)
  //             ? transformedDetail.createPrizes
  //             : [];

  //           // Combine existing prizes with the newly extracted prizes
  //           const finalPrizesArray = [...existingPrizesArray, ...prizesFromFields];

  //           // Restructure the createPrizes property
  //           transformedDetail.createPrizes = {
  //             createPrizes: finalPrizesArray
  //           };

  //           return transformedDetail;
  //         });
  //       }
  //     }
  //     return newEventCategory;
  //   });
  // }

  function formatTournamentDataWithPrizesSimplified(
    createTournamentEventData: any
  ) {
    // Check if the input is a valid array
    if (!Array.isArray(createTournamentEventData)) {
      console.error("Input data is not an array. Please provide a valid array.");
      return []; // Return empty or throw an error, depending on desired handling
    }

    // Map over each event category object in the main array
    return createTournamentEventData.map((eventCategory) => {
      const newEventCategory: Record<string, any> = {}; // Create a new object for the transformed category

      // Iterate over the keys in the event category (e.g., "MENS_SINGLE", "WOMENS_SINGLE")
      for (const categoryName in eventCategory) {
        if (Object.prototype.hasOwnProperty.call(eventCategory, categoryName)) {
          const detailsArray = eventCategory[categoryName];

          // Check if the detailsArray is actually an array
          if (!Array.isArray(detailsArray)) {
            console.warn(
              `Expected an array for category "${categoryName}", but received ${typeof detailsArray}. Preserving as is.`
            );
            newEventCategory[categoryName] = detailsArray; // Preserve non-array data
            continue;
          }

          // Map over each detail object within the category's array
          newEventCategory[categoryName] = detailsArray.map((detail) => {
            // Shallow copy the original detail object to preserve all other properties
            const transformedDetail = { ...detail };

            const prizeFieldNames = [
              "championshipPrize",
              "runnerUpPrize",
              "thirdPlacePrize",
              "jointThirdPlacePrize",
            ];
            const prizesFromFields = [];

            // Extract prizes from the specified fields
            for (const fieldName of prizeFieldNames) {
              if (Object.prototype.hasOwnProperty.call(transformedDetail, fieldName) && transformedDetail[fieldName] !== undefined) {
                prizesFromFields.unshift({
                  prizeName: fieldName, // Use the original field name as prizeName
                  prize: transformedDetail[fieldName],
                });
                delete transformedDetail[fieldName]; // Remove the original field from the detail object
              }
            }

            // Get the existing createPrizes array, or initialize an empty one
            let existingPrizesArray = [];
            if (Array.isArray(transformedDetail.createPrizes)) {
              existingPrizesArray = transformedDetail.createPrizes;
            } else if (typeof transformedDetail.createPrizes === 'object' &&
              transformedDetail.createPrizes !== null &&
              Array.isArray(transformedDetail.createPrizes.createPrizes)) {
              // Handle if it's already in the nested structure (though logic implies it shouldn't be at this stage)
              existingPrizesArray = transformedDetail.createPrizes.createPrizes;
            }


            // Combine existing prizes with the newly extracted prizes
            const finalPrizesArray = [...existingPrizesArray, ...prizesFromFields];

            // Restructure the createPrizes property
            transformedDetail.createPrizes = {
              createPrizes: finalPrizesArray,
            };

            return transformedDetail;
          });
        }
      }
      return newEventCategory;
    });
  }
  function formatTournamentDataWithPrizesSimplified2(
  createTournamentEventData: any
) {
  // Check if the input is a valid array
  if (!Array.isArray(createTournamentEventData)) {
    console.error("Input data is not an array. Please provide a valid array.");
    return []; // Return empty or throw an error, depending on desired handling
  }

  // Map over each event category object in the main array
  return createTournamentEventData.map((eventCategory) => {
    const newEventCategory: Record<string, any> = {}; // Create a new object for the transformed category

    // Iterate over the keys in the event category (e.g., "MENS_SINGLE", "WOMENS_SINGLE")
    for (const categoryName in eventCategory) {
      if (Object.prototype.hasOwnProperty.call(eventCategory, categoryName)) {
        const detailsArray = eventCategory[categoryName];

        // Check if the detailsArray is actually an array
        if (!Array.isArray(detailsArray)) {
          console.warn(
            `Expected an array for category "${categoryName}", but received ${typeof detailsArray}. Preserving as is.`
          );
          newEventCategory[categoryName] = detailsArray; // Preserve non-array data
          continue;
        }

        // Map over each detail object within the category's array
        newEventCategory[categoryName] = detailsArray.map((detail) => {
          // Shallow copy the original detail object to preserve all other properties
          const transformedDetail = { ...detail };

          const prizeFieldNames = [
            "championshipPrize",
            "runnerUpPrize",
            "thirdPlacePrize",
            "jointThirdPlacePrize",
          ];
          const prizesFromFields = []; // This will store prizes in the order of prizeFieldNames

          // Extract prizes from the specified fields
          for (const fieldName of prizeFieldNames) {
            if (Object.prototype.hasOwnProperty.call(transformedDetail, fieldName) && transformedDetail[fieldName] !== undefined) {
              prizesFromFields.push({
                prizeName: fieldName,
                prize: transformedDetail[fieldName],
              });
              delete transformedDetail[fieldName]; // Remove the original field from the detail object
            }
          }

          // Get the existing createPrizes array, or initialize an empty one
          let existingPrizesArray = [];
          if (Array.isArray(transformedDetail.createPrizes)) {
            existingPrizesArray = transformedDetail.createPrizes;
          } else if (typeof transformedDetail.createPrizes === 'object' &&
                     transformedDetail.createPrizes !== null &&
                     Array.isArray(transformedDetail.createPrizes.createPrizes) ) {
            // Handle if it's already in the nested structure
             existingPrizesArray = transformedDetail.createPrizes.createPrizes;
          }

          // Combine prizes: prizesFromFields (championship, runnerUp, etc.) first, then other existing prizes.
          const finalPrizesArray = [...prizesFromFields, ...existingPrizesArray];

          // Restructure the createPrizes property
          transformedDetail.createPrizes = {
            createPrizes: finalPrizesArray,
          };

          return transformedDetail;
        });
      }
    }
    return newEventCategory;
  });
}
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
      createTournamentRequirements,
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

    const formatCreateTourEventPrizes = formatTournamentDataWithPrizesSimplified2(createTournamentEvent);
    console.log(formatCreateTourEventPrizes, 'formatCreateTourEventPrizes');

    // addPrizeList1(createTournamentEvent);
    const createTournamentEventUpdate = transformCreateTournamentEventData(formatCreateTourEventPrizes); 
    console.log(createTournamentEventUpdate, 'createTournamentEvent');



    const submitData = {
      ...rest,
      createCourts: createCourt,
      isRegister: true,
      createTournamentEvent: createTournamentEventUpdate,
      hasMerchandise,
      createTournamentRequirements: { createTournamentRequirements },
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

  const addPrizeList = (createTournamentEvent: CreateTournamentEvent) => {
    createTournamentEvent.forEach((eventObj) => {
      // Lấy key đầu tiên (tên event)
      const eventKey = Object.keys(eventObj)[0] as TournamentEventKey;
      const ageGroups = eventObj[eventKey];

      ageGroups.forEach((group) => {
        // Đảm bảo prize là mảng
        if (!Array.isArray(group.createPrizes.createPrize)) {
          group.createPrizes.createPrize = [];
        }
      }
      );

      const prizesToAdd: Prize[] = [];
    })
    return createTournamentEvent;
  }

  // const addPrizeList1 = (createTournamentEvent: CreateTournamentEvent): void => {
  //   console.log("createTournamentEventdwdd: ",createTournamentEvent);

  //   createTournamentEvent.forEach((eventObj) => {
  //     // Lấy key đầu tiên (tên event)
  //     const eventKey = Object.keys(eventObj)[0] as TournamentEventKey;
  //     const ageGroups = eventObj[eventKey];

  //     ageGroups.forEach((group) => {
  //       // Đảm bảo prize là mảng
  //       if (!Array.isArray(group.createPrizes.createPrize)) {
  //         group.createPrizes.createPrize = [];
  //       }

  //       const existingAwards = new Set(group.createPrizes.createPrize?.map((p) => p.nameOfAward));
  //       console.log("prizes: ",existingAwards);

  //       // Tạo mảng prize mới cần thêm (theo thứ tự để unshift ngược lại)
  //       const prizesToAdd: Prize[] = [];

  //       if (group.jointThirdPlace && !existingAwards.has("jointThirdPlace")) {
  //         prizesToAdd.push({
  //           award: group.jointThirdPlace,
  //           nameOfAward: "jointThirdPlace",
  //         });
  //       }

  //       if (group.thirdPlace && !existingAwards.has("thirdPlace")) {
  //         prizesToAdd.push({
  //           award: group.thirdPlace,
  //           nameOfAward: "thirdPlace",
  //         });
  //       }

  //       if (group.runnerUp && !existingAwards.has("runnerUp")) {
  //         prizesToAdd.push({
  //           award: group.runnerUp,
  //           nameOfAward: "runnerUp",
  //         });
  //       }

  //       if (group.championship && !existingAwards.has("championship")) {
  //         prizesToAdd.push({
  //           award: group.championship,
  //           nameOfAward: "championship",
  //         });
  //       }
  //       console.log('prizesToAdd', prizesToAdd);

  //       prizesToAdd.forEach((prize) => {
  //         group.createPrizes.createPrize?.unshift(prize);
  //       });
  //       console.log('group.createPrizes.createPrizes', group.createPrizes.createPrize);
  //       // prizesToAdd = {
  //       //   createPrizes: {
  //       //     createPrizes: prizesToAdd
  //       //   }
  //       // };
  //     });
  //   });
  // };

  return (
    <>
      {isLoadingCreateTour ? (
        <Loaders isLoading={isLoadingCreateTour} />
      ) : (
        <div className="w-full h-max  py-10 px-10 ">
          <div className="w-full h-max flex flex-col rounded-md shadow-shadowBtn py-10 px-10 gap-5">
            <div className="w-max border-b-4 border-primaryColor">
              <h1 className="text-[32px] font-bold leading-normal text-textColor  px-4">
                New<span className="text-primaryColor"> Tournaments</span>
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
