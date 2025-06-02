/* eslint-disable jsx-a11y/alt-text */
'use client';
import {
  uploadBgTourImageAPI,
  uploadMerchandiseImageAPI,
} from '@/services/create-tour';
import { getUmpireQualificationTypeAPI } from '@/services/qualification';
import { registerNewRoleAPI, registerUmpireRoleAPI } from '@/services/user';
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Col,
  Form,
  Input,
  Row,
  Image,
  Button,
  ConfigProvider,
  Card,
  Divider,
  Select,
} from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface QualificationType {
  label: string;
  value: string;
}
const BecomeUmpireForm = () => {
  const [idCardFront, setIdCardFront] = useState<File | null>(null);
  const [idCardBack, setIdCardBack] = useState<File | null>(null);
  const [cardPhoto, setCardPhoto] = useState<File | null>(null);
  const [degreeImages, setDegreeImages] = useState<File[]>([]);

  const idCardFrontRef = useRef<HTMLInputElement>(null);
  const idCardBackRef = useRef<HTMLInputElement>(null);
  const cardPhotoRef = useRef<HTMLInputElement>(null);
  const degreeImagesRef = useRef<HTMLInputElement>(null);

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [qualificationsTypes, setQualificationsTypes] = useState<
    QualificationType[]
  >([]);
  const [degreeImagesMap, setDegreeImagesMap] = useState<
    Record<number, File[]>
  >({});
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File) => void,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDegreeImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: number,
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setDegreeImagesMap((prev) => ({
        ...prev,
        [fieldKey]: [...(prev[fieldKey] || []), ...files],
      }));
    }
  };

  const handleDeleteDegreeImage = (fieldKey: number, index: number) => {
    setDegreeImagesMap((prev) => ({
      ...prev,
      [fieldKey]: (prev[fieldKey] || []).filter((_, i) => i !== index),
    }));
  };

  const fakeUpload = async (file: File): Promise<string> => {
    // Replace this with actual upload logic
    return Promise.resolve(URL.createObjectURL(file)); // mock link
  };

  const fetchUploadImages = async (fileList: File[]) => {
    try {
      const response = await uploadMerchandiseImageAPI(fileList);
      return response;
    } catch (error) {
      console.error(error, 'uploadMerchandiseImageAPI');
    }
  };

  const fetchUploadImage = async (file: File) => {
    try {
      const response = await uploadBgTourImageAPI(file);
      console.log('Successfully uploaded image:', response);
      return response.data;
    } catch (error) {
      console.error(error, 'uploadMerchandiseImageAPI');
    }
  };

  const getUmpireQualificationType = async () => {
    try {
      const response = await getUmpireQualificationTypeAPI();
      const formatData = response?.data?.data.map((degree: any) => ({
        label:
          degree?.value === 'UmpireDegree'
            ? 'Umpire Degree'
            : degree?.value === 'HealthCertificate'
            ? 'Health Certificate'
            : degree?.value === 'ForeignLanguageCertificate'
            ? 'Foreign Language Certificate'
            : 'Others',
        value: degree?.value,
      }));

      setQualificationsTypes(formatData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUmpireQualificationType();
  }, [user]);

  // console.log('Check qualificationsTypes', qualificationsTypes);

  const onFinish = async (values: any) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const IDCardFrontLink = idCardFront
        ? await fetchUploadImage(idCardFront)
        : '';
      const IDCardBackLink = idCardBack
        ? await fetchUploadImage(idCardBack)
        : '';
      const cardPhotoLink = cardPhoto ? await fetchUploadImage(cardPhoto) : '';

      // Upload degree images separately
      const registerUmpireData = await Promise.all(
        (values.items || []).map(async (item: any, index: number) => {
          const images = degreeImagesMap[index] || [];
          const degreeLinks = await Promise.all(
            images.map((file) => fetchUploadImage(file)),
          );
          return {
            ...item,
            degree: degreeLinks,
          };
        }),
      );

      const finalData = {
        role: 'Umpire',
        IDCardFront: IDCardFrontLink,
        IDCardBack: IDCardBackLink,
        cardPhoto: cardPhotoLink,
        registerUmpire: registerUmpireData,
      };

      // Submit
      const response = await registerUmpireRoleAPI(
        finalData,
        user?.access_token,
      );
      if (
        response?.statusCode === 200 ||
        response?.statusCode === 201 ||
        response?.statusCode === 204
      ) {
        toast.success(`${response?.message}`);
        form.resetFields();
        setIdCardFront(null);
        setIdCardBack(null);
        setCardPhoto(null);
        setDegreeImagesMap({});
        router.push('/home');
      } else {
        toast.error(`${response?.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error submitting data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Row style={{ width: '100%' }} justify={'center'}>
        <Col xs={24} md={16} lg={14}>
          <fieldset className="p-4 border rounded shadow bg-white">
            <legend className="text-xl font-bold">
              <span className="text-secondColor">Umpire</span> Verification
            </legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <ConfigProvider
                theme={{
                  token: { colorPrimary: '#74ba74' },
                }}
              >
                {/* Hidden Role */}
                <Form.Item name="role" initialValue="Umpire" hidden>
                  <Input />
                </Form.Item>

                {/* ID Card Front */}
                <Form.Item label="ID Card">
                  <Row gutter={16}>
                    <Col>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium">Front</span>
                        <div
                          onClick={() => idCardFrontRef.current?.click()}
                          className="w-[180px] h-[180px] flex justify-center items-center border border-dashed border-orange-400 rounded cursor-pointer"
                        >
                          {idCardFront ? (
                            <Image
                              src={URL.createObjectURL(idCardFront)}
                              width={180}
                              height={180}
                              style={{ objectFit: 'contain' }}
                            />
                          ) : (
                            <PlusOutlined
                              style={{ fontSize: '30px', color: '#FF8243' }}
                            />
                          )}
                          <input
                            type="file"
                            ref={idCardFrontRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, setIdCardFront)
                            }
                          />
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium">Back</span>
                        <div
                          onClick={() => idCardBackRef.current?.click()}
                          className="w-[180px] h-[180px] flex justify-center items-center border border-dashed border-orange-400 rounded cursor-pointer"
                        >
                          {idCardBack ? (
                            <Image
                              src={URL.createObjectURL(idCardBack)}
                              width={180}
                              height={180}
                              style={{ objectFit: 'contain' }}
                            />
                          ) : (
                            <PlusOutlined
                              style={{ fontSize: '30px', color: '#FF8243' }}
                            />
                          )}
                          <input
                            type="file"
                            ref={idCardBackRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setIdCardBack)}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form.Item>

                {/* Card Photo */}
                <Form.Item label="Card Photo">
                  <div
                    onClick={() => cardPhotoRef.current?.click()}
                    className="w-[180px] h-[180px] flex justify-center items-center border border-dashed border-orange-400 rounded cursor-pointer"
                  >
                    {cardPhoto ? (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image
                        src={URL.createObjectURL(cardPhoto)}
                        width={180}
                        height={180}
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <PlusOutlined
                        style={{ fontSize: '30px', color: '#FF8243' }}
                      />
                    )}
                    <input
                      type="file"
                      ref={cardPhotoRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setCardPhoto)}
                    />
                  </div>
                </Form.Item>

                {/* Degree Information */}
                <label className="font-semibold text-[18px] text-black">
                  Degree Information:
                </label>
                <Form.List name="items">
                  {(fields, { add, remove }) => (
                    <div className="flex flex-col gap-4 py-2">
                      {fields.map((field) => (
                        <Card
                          key={field.key}
                          size="small"
                          title={`Degree ${field.name + 1}`}
                          extra={
                            <CloseOutlined
                              onClick={() => remove(field.name)}
                              style={{ cursor: 'pointer' }}
                            />
                          }
                        >
                          <Form.Item
                            label="Type"
                            name={[field.name, 'typeOfDegree']}
                          >
                            <Select
                              showSearch
                              placeholder="Select a person"
                              filterOption={(input, option) =>
                                (option?.label ?? '')
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              options={qualificationsTypes}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Name"
                            name={[field.name, 'degreeTitle']}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item label="Degree Images">
                            <div className="flex gap-4 flex-wrap w-full">
                              {(degreeImagesMap[field.key] || []).map(
                                (file, index) => (
                                  <div key={index} className="relative">
                                    <Image
                                      src={URL.createObjectURL(file)}
                                      width={180}
                                      height={180}
                                      style={{ objectFit: 'contain' }}
                                      className="rounded shadow"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeleteDegreeImage(
                                          field.key,
                                          index,
                                        )
                                      }
                                      className="absolute top-0 right-0 bg-white rounded-full p-1"
                                    >
                                      <CloseOutlined
                                        style={{
                                          color: 'red',
                                          fontSize: '15px',
                                        }}
                                      />
                                    </button>
                                  </div>
                                ),
                              )}
                              <div
                                onClick={() => degreeImagesRef.current?.click()}
                                className="w-[180px] h-[180px] flex justify-center items-center border border-dashed border-orange-400 rounded cursor-pointer"
                              >
                                <PlusOutlined
                                  style={{ fontSize: '30px', color: '#FF8243' }}
                                />
                              </div>
                              <input
                                type="file"
                                ref={degreeImagesRef}
                                style={{ display: 'none' }}
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                  handleDegreeImagesChange(e, field.key)
                                }
                              />
                            </div>
                          </Form.Item>

                          <Form.Item
                            label="Description"
                            name={[field.name, 'description']}
                          >
                            <Input.TextArea />
                          </Form.Item>
                        </Card>
                      ))}
                      <Button type="dashed" onClick={() => add()} block>
                        + Add Degree
                      </Button>
                    </div>
                  )}
                </Form.List>

                {/* Submit */}
                <Form.Item
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                    {isLoading && (
                      <LoadingOutlined
                        style={{ marginLeft: '5px', fontSize: '20px' }}
                      />
                    )}
                  </Button>
                </Form.Item>
              </ConfigProvider>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default BecomeUmpireForm;
