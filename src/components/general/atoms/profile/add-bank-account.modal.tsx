/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useDebounce } from '@/hooks/use-debounce';
import {
  addBankAccountAPI,
  checkBankAccountAPI,
  getBankListAPI,
} from '@/services/bank';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddBankAccountModal = ({
  isModalOpen,
  setIsModalOpen,
  accessToken,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bankList, setBankList] = useState<any>([]);
  const [isShowAccountNumber, setIsShowAccountNumber] = useState(false);
  const [form] = Form.useForm();
  const [bankId, setBankId] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [ownerName, setOwnerName] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const debouncedAccountNumber = useDebounce(accountNumber, 1000);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getBankList = async () => {
    try {
      const response = await getBankListAPI();
      console.log('Check bank list', response.data);
      if (
        response?.data.statusCode === 200 ||
        response?.data.statusCode === 201
      ) {
        const formatData = response.data.data.map((bank: any) => ({
          label: `${bank.name} (${bank.shortName})`,
          value: `${bank.id} _ ${bank.code}`,
        }));
        setBankList(formatData);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBankList();
  }, []);

  const handleCheckBankAccount = async (accountNumber: string) => {
    try {
      setIsLoading(true);
      const checkResponse = await checkBankAccountAPI(bankCode, accountNumber);
      console.log('Check bank account response', checkResponse.data);
      if (
        checkResponse?.data.statusCode === 200 ||
        checkResponse?.data.statusCode === 201
      ) {
        setIsLoading(false);
        setIsShowAccountNumber(true);
        setOwnerName(checkResponse.data.data.data.ownerName);
      } else {
        setIsLoading(false);
        toast.error(`${checkResponse?.data.message}`, {
          position: 'top-right',
          autoClose: 2000,
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
      setIsLoading(false);
      toast.error('Something went wrong.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    if (debouncedAccountNumber && bankCode) {
      handleCheckBankAccount(debouncedAccountNumber);
    }
  }, [debouncedAccountNumber, bankCode]);

  const handleSelectBank = (value: string) => {
    const [id, code] = value.split('_');
    console.log(id, code);
    setBankId(id.trim());
    setBankCode(code.trim());
    setIsShowAccountNumber(true);
  };

  const handleAddBankAccount = async (values: any) => {
    try {
      setIsLoading(true);

      // If check passed, proceed to add bank account
      const addResponse = await addBankAccountAPI(
        {
          bankId: bankId,
          accountNumber: values.accountNumber,
        },
        accessToken,
      );
      console.log('Add bank account response', addResponse.data);

      if (
        addResponse?.data.statusCode === 200 ||
        addResponse?.data.statusCode === 201
      ) {
        setIsLoading(false);
        setIsModalOpen(false);
        form.resetFields();
        setBankList([]);
        toast.success(`${addResponse?.data?.message}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        setIsLoading(false);
        toast.error(`${addResponse?.data.message}`, {
          position: 'top-right',
          autoClose: 2000,
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
      setIsLoading(false);
      toast.error('Something went wrong.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              /* here is your component tokens */
              defaultHoverBorderColor: '#FF8243',
              defaultHoverColor: '#FF8243',
              defaultActiveColor: '#FF8243',
              defaultActiveBorderColor: '#FF8243',
            },
          },
        }}
      >
        <Modal
          title="Add Bank Account"
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
            onFinish={handleAddBankAccount}
            layout="horizontal"
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
              <Form.Item label="Bank Account" name="bankId">
                <Select
                  showSearch
                  placeholder="Select your bank account"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={bankList}
                  onChange={handleSelectBank}
                />
              </Form.Item>

              {isShowAccountNumber && (
                <Form.Item label="Account Nummber" name="accountNumber">
                  <Input
                    placeholder="Enter your account number"
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </Form.Item>
              )}

              {ownerName && (
                <Form.Item label="Owner Name" initialValue={ownerName}>
                  <Input value={ownerName} disabled />
                </Form.Item>
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
                      Submit
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

export default AddBankAccountModal;
