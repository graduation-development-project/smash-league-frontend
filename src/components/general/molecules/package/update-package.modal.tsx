'use client';

import {
  getPackageDetailsByIdAPI,
  updatePackageDetailsAPI,
} from '@/services/package';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface PackageDetail {
  id: string;
  packageName: string;
  packageDetail: string;
  currentDiscountByAmount: number;
  price: number;
  credits: number;
  advantages: string[];
  isRecommended: boolean;
  isAvailable: boolean;
}
const UpdatePackageModal = ({
  isModalOpen,
  setIsModalOpen,
  packageId,
  getAllPackages,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  packageId: string;
  getAllPackages: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [packageDetail, setPackageDetail] = useState<PackageDetail>();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getPackageDetailsById = async () => {
    try {
      setIsLoading(true);
      console.log('packageId', packageId);
      const response = await getPackageDetailsByIdAPI(packageId);
      console.log('response', response);
      const data = response?.data;
      setPackageDetail(data);
      form.setFieldsValue({
        id: data?.id,
        packageName: data?.packageName,
        packageDetail: data?.packageDetail,
        currentDiscountByAmount: data?.currentDiscountByAmount,
        price: data?.price,
        credits: data?.credits,
        advantages: data?.advantages?.join('\n'),
        isRecommended: data?.isRecommended,
        isAvailable: data?.isAvailable,
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackageDetailsById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageId]);

  const handleUpdatePackage = async (values: any) => {
    try {
      setIsLoading(true);
      const payload = {
        ...values,
        advantages: values.advantages
          ?.split('\n')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0),
      };

      //   console.log("payload", payload);
      const response = await updatePackageDetailsAPI(payload);
      console.log('response', response);
      if (response?.status === 200 || response?.status === 201) {
        setIsModalOpen(false);
        setIsLoading(false);
        getAllPackages();
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
        setIsModalOpen(false);
        setIsLoading(false);
        toast.error(`${response?.data?.message}`, {
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
      console.log(error);
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
          title="Update Package Details"
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
            onFinish={handleUpdatePackage}
            layout="vertical"
            form={form}
          >
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    activeBorderColor: '#FF8243',
                    activeShadow: '0 0 0 2px #fffff',
                    hoverBorderColor: '#FF8243',
                  },
                },
              }}
            >
              <Form.Item name="id" hidden>
                <Input disabled />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Package Name"
                    name="packageName"
                    initialValue={packageDetail?.packageName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Package Detail" name="packageDetail">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Current Discount By Amount"
                    name="currentDiscountByAmount"
                  >
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Price" name="price">
                    <InputNumber />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Credits" name="credits">
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Is Recommended" name="isRecommended">
                    <Select
                      options={[
                        { value: true, label: 'Recommended' },
                        { value: false, label: 'Normal' },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Is Available" name="isAvailable">
                    <Select
                      options={[
                        { value: true, label: 'Active' },
                        { value: false, label: 'Inactive' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Advantages" name="advantages">
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
              </Row>

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

export default UpdatePackageModal;
