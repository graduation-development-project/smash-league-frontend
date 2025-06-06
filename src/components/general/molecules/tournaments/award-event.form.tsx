import { getParticipantListAPI } from '@/services/detail-tour';
import {
  getAllPrizeOfEventAPI,
  updateEventPrizeWinnerAPI,
} from '@/services/tournament';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AwardEventForm = ({
  isModalOpen,
  setIsModalOpen,
  eventUUID,
  prizeEventList,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventUUID: string;
  prizeEventList: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [playerList, setPlayerList] = useState<{ user: any; partner?: any }[]>(
    [],
  );
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const fetchParticipantList = async () => {
    try {
      const res = await getParticipantListAPI(eventUUID);
      // console.log("Check participant list", res?.data?.listParticipants);
      if (res.statusCode === 200 || res.statusCode === 201) {
        const formatData = res?.data?.listParticipants.map(
          (participant: any) => ({
            label: `${
              participant?.partner
                ? participant?.user.name + ' / ' + participant?.partner.name
                : participant?.user.name
            }`,
            value: participant?.id,
          }),
        );
        setPlayerList(formatData);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // const getAllPrizeOfEvent = async () => {
  //     try {
  //         const res = await getAllPrizeOfEventAPI(eventUUID);
  //         // console.log("Check all prize of event", res?.data);
  //         if (res.statusCode === 200 || res.statusCode === 201) {
  //             setPrizeEventList(res?.data);
  //         }
  //     } catch (error: any) {
  //         console.log(error);
  //     }
  // };

  useEffect(() => {
    fetchParticipantList();
    // getAllPrizeOfEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventUUID]);

  // console.log("Check participant list", playerList);
  // console.log("Check all prize of event", prizeEventList);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    if (!user) return;

    setIsLoading(true);

    try {
      let allSuccess = true;

      for (let item of values.prizes) {
        let res = await updateEventPrizeWinnerAPI(
          item.prizeId,
          item.participantId,
          user.access_token,
        );

        if (![200, 201, 204].includes(res?.data?.statusCode)) {
          allSuccess = false;
          console.log(
            `Failed for prizeId: ${item.prizeId}, status: ${res.status}`,
          );
        }
      }

      setIsLoading(false);

      if (allSuccess) {
        setIsModalOpen(false);
        form.resetFields();
        toast.success('Update successfully', {
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
        toast.error('Some updates failed. Check the console for details.', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
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
          title="Award Event Form"
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
            onFinish={onFinish}
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
              {/* <Form.Item label="Tournament Conditions">
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '90%',
                                    }}
                                >
                                    {prizeEventList?.map((condition: any) => (
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
                                                placeholder={"Select a player"}
                                                style={{ width: '100%' }}
                                                options={playerList}
                                            />
                                        </Form.Item>
                                    ))}
                                </div>
                            </Form.Item> */}

              {prizeEventList?.map((prize: any, index: number) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  {/* Hidden field để submit prizeId */}
                  <Form.Item
                    name={['prizes', index, 'prizeId']}
                    initialValue={prize.id}
                    hidden
                  >
                    <Input />
                  </Form.Item>

                  {/* Hiển thị label tĩnh */}
                  <Typography.Text
                    strong
                    style={{ display: 'block', marginBottom: 8 }}
                  >
                    {prize.prizeName}
                  </Typography.Text>

                  {/* Select người nhận giải */}
                  <Form.Item
                    name={['prizes', index, 'participantId']}
                    rules={[
                      {
                        required: true,
                        message: 'This field is required',
                      },
                    ]}
                    style={{ marginBottom: 8 }}
                  >
                    <Select
                      placeholder="Select a player"
                      style={{ width: '100%' }}
                      options={playerList}
                    />
                  </Form.Item>
                </div>
              ))}

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
                      loading={isLoading}
                    >
                      Update
                      {/* {isLoading && (
                        <LoadingOutlined
                          style={{ marginLeft: '5px', fontSize: '20px' }}
                        />
                      )} */}
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

export default AwardEventForm;
