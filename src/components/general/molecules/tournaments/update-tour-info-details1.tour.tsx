import React, { useEffect, useRef, useState } from 'react'
import { Button, ColorPicker, ColorPickerProps, Divider, Form, GetProp, Input, InputNumber, InputRef, message, Select, Space, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Image from 'next/image'
import { useDebounce } from '@/hooks/use-debounce'
import { CheckOutlined, CloseCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { createTourSerieAPI, getAllMySeriesAPI } from '@/services/serie'
import { generateUrlAPI, isExistedUrlAPI, uploadBgTourImageAPI } from '@/services/create-tour'
import { getDistrictAPI, getProvinceAPI, getWardAPI } from '@/services/location'
import { getTourInfoDetailsAPI, updateTourInfoDetailsAPI } from '@/services/update-tour'
import { toast } from 'react-toastify'


const UpdateBasicInfoDetailsTour = ({
  accessToken,
  tournamentId,
  fileBgTour,
  setFileBgTour,
  // detail,
  // setDetail,
}: {
  accessToken: string;
  tournamentId: string;
  fileBgTour: File | null;
  setFileBgTour: any;
  // detail: any;
  // setDetail: any;
}
) => {

  type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;
  type Format = GetProp<ColorPickerProps, 'format'>;
  const [form] = Form.useForm();

  const [detail, setDetail] = useState<any>({
    "mainColor": "",
  });

  const [imageURLBgTour, setImageURLBgTour] = useState<string>("");
  const [formatHex, setFormatHex] = useState<Format>('hex');
  const [colorHex, setColorHex] = useState<string>('#ff8243');

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');

  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [location, setLocation] = useState('');

  const [serieList, setSerieList] = useState([]);
  // const [items, setItems] = useState(['jack', 'lucy']);
  const [addSerieName, setAddSerieName] = useState('');
  const inputSerieRef = useRef<InputRef>(null);
  const inputImgMerchanRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {});
      }
    }
  }, []);

  const fetchGetTourInfoDetailsTour = async () => {
    const response = await getTourInfoDetailsAPI(tournamentId);
    setDetail(response);
    
  }
console.log("detail", detail);
  const fetchProvince = async () => {
    try {
      const res = await getProvinceAPI();
      setProvinceList(res)
    } catch (error: any) {
      console.log(error);
    }
  }

  const fetchDistrict = async (provinceId: string) => {
    try {
      const res = await getDistrictAPI(provinceId);
      setDistrictList(res);
    } catch (error: any) {
      console.log(error);

    }
  }

  const fetchWard = async (districtId: string) => {
    try {
      const wards = await getWardAPI(districtId);
      setWardList(wards);
    } catch (error: any) {
      console.log(error);
    }
  }

  // Tournament Serie
  const fetchCreateTourSerie = async (accessToken: string, serieName: any) => {
    try {
      const response = await createTourSerieAPI(
        accessToken,
        {
          tournamentSerieName: serieName,
          serieBackgroundImageURL: "https://t3.ftcdn.net/jpg/03/10/62/12/360_F_310621281_foEqKBGtGlNWFQRePgdF5BpLOFyTsnzO.jpg",
        },
      )
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  const fetchGetAllSeries = async () => {
    try {
      const res = await getAllMySeriesAPI(accessToken);
      if (res.statusCode === 200) setSerieList(res.data);
    } catch (error: any) {
      console.log(error);
    }
  }
  const addCreateSerie = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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
  const onAddSerieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddSerieName(event.target.value);
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

  useEffect(() => {
    fetchGetTourInfoDetailsTour();
    fetchGetAllSeries();
    fetchProvince();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchGetAllSeries();
    fetchProvince();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (provinceId !== "") {
      form.setFieldValue('district', "");
      setDistrict("");
      fetchDistrict(provinceId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId]);

  useEffect(() => {
    if (districtId !== "") {
      form.setFieldValue('ward', "");
      setWard("");
      fetchWard(districtId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId, districtId]);

  useEffect(() => {
    const newLocation = [street, ward, districtName, provinceName].join(', ');
    setLocation(newLocation);
    form.setFieldValue('location', newLocation);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [street, ward, districtName, provinceName]);


  // Main Color
  const handleColorChange = (value: Color) => {
    console.log(value, "mainColorValue");

    const hexValue = typeof value === 'string' ? value : value?.toHexString();
    console.log(hexValue, "mainColor");
    if (hexValue) setColorHex(hexValue);
    form.setFieldValue("mainColor", hexValue)
  };

  const handleFileBgTourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileBgTour(e.target.files[0]);
    }
  };

  const fetchTourInfoDetails = async (updateData: any) => {
    try {
      const response = await updateTourInfoDetailsAPI(updateData, user.access_token);
      return response.data;
    } catch (error) {
      console.log("Fetch tour info", error);
    }
  }

  const fetchUploadTourBgImg = async () => {
    if (!fileBgTour) return null
    const response = await uploadBgTourImageAPI(fileBgTour);
    return response.data;
  }


  const onFinish = async (fieldValues: any) => {
    console.log("fieldValues", fieldValues);
    console.log("fileBgTour", fileBgTour);

    const imageLink = await fetchUploadTourBgImg();
    console.log(imageLink, "imageLink");

    const updateData = {
      'id': fieldValues['id'],
      'name': fieldValues['name'],
      'shortName': fieldValues['shortName'],
      'backgroundTournament': imageLink || '',
      'introduction': fieldValues['introduction'],
      'description': fieldValues['description'],
      'location': fieldValues['location'],
      'mainColor': fieldValues['mainColor'],
      'prizePool': fieldValues['prizePool'],
      'tournamentSerieId': fieldValues['tournamentSerieId'] || null,
    }
    console.log("updateData", updateData);

    const updatedData = await fetchTourInfoDetails(updateData);
    setDetail(updatedData);
  }


  return (
    <div className='w-full h-max flex flex-col items-center justify-center'>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '50px',
          minWidth: '100%',
          width: '100%',
          fontFamily: 'inherit',
          alignItems: 'center',
          // justifyContent: 'center'
        }}
      >
        <div className='w-full h-max pt-10 px-3'>
          <Form.Item
            label="Tournament Name"
            name="name"
            initialValue={detail?.name}
            required
          >
            <Input placeholder="Your tournament's name" />
          </Form.Item>
          <Form.Item
            label="Short name"
            name="shortName"
            initialValue={detail?.shortName}
            required>
            <Input placeholder="Short name" required />
          </Form.Item>
          <Form.Item
            label="Tournament URL"
            name="url"
            required
          >
            <Space.Compact block>
              <Form.Item
                noStyle
                name="id"
                initialValue={detail?.id}
                required
                rules={
                  [
                    { required: true, message: "URL is required!" },
                    { pattern: /^[a-zA-Z0-9-]{8,}$/, message: "Must be at least 8 characters and no special characters" },

                  ]
                }
              >
                <Input
                  addonBefore="https://smashit.com.vn/"
                  placeholder="Your tournament's URL"
                  disabled
                  readOnly
                // suffix={
                //   isLoadingCheckUrl ? (
                //     <Spin indicator={<LoadingOutlined />} />
                //   ) : isValidUrl !== null ? (
                //     isValidUrl ? (
                //       <CheckOutlined style={{ color: "green" }} />
                //     ) : (
                //       <CloseCircleOutlined style={{ color: "red" }} />
                //     )
                //   ) : null
                // }
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            name="backgroundTournament"
            label="Tournament's Image"
            initialValue={detail?.backgroundTournament}
            required
          >
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleFileBgTourChange}
              className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fff8f3] file:text-[#FF8243] hover:file:bg-[#fae3d0]"
            />
            <div>
              {fileBgTour && (
                <Image
                  src={detail?.backgroundTournament || URL.createObjectURL(fileBgTour)}
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
            initialValue={detail? (detail.mainColor.includes("#")? detail?.mainColor : "#FF8243") : "#FF8243"}
          >
            <ColorPicker
              format={formatHex}
              value={colorHex}
              onChange={handleColorChange}
              // onFormatChange={setFormatHex}
              showText={true}
            />
          </Form.Item>
          <Form.Item
            name={"prizePool"}
            label="Prize pool"
            initialValue={detail?.prizePool}
            required
          >
            <InputNumber<number>
              min={0}
              suffix={'VND'}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
              style={{ marginTop: '8px', width: '100%' }}
              placeholder="Prize pool"
              changeOnWheel
              width={'100%'}
            />
          </Form.Item>
          <Form.Item
            style={{ rowGap: '10px' }}
            label="Location"
            required
          >
            <Space.Compact block>
              <Form.Item
                name={'province'}
                noStyle
                // initialValue={}
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select onChange={handleProvinceChange} value={provinceName} placeholder="Select province">
                  {
                    provinceList?.map((province: any) => {
                      return (
                        <Select.Option key={province.ProvinceID} value={`${province.ProvinceID}|${province.ProvinceName}`}> {province.ProvinceName}</Select.Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name={'district'}
                noStyle
                rules={[{ required: true, message: 'District is required' }]}
              >
                <Select onChange={handleDistrictChange} value={districtName} placeholder="Select district">
                  {
                    districtList?.map((district: any) => {
                      return (
                        <Select.Option key={district.DistrictID} value={`${district.DistrictID}|${district.DistrictName}`}> {district.DistrictName}</Select.Option>
                      )
                    })
                  }

                </Select>

              </Form.Item>
              <Form.Item
                name={'ward'}
                noStyle
                rules={[{ required: true, message: 'Ward is required' }]}
              >
                <Select onChange={(e) => setWard(e)} value={ward} placeholder="Select ward" >
                  {
                    wardList?.map((ward: any) => {
                      return (
                        <Select.Option key={ward.WardID} value={ward.WardName}>{ward.WardName}</Select.Option>
                      )
                    })

                  }
                </Select>
              </Form.Item>
            </Space.Compact>
            <br />
            <Form.Item
              name={'street'}
              noStyle
              rules={[{ required: true, message: 'Street is required' }]}
              initialValue={street}
            >
              <Input onChange={(e) => setStreet(e.target.value)} style={{ width: '50%' }} placeholder="Input address number and street" />
            </Form.Item>

            <br />

            <Form.Item
              name="location"
              noStyle
              style={{ marginTop: '12px' }}
              // initialValue={detail?.location}
              required
            >
              <Input defaultValue={location} variant='borderless' readOnly />
            </Form.Item>

          </Form.Item>
          <Form.Item
            name="introduction"
            label="Introduction"
            initialValue={detail?.introduction}
          >
            <TextArea
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Tournament's introduction"
              autoSize={{ minRows: 3, maxRows: 5 }}
              required
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            initialValue={detail?.description}
          >
            <TextArea
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
              placeholder="Tournament description"
              autoSize={{ minRows: 3, maxRows: 5 }}
              required
            />
          </Form.Item>
          <Form.Item
            name="tournamentSerieId"
            label="Tournament Serie"
            initialValue={detail?.tournamentSerieId}>
            <Select
              // style={{ width: 300 }}
              placeholder="Choose Tournament Serie"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ width: '100%', margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                    <div className='w-full flex flex-row justify-between gap-5'>
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

                    <Button type="primary" icon={<PlusOutlined />} onClick={addCreateSerie}>
                      Add Serie
                    </Button>
                  </Space>
                </>
              )}
              options={serieList.map((serie: any) => ({ label: serie.tournamentSerieName, value: serie.id }))}
            />
            {/* <Button style={{ marginTop: '10px' }} >New Event</Button> */}
          </Form.Item>

        </div>

        <Button style={{ padding: '22px 30px', fontSize: '18px', fontWeight: 'bold' }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form>

    </div>
  )
}

export default UpdateBasicInfoDetailsTour