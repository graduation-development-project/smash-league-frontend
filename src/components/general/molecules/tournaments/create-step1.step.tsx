/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import {
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  CheckboxProps,
  ColorPicker,
  ColorPickerProps,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  GetProp,
  GetProps,
  Input,
  InputNumber,
  InputRef,
  message,
  Radio,
  Select,
  SelectProps,
  Space,
  Spin,
  TimePicker,
  Typography,
} from 'antd';
import Image from 'next/image';
import { Info } from 'lucide-react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  getDistrictAPI,
  getProvinceAPI,
  getWardAPI,
} from '@/services/location';
import { data } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { generateUrlAPI, isExistedUrlAPI } from '@/services/create-tour';
import { createTourSerieAPI, getAllMySeriesAPI } from '@/services/serie';

interface SelectItemProps {
  label: string;
  value: string;
}
type Color = Extract<
  GetProp<ColorPickerProps, 'value'>,
  string | { cleared: any }
>;
type Format = GetProp<ColorPickerProps, 'format'>;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);
const formatTimeCheckIn = 'mm:ss';

const CreateTourStep1 = ({
  dataStep1,
  form,
  accessToken,
  fileBgTour,
  setFileBgTour,
  fileImgMerchandiseList,
  setFileImgMerchandiseList,
}: any) => {
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);
  form.setFieldValue('host', user?.name);

  //url
  const [url, setUrl] = useState<string>(dataStep1?.url || '');
  const [isLoadingCheckUrl, setIsLoadingCheckUrl] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);
  const isValidFormat = (url: string) => /^[a-zA-Z0-9-]{8,}$/.test(url);
  const debounceUrl = useDebounce(url, 1000);

  // const [fileBgTour, setFileBgTour] = useState<File | null>(null);
  const [imageURLBgTour, setImageURLBgTour] = useState<string>('');
  const [formatHex, setFormatHex] = useState<Format>('hex');
  const [colorHex, setColorHex] = useState<string>('#ff8243');

  const [province, setProvince] = useState(dataStep1?.province || '');
  const [district, setDistrict] = useState(dataStep1?.district || '');
  const [provinceId, setProvinceId] = useState(dataStep1?.provinceId || '');
  const [districtId, setDistrictId] = useState(dataStep1?.districtId || '');
  const [provinceName, setProvinceName] = useState(
    dataStep1?.provinceName || '',
  );
  const [districtName, setDistrictName] = useState(
    dataStep1?.districtName || '',
  );

  const [ward, setWard] = useState(dataStep1?.ward || '');
  const [street, setStreet] = useState('');
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [location, setLocation] = useState(dataStep1?.location || '');

  // const [sponsorList, setSponsorList] = useState(['Nestlé', 'Pepsi', 'Nike', 'Adidas', 'Sacombank']);

  const [serieList, setSerieList] = useState([]);
  // const [items, setItems] = useState(['jack', 'lucy']);
  const [addSerieName, setAddSerieName] = useState('');
  const inputSerieRef = useRef<InputRef>(null);
  const inputImgMerchanRef = useRef<HTMLInputElement | null>(null);

  const [organizerList, setOrganizerList] = useState([
    'a10',
    'c12',
    'h17',
    'j19',
    'k20',
  ]);
  const [attachmentList, setAttachmentList] = useState([]);

  const [isRecruit, setIsRecruit] = useState<boolean>(false);

  //Registration & Fee
  const [isRegister, setIsRegister] = useState(dataStep1?.isRegister || false);
  const [registerDate, setRegisterDate] = useState<Array<dayjs.Dayjs>>([]);
  const [drawDate, setDrawDate] = useState<Array<dayjs.Dayjs>>([]);
  const [occurDate, setOccurDate] = useState<Array<dayjs.Dayjs>>([]);

  const [hasMerchandise, setHasMerchandise] = useState(false);

  const handleColorChange = (value: Color) => {
    console.log(value, 'mainColorValue');

    const hexValue = typeof value === 'string' ? value : value?.toHexString();
    console.log(hexValue, 'mainColor');
    if (hexValue) setColorHex(hexValue);
    form.setFieldValue('mainColor', hexValue);
  };
  const fetchGetAllSeries = async () => {
    try {
      const res = await getAllMySeriesAPI(accessToken);
      if (res.statusCode === 200) setSerieList(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchCheckExistUrl = async () => {
    setIsLoadingCheckUrl(true);
    try {
      const response = await isExistedUrlAPI(url);
      setIsValidUrl(response?.data);
    } catch (error: any) {
      console.error('Error checking URL existence:', error);
      message.error('Failed to check URL existence');
      setIsValidUrl(null);
    } finally {
      setIsLoadingCheckUrl(false);
    }
  };

  const fetchGenerateUrl = async () => {
    setIsLoadingCheckUrl(true);
    try {
      const response = await generateUrlAPI();
      console.log(response, 'response');

      if (response?.statusCode === 200) {
        setUrl(response?.data);
        form.setFieldValue('id', response?.data);
      }
    } catch (error: any) {
      console.error('Error checking URL existence:', error);
      message.error('Failed to check URL existence');
      setIsValidUrl(null);
    } finally {
      setIsLoadingCheckUrl(false);
    }
  };
  const fetchProvince = async () => {
    try {
      const res = await getProvinceAPI();
      setProvinceList(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchCreateTourSerie = async (accessToken: string, serieName: any) => {
    try {
      const response = await createTourSerieAPI(accessToken, {
        tournamentSerieName: serieName,
        serieBackgroundImageURL:
          'https://t3.ftcdn.net/jpg/03/10/62/12/360_F_310621281_foEqKBGtGlNWFQRePgdF5BpLOFyTsnzO.jpg',
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const onAddSerieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddSerieName(event.target.value);
  };

  const addCreateSerie = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    const createTour = await fetchCreateTourSerie(accessToken, addSerieName);
    if (createTour?.statusCode === 200 || createTour?.statusCode === 201) {
      fetchGetAllSeries();
      setAddSerieName('');
      setTimeout(() => {
        inputSerieRef.current?.focus();
      }, 0);
    }
  };

  const handleProvinceChange = (value: string) => {
    const [selectedProvinceId, selectedProvinceName] = value.split('|');
    setProvinceId(selectedProvinceId);
    setProvinceName(selectedProvinceName);
  };
  const handleDistrictChange = (value: string) => {
    const [selectedDistrictId, selectedDistrictName] = value.split('|');
    setDistrictId(selectedDistrictId);
    setDistrictName(selectedDistrictName);
  };

  const handleFileBgTourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileBgTour(e.target.files[0]);
    }
  };

  const handleFileImgMerchandiseChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      console.log(e.target.files);
      console.log(fileImgMerchandiseList);

      setFileImgMerchandiseList([
        ...fileImgMerchandiseList,
        ...Array.from(e.target.files),
      ]);
    }
  };
  const handleDeleteFileBgTour = (index: number) => {
    setFileImgMerchandiseList(
      fileImgMerchandiseList.filter((_: File, i: number) => i !== index),
    );
  };

  //Register, Occur, Draw
  const disabledRegisterDate = (current: dayjs.Dayjs) => {
    return (
      current && current.isBefore(dayjs().add(1, 'day').startOf('day'), 'day')
    );
  };

  const disabledDrawDate = (current: dayjs.Dayjs) => {
    return (
      current &&
      (current.isBefore(dayjs().add(1, 'day').startOf('day'), 'day') ||
        (registerDate.length > 0 &&
          current.isBefore(
            registerDate[1].add(1, 'day').startOf('day'),
            'day',
          )))
    );
  };
  const disabledOccurDate = (current: dayjs.Dayjs) => {
    return (
      current &&
      (current.isBefore(dayjs().add(1, 'day').startOf('day'), 'day') ||
        (drawDate.length > 0 &&
          current.isBefore(drawDate[1].add(1, 'day').startOf('day'), 'day')))
    );
  };

  //------ Organizers & Umpirea Information ----------
  //Host Organizer
  const selectOrganizers: SelectItemProps[] = [];
  //get organizer list from DB
  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    selectOrganizers.push({
      label: `username: ${value}`,
      value,
    });
  }

  const selectAttachments: SelectItemProps[] = [];
  //get organizer list from DB
  selectAttachments.push(
    { label: 'Portrait Photo', value: 'PORTRAIT_PHOTO' },
    { label: 'Identity Card', value: 'IDENTIFICATION_CARD' },
  );

  const sharedAttachmentProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    options: selectAttachments,
    placeholder: 'Select required attachments',
    maxTagCount: 'responsive',
  };
  const selectAttachmentProps: SelectProps = {
    value: attachmentList,
    onChange: setAttachmentList,
  };

  //------ Game Rules ----------
  //checkbox Categories

  const eventOptions = [
    { label: "Men's Singles", value: 'MENS_SINGLE' },
    { label: "Women's Singles", value: 'WOMENS_SINGLE' },
    { label: "Men's Doubles", value: 'MENS_DOUBLE' },
    { label: "Women's Doubles", value: 'WOMENS_DOUBLE' },
    { label: 'Mixed Doubles', value: 'MIXED_DOUBLE' },
  ];
  const defaultEventList = ['MENS_SINGLE', 'WOMENS_SINGLE'];
  const [eventList, setEventList] = useState<string[]>(defaultEventList);

  const checkAllEventList = eventOptions.length === eventList.length;
  const indeterminate =
    eventList.length > 0 && eventList.length < eventOptions.length;
  const onChangeEvent = (list: string[]) => {
    setEventList(list.length > 0 ? list : defaultEventList);
  };
  const onCheckAllEventChange: CheckboxProps['onChange'] = (e) => {
    setEventList(
      e.target.checked ? eventOptions.map((option) => option.value) : [],
    );
  };

  //------ Rewards & Merchandise ----------

  const [imageURLImgMerchandise, setImageURLImgMerchandise] =
    useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchGetAllSeries();
    fetchProvince();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ url: url });
  }, [url]);
  useEffect(() => {
    if (debounceUrl.length > 8) {
      fetchCheckExistUrl();
    }
  }, [debounceUrl]);

  useEffect(() => {
    if (provinceId !== '') {
      form.setFieldValue('district', '');
      setDistrict('');

      const fetchDistrict = async (provinceId: string) => {
        try {
          const res = await getDistrictAPI(provinceId);
          setDistrictList(res);
        } catch (error: any) {
          console.log(error);
        }
      };
      fetchDistrict(provinceId);
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId !== '') {
      form.setFieldValue('ward', '');
      setWard('');

      const fetchWard = async (districtId: string) => {
        try {
          const wards = await getWardAPI(districtId);
          setWardList(wards);
        } catch (error: any) {
          console.log(error);
        }
      };
      fetchWard(districtId);
    }
  }, [provinceId, districtId]);

  useEffect(() => {
    const newLocation = [street, ward, districtName, provinceName].join(', ');
    setLocation(
      street === '' || ward === '' || districtName === '' || provinceName === ''
        ? newLocation
        : '',
    );
    form.setFieldValue('location', newLocation);
  }, [street, ward, districtName, provinceName]);

  return (
    <div className="w-full h-max flex flex-col items-center justify-center rounded gap-10">
      <section className="w-full flex flex-col shadow-shadowBtn">
        <div className="w-full h-max flex bg-primaryColor rounded-t-md">
          <div className="w-full h-max flex justify-between items-center px-10 py-1">
            <h1 className="font-quicksand  text-base font-bold text-white">
              Tournament Information
            </h1>
          </div>
        </div>
        <div className="w-full h-max p-10">
          <Form.Item label="Tournament Name" name="name" required>
            <Input placeholder="Your tournament's name" required />
          </Form.Item>
          <Form.Item label="Short name" name="shortName" required>
            <Input placeholder="Short name" required />
          </Form.Item>
          <Form.Item label="Tournament URL" name="url" required>
            <Space.Compact block>
              <Form.Item
                noStyle
                name="id"
                initialValue={url}
                required
                rules={[
                  { required: true, message: 'URL is required!' },
                  {
                    pattern: /^[a-zA-Z0-9-]{8,}$/,
                    message:
                      'Must be at least 8 characters and no special characters',
                  },
                ]}
              >
                <Input
                  addonBefore="https://smashit.com.vn/"
                  placeholder="Your tournament's URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  suffix={
                    isLoadingCheckUrl ? (
                      <Spin indicator={<LoadingOutlined />} />
                    ) : isValidUrl !== null ? (
                      isValidUrl ? (
                        <CheckOutlined style={{ color: 'green' }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: 'red' }} />
                      )
                    ) : null
                  }
                />
              </Form.Item>
              <Button type="primary" onClick={fetchGenerateUrl}>
                Random Url
              </Button>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            name="backgroundTournament"
            label="Tournament's Image"
            required
          >
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleFileBgTourChange}
              className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div>
              {fileBgTour && (
                <Image
                  src={URL.createObjectURL(fileBgTour)}
                  alt="Uploaded"
                  width={200}
                  height={200}
                  className="max-w-full h-auto rounded-lg shadow-shadowBtn"
                />
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="mainColor"
            label="Your Tour Color"
            initialValue={'#ff8243'}
          >
            <ColorPicker
              format={formatHex}
              value={colorHex}
              onChange={handleColorChange}
              // onFormatChange={setFormatHex}
              showText={true}
            />
          </Form.Item>
          <Form.Item name={'prizePool'} label="Prize pool" required>
            <InputNumber<number>
              min={0}
              suffix={'VND'}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, '') as unknown as number
              }
              style={{ marginTop: '8px', width: '100%' }}
              placeholder="Prize pool"
              changeOnWheel
              width={'100%'}
            />
          </Form.Item>
          <Form.Item style={{ rowGap: '10px' }} label="Location" required>
            <Space.Compact block>
              <Form.Item
                name={'province'}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select
                  onChange={handleProvinceChange}
                  value={provinceName}
                  placeholder="Select province"
                >
                  {provinceList?.map((province: any) => {
                    return (
                      <Select.Option
                        key={province.ProvinceID}
                        value={`${province.ProvinceID}|${province.ProvinceName}`}
                      >
                        {' '}
                        {province.ProvinceName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={'district'}
                noStyle
                rules={[{ required: true, message: 'District is required' }]}
              >
                <Select
                  onChange={handleDistrictChange}
                  value={districtName}
                  placeholder="Select district"
                >
                  {districtList?.map((district: any) => {
                    return (
                      <Select.Option
                        key={district.DistrictID}
                        value={`${district.DistrictID}|${district.DistrictName}`}
                      >
                        {' '}
                        {district.DistrictName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={'ward'}
                noStyle
                rules={[{ required: true, message: 'Ward is required' }]}
              >
                <Select
                  onChange={(e) => setWard(e)}
                  value={ward}
                  placeholder="Select ward"
                >
                  {wardList?.map((ward: any) => {
                    return (
                      <Select.Option key={ward.WardID} value={ward.WardName}>
                        {ward.WardName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Space.Compact>
            <br />
            <Form.Item
              name={'street'}
              noStyle
              rules={[{ required: true, message: 'Street is required' }]}
            >
              <Input
                onChange={(e) => setStreet(e.target.value)}
                style={{ width: '50%' }}
                placeholder="Input address number and street"
              />
            </Form.Item>

            <br />

            <Form.Item name="location" noStyle style={{ marginTop: '12px' }}>
              <Input defaultValue={location} variant="borderless" readOnly />
            </Form.Item>
          </Form.Item>
          <Form.Item name="introduction" label="Introduction" required>
            <TextArea
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Tournament's introduction"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item name="description" label="Description" required>
            <TextArea
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Tournament description"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            name="tournamentSerieId"
            label="Tournament Serie"
            initialValue={null}
          >
            <Select
              // style={{ width: 300 }}
              placeholder="Choose Tournament Serie"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ width: '100%', margin: '8px 0' }} />
                  <Space
                    style={{
                      padding: '0 8px 4px',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                    }}
                  >
                    <div className="w-full flex flex-row justify-between gap-5">
                      <Input
                        style={{ width: 300 }}
                        placeholder="New Serie"
                        ref={inputSerieRef}
                        value={addSerieName}
                        onChange={onAddSerieChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />

                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={handleFileBgTourChange}
                        className=" w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <div>
                        {fileBgTour && (
                          <Image
                            src={URL.createObjectURL(fileBgTour)}
                            alt="Uploaded"
                            width={100}
                            height={100}
                            className="max-w-full h-auto rounded-lg shadow-shadowBtn"
                          />
                        )}
                      </div>
                    </div>

                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={addCreateSerie}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={serieList.map((serie: any) => ({
                label: serie.tournamentSerieName,
                value: serie.id,
              }))}
            />
            {/* <Button style={{ marginTop: '10px' }} >New Event</Button> */}
          </Form.Item>
        </div>
      </section>

      {/* <div className='w-1/2  h-1 bg-primaryColor' /> */}

      <section className="w-full flex flex-col shadow-shadowBtn">
        <div className="w-full h-max flex bg-primaryColor rounded-t-md">
          <div className="w-full h-max flex justify-between items-center px-10 py-1">
            <h1 className="font-quicksand  text-base font-bold text-white">
              Organizers & Umpires
            </h1>
          </div>
        </div>
        <div className="w-full h-max p-10">
          <Form.Item
            name="host"
            label="Host"
            initialValue={user?.name}
            required
          >
            <Input disabled />
          </Form.Item>
          {/* <Form.Item name="organizers" label="Co-Organizers">
                        <Select {...sharedOrganizerProps} {...selectOrganizerProps} />
                    </Form.Item> */}
          <Form.Item name="contactEmail" label="Contact Email" required>
            <Input placeholder="Your email here" />
          </Form.Item>
          <Form.Item
            label=" Contact Phone Number"
            name="contactPhone"
            required
            rules={[
              { required: true },
              {
                pattern: new RegExp('^[0-9-+]{9,15}$'),
                message: 'Please enter a valid phone number',
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </div>
      </section>

      <section className="w-full flex flex-col shadow-shadowBtn">
        <div className="w-full h-max flex bg-primaryColor rounded-t-md">
          <div className="w-full h-max flex justify-between items-center px-10 py-1">
            <h1 className="font-quicksand  text-base font-bold text-white">
              Game Rules
            </h1>
          </div>
        </div>
        <div className="w-full h-max flex flex-col p-10 justify-center items-center">
          <div className="w-full h-max flex flex-col">
            <Form.Item
              name="maxEventPerPerson"
              label="Max events an athlete can register"
            >
              <Select placeholder="Number events per athlete can join">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Select.Option key={num} value={num}>
                    {num}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Events" required>
              <Divider />
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllEventChange}
                checked={checkAllEventList}
              >
                Check all
              </Checkbox>
              <Divider />
              <Checkbox.Group
                options={eventOptions}
                value={eventList}
                onChange={onChangeEvent}
              />
            </Form.Item>
          </div>
          {/* <div className='w-full h-max flex justify-center items-center'> */}

          {/* <Form.Item noStyle name={['categories', 'min']}> */}
          <Form.List name="createTournamentEvent">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 16,
                  width: '90%',
                }}
              >
                {eventList?.map((event, index) => {
                  const field = fields.find((f) => f.name === index);
                  if (!field) add();

                  return (
                    <Card
                      size="small"
                      title={
                        eventOptions?.find((e) => e.value === event)?.label ||
                        event
                      }
                      key={event}
                      style={{
                        borderWidth: 2,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 16,
                        alignSelf: 'center',
                      }}
                      extra={
                        eventList.length > 1 && (
                          <CloseOutlined
                            onClick={() => {
                              remove(index);
                              setEventList(
                                eventList.filter((item) => item !== event),
                              );
                            }}
                          />
                        )
                      }
                    >
                      <Form.List name={[index, event]}>
                        {(subFields, subOpt) => {
                          if (subFields.length === 0) {
                            subOpt.add();
                          }

                          return (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: 16,
                                width: '100%',
                              }}
                            >
                              {subFields.map((subField) => (
                                <Card
                                  size="small"
                                  style={{
                                    borderWidth: 2,
                                    width: '90%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: 16,
                                    alignSelf: 'center',
                                  }}
                                  key={subField.key}
                                  title={
                                    <Space key={subField.key}>
                                      From
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, 'fromAge']}
                                        required
                                      >
                                        <InputNumber
                                          min={5}
                                          max={99}
                                          style={{ width: '150px' }}
                                          placeholder="Minimum age"
                                        />
                                      </Form.Item>
                                      to
                                      <Form.Item
                                        noStyle
                                        name={[subField.name, 'toAge']}
                                        required
                                      >
                                        <InputNumber
                                          min={5}
                                          max={100}
                                          style={{ width: '150px' }}
                                          placeholder="Maximum age"
                                        />
                                      </Form.Item>
                                    </Space>
                                  }
                                  extra={
                                    subFields.length > 1 && (
                                      <CloseOutlined
                                        onClick={() =>
                                          subOpt.remove(subField.name)
                                        }
                                      />
                                    )
                                  }
                                >
                                  {/* FIX: Properly nest fields inside Form.List */}
                                  <Form.Item
                                    name={[subField.name, 'typeOfFormat']}
                                    label="Type of format"
                                    initialValue={'SINGLE_ELIMINATION'}
                                    required
                                  >
                                    <Select placeholder="Number of game(s)">
                                      <Select.Option value="SINGLE_ELIMINATION">
                                        Single Elimination
                                      </Select.Option>
                                      {/* <Select.Option value="ROUND_ROBIN">Round Robin</Select.Option> */}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    name={[subField.name, 'maximumAthlete']}
                                    label="Maximum athletes"
                                    required
                                  >
                                    <InputNumber
                                      min={0}
                                      max={1000}
                                      style={{ width: '100%' }}
                                      placeholder="Maximum athletes"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name={[subField.name, 'minimumAthlete']}
                                    label="Minimum athletes"
                                    required
                                  >
                                    <InputNumber
                                      min={4}
                                      max={100}
                                      style={{ width: '100%' }}
                                      placeholder="Maximum athletes"
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    name={[subField.name, 'numberOfGames']}
                                    label="Number of games"
                                    required
                                  >
                                    <Select placeholder="Number of game(s)">
                                      <Select.Option value="1">1</Select.Option>
                                      <Select.Option value="3">3</Select.Option>
                                      <Select.Option value="5">5</Select.Option>
                                    </Select>
                                  </Form.Item>

                                  <Form.Item
                                    name={[subField.name, 'winningPoint']}
                                    label="Winning points"
                                  >
                                    <InputNumber
                                      min={15}
                                      max={51}
                                      style={{ width: '100%' }}
                                      placeholder="Winning points"
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    name={[subField.name, 'lastPoint']}
                                    label="Last points"
                                    required
                                  >
                                    <InputNumber
                                      min={15}
                                      max={51}
                                      style={{ width: '100%' }}
                                      placeholder="Last points"
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    name={[
                                      subField.name,
                                      'ruleOfEventExtension',
                                    ]}
                                    label="Rules"
                                  >
                                    <TextArea
                                      placeholder="Enter rules"
                                      autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                  </Form.Item>

                                  <Divider />
                                  <Form.Item
                                    name={[subField.name, 'championshipPrize']}
                                    label="Champion Rewards"
                                    required
                                  >
                                    <Input style={{ width: '100%' }} />
                                  </Form.Item>

                                  <Form.Item
                                    name={[subField.name, 'runnerUpPrize']}
                                    label="Runner-up"
                                  >
                                    <Input style={{ width: '100%' }} />
                                  </Form.Item>

                                  <Form.Item
                                    name={[subField.name, 'thirdPlacePrize']}
                                    label="Third Place"
                                  >
                                    <Input style={{ width: '100%' }} />
                                  </Form.Item>

                                  {/* <Form.Item
                                    name={[
                                      subField.name,
                                      'jointThirdPlacePrize',
                                    ]}
                                    label="Third Place (Tie)"
                                  >
                                    <Input style={{ width: '100%' }} />
                                  </Form.Item> */}
                                </Card>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                              >
                                + Add Range Age
                              </Button>
                            </div>
                          );
                        }}
                      </Form.List>
                    </Card>
                  );
                })}
              </div>
            )}
          </Form.List>
          {/* </Form.Item> */}
          {/* </div> */}
        </div>
      </section>
      <section className="w-full h-max flex flex-col shadow-shadowBtn ">
        <div className="w-full h-max flex bg-primaryColor rounded-t-md">
          <div className="w-full h-max flex px-10 py-1">
            <h1 className="font-quicksand  text-base font-bold text-white">
              Registration & Fee
            </h1>
          </div>
        </div>
        <div className="w-full h-max p-10">
          <Form.Item
            name="isRegister"
            label="Registration"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
            initialValue={true}
            required
          >
            <Radio.Group
              onChange={(e) => {
                setIsRegister(e.target.value);
              }}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                rowGap: '8px',
              }}
            >
              {/* <Radio value={false}> Provide a list of participants </Radio> */}
              <Radio value={true}>
                {' '}
                Host a sign-up tournament — This will allow ahtletes to sign up{' '}
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={'registrationFeePerPair'}
            label={'Registration Fee Per Pair'}
            // style={isRegister ? { display: 'block' } : { display: 'none' }}
            initialValue={0}
          >
            <InputNumber<number>
              min={0}
              suffix={'VND'}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, '') as unknown as number
              }
              style={{ marginTop: '8px', width: '100%' }}
              placeholder="Fee"
              changeOnWheel
              width={'100%'}
            />
            {/* <span className='text-[12px] text-textColor2 flex items-center gap-1 mt-2 ml-3'><Info size={15} /> Refund policy <a href="">here</a></span> */}
          </Form.Item>
          <Form.Item
            name={'registrationFeePerPerson'}
            label={'Registration Fee Per Person'}
            // style={isRegister ? { display: 'block' } : { display: 'none' }}
            initialValue={0}
          >
            <InputNumber<number>
              min={0}
              suffix={'VND'}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, '') as unknown as number
              }
              style={{ marginTop: '8px', width: '100%' }}
              placeholder="Fee"
              changeOnWheel
              width={'100%'}
            />
            {/* <span className='text-[12px] text-textColor2 flex items-center gap-1 mt-2 ml-3'><Info size={15} /> Refund policy <a href="">here</a></span> */}
          </Form.Item>
          <Form.Item
            name={'protestFeePerTime'}
            label={'Potest Fee Per Time'}
            initialValue={0}
          >
            <InputNumber<number>
              min={0}
              suffix={'VND'}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, '') as unknown as number
              }
              style={{ marginTop: '8px', width: '100%' }}
              placeholder="Fee"
              changeOnWheel
              width={'100%'}
            />
            {/* <span className='text-[12px] text-textColor2 flex items-center gap-1 mt-2 ml-3'><Info size={15} /> Refund policy <a href="">here</a></span> */}
          </Form.Item>
          <Divider />

          <Form.Item
            name={'registrationDate'}
            style={{ display: 'block' }}
            label="Registration Date"
            required
          >
            <RangePicker
              placeholder={['Select Start Date', 'Select End Date']}
              disabledDate={disabledRegisterDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs('00:00:00', 'HH:mm:ss'),
                  dayjs('23:59:59', 'HH:mm:ss'),
                ],
              }}
              onChange={(date: any) => {
                setRegisterDate(date);
              }}
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name={'requiredAttachment'}
            label="Required attachments"
            required
          >
            <Select {...sharedAttachmentProps} {...selectAttachmentProps} />
          </Form.Item>
        </div>
      </section>
      <section className="w-full flex flex-col shadow-shadowBtn">
        <div className="w-full h-max flex bg-primaryColor rounded-t-md">
          <div className="w-full h-max flex justify-between items-center px-10 py-1">
            <h1 className="font-quicksand  text-base font-bold text-white">
              Schedule & Matches
            </h1>
          </div>
        </div>
        <div className="w-full h-max p-10">
          <Form.Item
            name={'drawDate'}
            label="Draw Date"
            style={{ display: 'block' }}
            required
          >
            <RangePicker
              placeholder={['Select Start Date', 'Select End Date']}
              disabledDate={disabledDrawDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs('00:00:00', 'HH:mm:ss'),
                  dayjs('23:59:59', 'HH:mm:ss'),
                ],
              }}
              onChange={(date: any) => {
                setDrawDate(date);
              }}
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name={'occurDate'}
            label="Occur Date"
            style={{ display: 'block' }}
            required
          >
            <RangePicker
              placeholder={['Select Start Date', 'Select End Date']}
              disabledDate={disabledOccurDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs('00:00:00', 'HH:mm:ss'),
                  dayjs('23:59:59', 'HH:mm:ss'),
                ],
              }}
              onChange={(date: any) => {
                setOccurDate(date);
              }}
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name={'checkIn'}
            label="Check-in before start time"
            initialValue={dayjs('15:00', formatTimeCheckIn)}
            required
          >
            <TimePicker
              defaultValue={dayjs('15:00', formatTimeCheckIn)}
              format={formatTimeCheckIn}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            name="umpirePerMatch"
            label="Main umpires in a match"
            required
          >
            <InputNumber
              min={1}
              max={3}
              suffix={'Umpire(s)'}
              style={{ width: '100%' }}
              placeholder="Number of umpires"
              changeOnWheel
            />
          </Form.Item>
          {/* <Form.Item
            name="linemanPerMatch"
            label="Linesman in a match"
            required
          >
            <InputNumber
              min={1}
              max={5}
              suffix={'Linemans'}
              style={{ width: '100%', marginTop: '8px' }}
              placeholder="Number of umpires"
              changeOnWheel
            />
          </Form.Item> */}
        </div>
      </section>
      <section className="w-full flex flex-col shadow-shadowBtn">
        <div className="w-full h-max flex bg-primaryColor rounded-t-md">
          <div className="w-full h-max flex justify-between items-center px-10 py-1">
            <h1 className="font-quicksand text-base font-bold text-white">
              Merchandise
            </h1>
          </div>
        </div>
        <div className="w-full h-max p-10">
          <Form.Item name="hasMerchandise" label="Merchandise for audiences">
            <Radio.Group
              onChange={(e) => setHasMerchandise(e.target.value)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                rowGap: '8px',
              }}
            >
              <Radio value={false}>No merchandise </Radio>
              <Radio value={true}>Give merchandise for audiences </Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ display: hasMerchandise ? 'block' : 'none' }}>
            <Form.Item name={'merchandise'} label="Merchandise description">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name={'numberOfMerchandise'}
              label="Number of merchandise"
              required
            >
              <InputNumber
                min={1}
                max={1000}
                style={{ width: '100%' }}
                placeholder="Number of merchandise"
                changeOnWheel
              />
            </Form.Item>
            <Form.Item name="merchandiseImages" label="Merchandise Image">
              <Divider />
              <div className="flex gap-4 flex-wrap w-full">
                {fileImgMerchandiseList.length < 5 && (
                  <div
                    className="w-[180px] h-[180px] flex justify-center items-center rounded-lg border-[1px] border-dashed border-[#FF8243] cursor-pointer"
                    onClick={() => inputImgMerchanRef.current?.click()}
                  >
                    <PlusOutlined
                      style={{ fontSize: '30px', color: '#FF8243' }}
                    />
                  </div>
                )}
                {fileImgMerchandiseList?.map((file: File, index: number) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      width={180}
                      height={180}
                      style={{ objectFit: 'contain' }}
                      className="rounded-lg shadow-shadowBtn max-w-[180px] max-h-[180px]"
                    />

                    <button
                      onClick={() => handleDeleteFileBgTour(index)}
                      className="absolute top-0 right-0 bg-[#ffffffbd]  rounded-full p-1 "
                    >
                      <CloseOutlined
                        style={{ color: 'red', fontSize: '15px' }}
                      />
                    </button>
                  </div>
                ))}

                <input
                  style={{ display: 'none' }}
                  type="file"
                  multiple
                  accept="image/*"
                  ref={inputImgMerchanRef}
                  onChange={handleFileImgMerchandiseChange}
                  className="none"
                />
              </div>
            </Form.Item>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col shadow-shadowBtn">
        <div className="w-full flex flex-col shadow-shadowBtn">
          <div className="w-full h-max flex bg-primaryColor rounded-t-md">
            <div className="w-full h-max flex justify-between items-center px-10 py-1">
              <h1 className="font-quicksand  text-base font-bold text-white">
                Invitations{' '}
              </h1>
            </div>
          </div>
          <div className="w-5/6 h-max p-10">
            {/* 
                                    <Form.Item name="sponsors" label="Sponsors" >
                                        <Select {...sharedSponsorProps} {...selectSponsorProps} placeholder="Select sponsors" />
                                    </Form.Item> */}
            <Divider />
            <Form.Item name="isRecruit" label="Umpires" required>
              <Radio.Group
                onChange={(e) => setIsRecruit(e.target.value)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  rowGap: '8px',
                }}
              >
                <Radio value={false}>Already have umpires team </Radio>
                <Radio value={true}> Recruit umpires </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="numberOfUmpires"
              style={isRecruit ? { display: 'block' } : { display: 'none' }}
              label="Number of umpires"
              initialValue={1}
            >
              <InputNumber
                min={1}
                max={50}
                suffix={'Umpires'}
                style={{ width: '100%' }}
                placeholder="Number of umpires"
                changeOnWheel
              />
            </Form.Item>

            {/* <div className='w-full h-max flex flex-col items-center justify-center'> */}
            {/* <div className='w-full '> */}
            {/* <Form.Item label="Umpires' List" name="umpireList">
                                        <Form.List name="umpires" >
                                            {(fields, { add, remove }) => (
                                                <div className='w-full  flex flex-col justify-center items-center '>
                                                    {fields.map(({ key, name, ...restField }) => (
                                                        <Space key={key} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} align="baseline">
                                                            <Form.Item
                
                                                                {...restField}
                                                                name={[name, 'mail']}
                                                                rules={[{ required: true, message: 'Missing mail address' }]}
                                                                style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                                                className='w-full'
                                                            >
                                                                <Input style={{ width: '200px', }} placeholder="Mail of umpire" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <Input style={{ width: '200px' }} placeholder="First Name" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'last']}
                                                                rules={[{ required: true, message: 'Missing last name' }]}
                                                            >
                                                                <Input style={{ width: '200px' }} placeholder="Last Name" />
                                                            </Form.Item>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Space>
                                                    ))}
                                                    <Form.Item style={{}}>
                                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{ width: '400px' }}>
                                                            Add field
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            )}
                                        </Form.List>
                                    </Form.Item> */}
            <Divider />
            {/* <Form.Item label="Organizers' List" name="organizerList">
                                        <Form.List name="organizers" >
                                            {(organizerList, { add, remove }) => (
                                                <div className='w-full  flex flex-col justify-center items-center '>
                                                    {organizerList.map(({ key, name, ...restField }) => (
                                                        <Space key={key} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} align="baseline">
                                                            <Form.Item
                
                                                                {...restField}
                                                                name={[name, 'mail']}
                                                                rules={[{ required: true, message: 'Missing mail address' }]}
                                                                style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                                                className='w-full'
                                                            >
                                                                <Input style={{ width: '200px', }} placeholder="Mail of umpire" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <Input style={{ width: '200px' }} placeholder="First Name" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'last']}
                                                                rules={[{ required: true, message: 'Missing last name' }]}
                                                            >
                                                                <Input style={{ width: '200px' }} placeholder="Last Name" />
                                                            </Form.Item>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Space>
                                                    ))}
                                                    <Form.Item style={{}}>
                                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{ width: '400px' }}>
                                                            Add field
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            )}
                                        </Form.List>
                                    </Form.Item> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateTourStep1;
