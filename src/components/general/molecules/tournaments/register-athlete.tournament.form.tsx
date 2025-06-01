'use client';
import {
  getRequirementsOfTournamentAPI,
  getRequirementsOfTournamentEventAPI,
  registerTournamentByAthleteAPI,
} from '@/services/tour-registration';
import { calculateAge } from '@/utils/calculateAge';
import { ConsoleSqlOutlined, LoadingOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getTournamentEventDetailAPI } from '@/services/tournament';
import { searchUserByEmailAPI } from '@/services/user';
import { set } from 'react-hook-form';

const RegisterAthleteTournamentForm = ({
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [identificationCardFiles, setIdentificationCardFiles] = useState<
    File[]
  >([]);
  const [file, setFile] = useState<File>();

  const [identificationCardFilesPartner, setIdentificationCardFilesPartner] =
    useState<File[]>([]);
  const [filePartner, setFilePartner] = useState<File>();
  const [isHasPartner, setIsHasPartner] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [tournamentEvent, setTournamentEvent] = useState<any>([]);
  const [form] = Form.useForm();
  const [userList, setUserList] = useState<any>([]);
  const [partner, setPartner] = useState<any>({});
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [tournamentConditionList, setTournamentConditionList] = useState<any[]>(
    [],
  );
  const [tournamentEventConditionList, setTournamentEventConditionList] =
    useState<any>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  // console.log('Check user', user);
  // console.log('Check detail', detail?.id);

  // console.log('Check detail', tournamentEvent);

  const tournamentEventReal = async () => {
    // if (detail) return;
    try {
      // console.log('Check detail id', detail?.id);
      const response = await getTournamentEventDetailAPI(detailId);
      setTournamentEvent(response.data);
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    tournamentEventReal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId]);

  useEffect(() => {
    getTournamentEventCondition();
  }, [selectedEventId])

  console.log("check conditions", tournamentEventConditionList)

  const tournamentEventsOptions = tournamentEvent
    ?.sort((a: any, b: any) => {
      if (a.tournamentEvent < b.tournamentEvent) return -1;
      if (a.tournamentEvent > b.tournamentEvent) return 1;
      return a.fromAge - b.fromAge;
    })
    .map((item: any) => {
      let isNotGender = true;
      // console.log('check gender', item.tournamentEvent.includes('MENS'));
      // Check for Women's tournament and Female user
      if (
        item.tournamentEvent.startsWith('WOMENS') &&
        user?.gender === 'FEMALE'
      ) {
        isNotGender = false;
        // Check for Mixed tournament (gender doesn't matter)
      } else if (item.tournamentEvent.startsWith('MIXED')) {
        isNotGender = false;
        // Check for Men's tournament and Male user
      } else if (
        item.tournamentEvent.startsWith('MENS') &&
        user?.gender === 'MALE'
      ) {
        isNotGender = false;
      }
      return {
        value: item.id,
        label: `${item.tournamentEvent} - Age: ${item.fromAge} to ${item.toAge}`,
        disabled:
          item.fromAge > calculateAge(user?.dateOfBirth) ||
          calculateAge(user?.dateOfBirth) > item.toAge ||
          isNotGender,
      };
    });

  const handleidentificationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setIdentificationCardFiles([
        ...identificationCardFiles,
        ...Array.from(e.target.files),
      ]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleidentificationFilePartnerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setIdentificationCardFilesPartner([
        ...identificationCardFilesPartner,
        ...Array.from(e.target.files),
      ]);
    }
  };

  const handleFilePartnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilePartner(e.target.files[0]);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIdentificationCardFiles([]);
    setFile(undefined);
    setIdentificationCardFilesPartner([]);
    setFilePartner(undefined);
    form.resetFields();
    setIsHasPartner(false);
    setSelectedEventId(null);
  };

  const handleChangeEvent = (value: string, option: any) => {
    setSelectedEventId(value);
    getTournamentEventCondition();
    if (option.label.toUpperCase().includes('DOUBLE')) {
      setIsHasPartner(true);
    } else {
      setIsHasPartner(false);
    }
  };

  // console.log('check detail', detail);

  const getTournamentCondition = async () => {
    if (!detail) return;
    try {
      // console.log('Check detail id', detailId);
      const response = await getRequirementsOfTournamentAPI(detailId);
      setTournamentConditionList(response?.data?.data);
      // console.log('Check response tour condition', response.data);
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  const getTournamentEventCondition = async () => {
    if (!selectedEventId) return;
    try {
      const response = await getRequirementsOfTournamentEventAPI(
        selectedEventId,
      );

      const conditionEvent = response?.data?.data.filter(
        (condition: any) => condition.tournamentEventId === selectedEventId);
      setTournamentEventConditionList(conditionEvent);

      console.log('Check response tour eventcondition', response.data.data);
    } catch (error: any) {
      console.log('Error', error);
    }
  };
  const searchUserByEmail = async () => {
    if (!user || !selectedEventId) return;

    try {
      const response = await searchUserByEmailAPI(user.access_token, '');

      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        const selectedEvent = tournamentEvent?.find(
          (e: any) => e.id === selectedEventId,
        );

        if (!selectedEvent) return;

        const athleteData = response.data.data.filter(
          (us: any) =>
            us.email &&
            !us.email.includes('admin') &&
            !us.email.includes('staff'),
        );

        const formattedData = athleteData.map((us: any) => {
          const age = calculateAge(us.dateOfBirth);
          const eventName = selectedEvent.tournamentEvent.toUpperCase();

          // Determine gender eligibility per user
          let isNotGender = false;

          if (eventName.startsWith('WOMENS')) {
            isNotGender = us.gender !== 'FEMALE';
          } else if (eventName.startsWith('MENS')) {
            isNotGender = us.gender !== 'MALE';
          } else if (eventName.startsWith('MIXED')) {
            isNotGender = false; // All genders allowed
          } else {
            isNotGender = true; // Default to disabled if unknown event
          }

          return {
            label: us.email,
            value: us.email,
            disabled:
              isNotGender ||
              age < selectedEvent.fromAge ||
              age > selectedEvent.toAge,
          };
        });

        setUserList(formattedData);
      }
    } catch (error: any) {
      console.error('Error searching user by email:', error);
    }
  };

  useEffect(() => {
    searchUserByEmail();
    getTournamentCondition();
    getTournamentEventCondition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedEventId, detailId, detail]);
  const handleRegisterTournament = async (values: any) => {
    if (!user) return;

    const { tournamentId, registrationRole, tournamentEventId, partnerEmail, submittedAnswerTour, submittedAnswerForEvent } =
      values;
    const imageList = [...identificationCardFiles, file];
    const imageListPartner = [...identificationCardFilesPartner, filePartner];
    // console.log('Check image', imageListPartner);

    const submittedAnswerForTournamentArray = Object.entries(submittedAnswerTour)?.map(
      ([key, value]) => ({
        [key]: value,
      })
    ) || [];
    // const submittedAnswerForEventArray = Object.entries(submittedAnswerForEvent)?.map(
    //   ([key, value]) => ({
    //     [key]: value,
    //   })
    // ) || [];
    console.log('submittedAnswerForTournament asdsa', submittedAnswerForTournamentArray);
    console.log(values, 'valuesRegister');
    try {
      setIsLoading(true);
      const response = await registerTournamentByAthleteAPI(
        user?.access_token,
        tournamentId,
        registrationRole,
        imageList,
        tournamentEventId,
        partnerEmail,
        imageListPartner,
        submittedAnswerForTournamentArray,
        // submittedAnswerForEventArray,
      );
      if (response?.status === 200 || response?.status === 201) {
        setIsModalOpen(false);
        setIsLoading(false);
        setIdentificationCardFiles([]);
        setFile(undefined);
        setIdentificationCardFilesPartner([]);
        setFilePartner(undefined);
        form.resetFields();
        setIsHasPartner(false);
        toast.success(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        // setIsModalOpen(false);
        setIsLoading(false);
        toast.error(`${response?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error: any) {
      console.log('Error', error);
    }
  };
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              fontFamily: 'inherit',
              defaultHoverBorderColor: '#FF8243',
              defaultHoverColor: '#FF8243',
              defaultActiveColor: '#FF8243',
              defaultActiveBorderColor: '#FF8243',
            },
          },
        }}
      >
        <Modal
          title="Registration Form"
          width={500}
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
            autoComplete="off"
            onFinish={handleRegisterTournament}
            layout="vertical"
            form={form}
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
                label="Tournament ID"
                name="tournamentId"
                hidden
                initialValue={detail?.id}
              >
                <Input placeholder="Tournament ID" disabled />
              </Form.Item>

              <Form.Item
                label="Registration Role"
                name="registrationRole"
                hidden
                initialValue={'ATHLETE'}
              >
                <Input placeholder="Registration Role" disabled />
              </Form.Item>

              <Form.Item label="Tournament Conditions">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                  }}
                >
                  {tournamentConditionList?.map((condition: any) => (
                    condition?.requirementType === 'FillIn' ? (
                      <Form.Item
                        key={condition.id}
                        name={['submittedAnswerTour', condition.requirementName]}
                        label={condition.requirementName}
                        rules={[
                          {
                            required: true,
                            message: 'This field is required',
                          },
                        ]}
                      >
                        <Input placeholder={condition?.requirementDescription} />
                      </Form.Item>
                    ) : (
                      condition?.requirementType === 'Selection' ? (
                        <Form.Item
                          key={condition.id}
                          name={['submittedAnswerTour', condition.requirementName]}
                          label={condition.requirementName}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <Select
                            placeholder={condition.requirementDescription}
                            style={{ width: '100%' }}
                            options={[{
                              label: "Yes",
                              value: "true"
                            }, {
                              label: "No",
                              value: "false"
                            }]}
                          />
                        </Form.Item>
                      ) : (
                        <Form.Item
                          key={condition.id}
                          name={['submittedAnswerTour', condition.requirementName]}
                          label={condition.requirementName}
                          // initialValue={condition?.requirementDescription}
                        >
                          <Input
                            variant="borderless"
                            readOnly
                            placeholder={condition?.requirementDescription}
                            defaultValue={condition?.requirementDescription}
                            style={{ color: 'gray' }}
                          />
                        </Form.Item>
                      )
                    )

                  ))}
                </div>
              </Form.Item>


              <Form.Item
                name="tournamentEventId"
                label="Tournament Events"
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              >
                <Select
                  defaultValue="Select tournament event"
                  style={{ width: '100%' }}
                  onChange={handleChangeEvent}
                  options={tournamentEventsOptions}
                />
              </Form.Item>

              <Form.Item label="Event Conditions">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                  }}
                >
                  {/* <span>{tournamentEventConditionList[0]?.requirementType}</span> */}

                  {tournamentEventConditionList?.map((condition: any) => (
                    condition?.requirementType === 'FillIn' ? (
                      <Form.Item
                        key={condition.id}
                        name={['submittedAnswerTour', condition.requirementName]}
                        label={condition.requirementName}
                        rules={[
                          {
                            required: true,
                            message: 'This field is required',
                          },
                        ]}
                      >
                        <Input placeholder={condition?.requirementDescription} />
                      </Form.Item>
                    ) : (
                      condition?.requirementType === 'Selection' ? (
                        <Form.Item
                          key={condition.id}
                          name={['submittedAnswerTour', condition.requirementName]}
                          label={condition.requirementName}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <Select
                            placeholder={condition.requirementDescription}
                            style={{ width: '100%' }}
                            options={[{
                              label: "Yes",
                              value: "true"
                            }, {
                              label: "No",
                              value: "false"
                            }]}
                          />
                        </Form.Item>
                      ) : (
                        <Form.Item
                          key={condition.id}
                          name={['submittedAnswerTour', condition.requirementName]}
                          label={condition.requirementName}
                          initialValue={""}
                        >
                          <Input
                            variant="borderless"
                            readOnly
                            placeholder={condition?.requirementDescription}
                          />
                        </Form.Item>
                      )
                    )

                  ))}
                </div>
              </Form.Item>

              {/* <Form.Item
                name="identificationCardImages"
                label="ID Card Images"
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              > */}

              <h1 className="text-[20px] font-bold mb-2">
                Athlete Infomations:
              </h1>

              <div>
                <h1 className="font-semibold text-[14px] mb-2">
                  ID Card Images
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleidentificationFileChange}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
                />
                {/* </Form.Item> */}

                {/* <Form.Item> */}
                <div className="flex flex-wrap gap-4">
                  {identificationCardFiles.map((file, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      width={200}
                      height={200}
                      className="max-w-full h-auto rounded-lg shadow"
                    />
                  ))}
                </div>
              </div>

              {/* </Form.Item> */}

              {/* <Form.Item
                name="idPhoto"
                label="ID Photo"
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              > */}

              <div>
                <h1 className="font-semibold text-[14px] mb-2">Card Photo</h1>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
                />
                {/* </Form.Item> */}

                {/* <Form.Item> */}
                <div>
                  {file && (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      width={200}
                      height={200}
                      className="max-w-full h-auto rounded-lg shadow"
                    />
                  )}
                </div>
              </div>

              {/* </Form.Item> */}

              {isHasPartner && (
                <>
                  <h1 className="text-[20px] font-bold mb-2">
                    Partner Infomations:
                  </h1>
                  <Form.Item
                    name="partnerEmail"
                    label="Email Partner"
                    style={{ fontFamily: 'inherit', fontWeight: '500' }}
                    rules={[
                      {
                        required: true,
                        message: 'Please input your partner  email!',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Search to select partner email"
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toString()
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={userList}
                    />
                  </Form.Item>
                  {/* <Form.Item
                    name="identificationCardImagesPartner"
                    label="ID Card Images Partner"
                    style={{ fontFamily: 'inherit', fontWeight: '500' }}
                  > */}
                  <div>
                    <h1 className="font-semibold text-[14px] mb-2">
                      ID Card Images Partner
                    </h1>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleidentificationFilePartnerChange}
                      className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
                    />
                    {/* </Form.Item> */}
                    {/* <Form.Item> */}
                    <div className="flex flex-wrap gap-4">
                      {identificationCardFilesPartner.map((file, index) => (
                        <Image
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt="Uploaded"
                          width={200}
                          height={200}
                          className="max-w-full h-auto rounded-lg shadow"
                        />
                      ))}
                    </div>
                  </div>
                  {/* </Form.Item> */}
                  {/* <Form.Item
                    name="idPhoto"
                    label="ID Photo Partner"
                    style={{ fontFamily: 'inherit', fontWeight: '500' }}
                  > */}
                  <div>
                    <h1 className="font-semibold text-[14px] mb-2">
                      Card Photo Partner
                    </h1>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFilePartnerChange}
                      className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
                    />
                    {/* </Form.Item> */}
                    {/* <Form.Item> */}
                    <div>
                      {filePartner && (
                        <Image
                          src={URL.createObjectURL(filePartner)}
                          alt="Uploaded"
                          width={200}
                          height={200}
                          className="max-w-full h-auto rounded-lg shadow"
                        />
                      )}
                    </div>
                  </div>

                  {/* </Form.Item>{' '} */}
                </>
              )}

              <Form.Item>
                <div className="w-full flex justify-end gap-2">
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>

                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#74ba74',
                      },
                    }}
                  >
                    <Button
                      style={{ fontWeight: '500' }}
                      type="primary"
                      htmlType="submit"
                    >
                      Register
                      {isLoading && (
                        <LoadingOutlined
                          style={{ marginLeft: '5px', fontSize: '20px' }}
                        />
                      )}
                    </Button>
                  </ConfigProvider>
                </div>
              </Form.Item>
            </ConfigProvider>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default RegisterAthleteTournamentForm;
