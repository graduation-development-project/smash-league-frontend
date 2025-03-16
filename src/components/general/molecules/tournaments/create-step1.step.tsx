"use client"
import React, { useEffect, useState } from 'react'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Cascader,
    Checkbox,
    CheckboxProps,
    ColorPicker,
    ConfigProvider,
    DatePicker,
    Divider,
    Form,
    GetProps,
    Input,
    InputNumber,
    Radio,
    Select,
    SelectProps,
    Space,
    TimePicker,
    Typography,
} from 'antd';
import Image from 'next/image';
import { Info } from 'lucide-react';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getDistrictAPI, getProvinceAPI, getWardAPI } from '@/services/location';


interface SelectItemProps {
    label: string;
    value: string;
}
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);
const formatTimeCheckIn = 'mm:ss';

const CreateTourStep1 = () => {
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;


    const [fileBgTour, setFileBgTour] = useState<File | null>(null);
    const [imageURLBgTour, setImageURLBgTour] = useState<string>("");

    const [provinceId, setProvinceId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [province, setProvince] = useState('_');
    const [district, setDistrict] = useState('_');
    const [ward, setWard] = useState('_');
    const [street, setStreet] = useState('_');
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [location, setLocation] = useState('');

    const [sponsorList, setSponsorList] = useState(['Nestlé', 'Pepsi', 'Nike', 'Adidas', 'Sacombank']);


    const [organizerList, setOrganizerList] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);
    const [attachmentList, setAttachmentList] = useState([]);

    const [isRecruit, setIsRecruit] = useState(false);


    const [winPoints, setWinPoints] = useState<Number>();
    const [lastPoints, setLastPoints] = useState<Number>();
    const [categories, setCategories] = useState({
        items: [
            {

            }
        ]
    });

    //Registration & Fee
    const [isRegister, setIsRegister] = useState(false);
    const [registerDate, setRegisterDate] = useState<Array<dayjs.Dayjs>>([]);
    const [drawDate, setDrawDate] = useState<Array<dayjs.Dayjs>>([]);
    const [occurDate, setOccurDate] = useState<Array<dayjs.Dayjs>>([]);


    const [isMerchandise, setIsMerchandise] = useState(false);

    const [fileImgMerchandise, setFileImgMerchandise] = useState<File | null>(null);





    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const res = await getProvinceAPI();
                setProvinceList(res)
            } catch (error: any) {
                console.log(error);
            }
        }
        fetchProvince();
    }, []);
    useEffect(() => {
        if (provinceId !== "") {
            const fetchDistrict = async (provinceId: string) => {
                try {
                    const res = await getDistrictAPI(provinceId);
                    setDistrictList(res);
                } catch (error: any) {
                    console.log(error);

                }
            }
            fetchDistrict(provinceId);
        }
    }, [provinceId]);

    useEffect(() => {
        if (districtId !== "") {
            const fetchWard = async (districtId: string) => {
                try {
                    const wards = await getWardAPI(districtId);
                    setWardList(wards);
                } catch (error: any) {
                    console.log(error);
                }
            }
            fetchWard(districtId);
        }
    }, [districtId]);

    const handleProvinceChange = (value: string) => {
        const [selectedProvinceId, selectedProvinceName] = value.split('|');
        setProvinceId(selectedProvinceId);
        setProvince(selectedProvinceName);
    };
    const handleDistrictChange = (value: string) => {
        const [selectedDistrictId, selectedDistrictName] = value.split('|');
        setDistrictId(selectedDistrictId);
        setDistrict(selectedDistrictName);
    };



    const handleFileBgTourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileBgTour(e.target.files[0]);
        }
    };



    //---------- Date Time Register & Occur ---------
    const disabledRegisterDate = (current: dayjs.Dayjs) => {
        return current && current.isBefore(dayjs().add(1, "day").startOf("day"), "day");
    };

    const disabledDrawDate = (current: dayjs.Dayjs) => {
        return (
            current &&
            (current.isBefore(dayjs().add(1, "day").startOf("day"), "day") ||
                (registerDate.length > 0 && current.isBefore(registerDate[1].add(1, "day").startOf("day"), "day")))
        );
    };
    const disabledOccurDate = (current: dayjs.Dayjs) => {
        return (
            current &&
            (current.isBefore(dayjs().add(1, "day").startOf("day"), "day") ||
                (drawDate.length > 0 && current.isBefore(drawDate[1].add(1, "day").startOf("day"), "day")))
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

    const sharedOrganizerProps: SelectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        options: selectOrganizers,
        placeholder: 'Select Organizers',
        maxTagCount: 'responsive',
    };
    const selectOrganizerProps: SelectProps = {
        value: organizerList,
        onChange: setOrganizerList,
    };
    const selectAttachments: SelectItemProps[] = [];
    //get organizer list from DB
    selectAttachments.push({ label: "Portrait Photo" , value: "PORTRAIT_PHOTO"}, { label: "Identity Card", value: "IDENTIFICATION_CARD"});

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
    const CheckboxGroup = Checkbox.Group;
    const plainCateOptions = ['Men\'s Singles', 'Women\'s Singles', 'Men\'s Doubles', 'Women\'s Doubles', 'Mixed Doubles'];
    const defaultCateList = ['Men\'s Singles', 'Women\'s Singles',];
    const [cateList, setCateList] = useState<string[]>(defaultCateList);

    const checkAllCateList = plainCateOptions.length === cateList.length;
    const indeterminate = cateList.length > 0 && cateList.length < plainCateOptions.length;
    const onChange = (list: string[]) => {
        setCateList(list);
    };
    const onCheckAllCateChange: CheckboxProps['onChange'] = (e) => {
        setCateList(e.target.checked ? plainCateOptions : []);
    };




    //Sponsors


    //------ Rewards & Merchandise ----------

    const [imageURLImgMerchandise, setImageURLImgMerchandise] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {

        const newLocation = [street, ward, district, province].join(', ');
        setLocation(newLocation);
    }, [street, ward, district, province]);



    const handleFileImgMerchandiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileImgMerchandise(e.target.files[0]);
        }
    }


    return (

        <div className='w-full h-max flex flex-col items-center justify-center rounded gap-10'>
            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Tournament Information</h1>
                    </div>
                </div>
                <div className='w-full h-max p-10'>
                    <Form.Item label="Tournament Name" name="name"
                        required>
                        <Input placeholder="Your tournament's name" required />
                    </Form.Item>
                    <Form.Item label="Tournament Name" name="shortName"
                        required>
                        <Input placeholder="Short name" required />
                    </Form.Item>

                    <Form.Item label="Tournament URL" name="id" required>
                        <Input addonBefore="https://smashit.com.vn/" placeholder="Your tournament's URL" required />
                    </Form.Item>
                    <Form.Item name="tourImage" label="Tournament's Image" required>
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

                    <Form.Item name="mainColor" label="Your Tour Color" initialValue={'#ff8243 '}>
                        <ColorPicker showText={true} />
                    </Form.Item>
                    <Form.Item name={"prizePool"} label="Prize pool" required>
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
                    <Form.Item style={{ rowGap: '10px' }} label="Location" required>
                        <Space.Compact block>
                            <Form.Item
                                name={'province'}

                                noStyle
                                rules={[{ required: true, message: 'Province is required' }]}
                            >
                                <Select onChange={handleProvinceChange} placeholder="Select province">
                                    {
                                        provinceList?.map((province: any, index) => {
                                            return (

                                                <Select.Option key={index} value={`${province.ProvinceID}|${province.ProvinceName}`}> {province.ProvinceName}</Select.Option>
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
                                <Select onChange={handleDistrictChange} placeholder="Select district">
                                    {
                                        districtList?.map((district: any, index) => {
                                            return (
                                                <Select.Option key={index} value={`${district.DistrictID}|${district.DistrictName}`}> {district.DistrictName}</Select.Option>
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
                                <Select onChange={(e) => setWard(e)} placeholder="Select ward" >
                                    {
                                        wardList?.map((ward: any, index) => {
                                            return (
                                                <Select.Option key={index} value={ward.WardName}>{ward.WardName}</Select.Option>
                                            )
                                        })

                                    }
                                </Select>
                            </Form.Item>


                        </Space.Compact>
                        <br />
                        <Space.Compact block>
                            <Form.Item

                                name={'street'}
                                noStyle
                                rules={[{ required: true, message: 'Street is required' }]}
                            >
                                <Input onChange={(e) => setStreet(e.target.value)} style={{ width: '50%' }} placeholder="Input address number and street" />
                            </Form.Item>
                        </Space.Compact>

                        <br />

                        {/* <Form.Item name="location" initialValue={location} label="Location">
                            <Input defaultValue={location} variant='outlined' disabled />
                        </Form.Item> */}
                        <Typography >
                            <pre >{location}</pre>
                        </Typography>



                    </Form.Item>




                    <Form.Item name="description" label="Description">
                        <TextArea
                            // value={value}
                            // onChange={(e) => setValue(e.target.value)}
                            placeholder="Tournament description"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            required
                        />
                    </Form.Item>
                    <Form.Item name="series" label="Series">
                        <Select placeholder="Select serie">
                            <Select.Option value="summer">Happy Summer Camp</Select.Option>
                            <Select.Option value="winter">IceBreaker Battle</Select.Option>
                        </Select>
                        {/* <Button style={{ marginTop: '10px' }} >New Event</Button> */}
                    </Form.Item>

                </div>
            </div>

            {/* <div className='w-1/2  h-1 bg-primaryColor' /> */}


            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Organizers & Umpires</h1>
                    </div>
                </div>
                <div className='w-full h-max p-10'>
                    <Form.Item name="host" label="Host" initialValue={"Ho Chi Minh Federation"} required>
                        <Input value={"Ho Chi Minh Federation"} disabled />
                    </Form.Item>
                    <Form.Item name="organizers" label="Co-Organizers">
                        <Select {...sharedOrganizerProps} {...selectOrganizerProps} />
                    </Form.Item>
                    <Form.Item name="contactMail" label="Contact Email" required>
                        <Input placeholder='Your email here' />
                    </Form.Item>
                    <Form.Item
                        label=" Contact Phone Number"
                        name="contactPhone"
                        required
                        rules={[
                            { required: true },
                            {
                                pattern: new RegExp("^[0-9\-\+]{9,15}$"),
                                message: "Please enter a valid phone number"
                            }
                        ]}
                    >
                        <Input placeholder='Phone Number' />
                    </Form.Item>

                </div>
            </div>


            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Game Rules</h1>
                    </div>
                </div>
                <div className='w-full h-max flex flex-col p-10 justify-center items-center'>
                    <div className='w-full h-max flex flex-col'>
                        <Form.Item name="maxEventPerPerson" label="Maximum events per athlete can register">
                            <Select placeholder="Maximum events per athlete can join">
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                                <Select.Option value="3">3</Select.Option>
                                <Select.Option value="4">4</Select.Option>
                                <Select.Option value="5">5</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Events" required>

                            <Divider />
                            <Checkbox indeterminate={indeterminate} onChange={(e) => setCateList(e.target.checked ? plainCateOptions : [])} checked={checkAllCateList}>
                                Check all
                            </Checkbox>
                            <Divider />
                            <CheckboxGroup options={plainCateOptions} value={cateList} onChange={onChange} />

                        </Form.Item>
                    </div>
                    {/* <div className='w-full h-max flex justify-center items-center'> */}

                    {/* <Form.Item noStyle name={['categories', 'min']}> */}
                    <Form.List name="eventsCustom">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16, width: '90%' }}>
                                {cateList.map((category, index) => {
                                    const field = fields.find(f => f.name === index);
                                    if (!field) add(); // Ensure correct indexing

                                    return (
                                        <Card
                                            size="small"
                                            title={category}
                                            key={category}
                                            style={{ borderWidth: 2, width: '100%', display: 'flex', flexDirection: 'column', rowGap: 16, alignSelf: 'center' }}
                                            extra={
                                                <CloseOutlined onClick={() => {
                                                    remove(index);
                                                    setCateList(cateList.filter(item => item !== category));
                                                }} />
                                            }
                                        >
                                            <Form.List name={[index, 'rangeList']} >
                                                {(subFields, subOpt) => (
                                                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16, width: '100%' }}>
                                                        {subFields.map((subField) => (
                                                            <Card
                                                                size="small"
                                                                style={{ borderWidth: 2, width: '90%', display: 'flex', flexDirection: 'column', rowGap: 16, alignSelf: 'center' }}
                                                                key={subField.key}
                                                                title={
                                                                    <Space key={subField.key}>
                                                                        From <Form.Item noStyle name={[subField.name, 'min']}>
                                                                            <InputNumber placeholder="Min" />
                                                                        </Form.Item>
                                                                        to
                                                                        <Form.Item noStyle name={[subField.name, 'max']}>
                                                                            <InputNumber placeholder="Max" />
                                                                        </Form.Item>
                                                                    </Space>
                                                                }
                                                                extra={
                                                                    <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
                                                                }
                                                            >
                                                                {/* FIX: Properly nest fields inside Form.List */}
                                                                <Form.Item name={[subField.name, "maxAthletes"]} label="Maximum athletes">
                                                                    <InputNumber min={0} max={1000} style={{ width: '100%' }} placeholder="Maximum athletes" />
                                                                </Form.Item>

                                                                <Form.Item name={[subField.name, "numberOfGames"]} label="Number of games">
                                                                    <Select placeholder="Number of game(s)">
                                                                        <Select.Option value="1">1</Select.Option>
                                                                        <Select.Option value="3">3</Select.Option>
                                                                        <Select.Option value="5">5</Select.Option>
                                                                    </Select>
                                                                </Form.Item>

                                                                <Form.Item name={[subField.name, "winPoints"]} label="Winning points">
                                                                    <InputNumber min={15} max={51} style={{ width: '100%' }} placeholder="Winning points" />
                                                                </Form.Item>

                                                                <Form.Item name={[subField.name, "lastPoints"]} label="Last points">
                                                                    <InputNumber min={15} max={51} style={{ width: '100%' }} placeholder="Last points" />
                                                                </Form.Item>

                                                                <Form.Item name={[subField.name, "rules"]} label="Rules">
                                                                    <TextArea placeholder="Enter rules" autoSize={{ minRows: 3, maxRows: 5 }} />
                                                                </Form.Item>

                                                                <Divider />
                                                                <Form.Item name={[subField.name, "champion"]} label="Champion Rewards">
                                                                    <Input style={{ width: '100%' }} />
                                                                </Form.Item>

                                                                <Form.Item name={[subField.name, "runnerUp"]} label="Runner-up">
                                                                    <Input style={{ width: '100%' }} />
                                                                </Form.Item>

                                                                <Form.Item name={[subField.name, "rdPlace"]} label="Third Place">
                                                                    <Input style={{ width: '100%' }} />
                                                                </Form.Item>

                                                                <Form.Item name={[subField.name, "jointRdPlace"]} label="Third Place (Tie)">
                                                                    <Input style={{ width: '100%' }} />
                                                                </Form.Item>

                                                            </Card>
                                                        ))}
                                                        <Button type="dashed" onClick={() => subOpt.add()} block>
                                                            + Add Range Age
                                                        </Button>
                                                    </div>
                                                )}
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
            </div>
            <div className='w-full h-max flex flex-col shadow-shadowBtn ' >
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Registration & Fee</h1>
                    </div>
                </div>
                <div className='w-full h-max p-10'>
                    <Form.Item name="isRegister"
                        label="Registration"
                        style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}
                        required
                    >
                        <Radio.Group onChange={(e) => { setIsRegister(e.target.value) }} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', rowGap: '8px' }}>
                            <Radio value={false}> Provide a list of participants </Radio>
                            <Radio value={true}> Host a sign-up tournament — This will allow ahtletes to sign up  </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"registrationFeePair"} label={"Registration Fee Per Pair"} style={isRegister ? { display: 'block' } : { display: 'none' }} initialValue={1000}>
                        <InputNumber<number>
                            min={0}
                            suffix={'VND'}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            style={{ marginTop: '8px', width: '100%' }}
                            placeholder="Fee"
                            changeOnWheel
                            width={'100%'}
                        />
                        {/* <span className='text-[12px] text-textColor2 flex items-center gap-1 mt-2 ml-3'><Info size={15} /> Refund policy <a href="">here</a></span> */}
                    </Form.Item>
                    <Form.Item name={"registrationFee"} label={"Registration Fee"} style={isRegister ? { display: 'block' } : { display: 'none' }} initialValue={1000}>
                        <InputNumber<number>
                            min={0}
                            suffix={'VND'}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            style={{ marginTop: '8px', width: '100%' }}
                            placeholder="Fee"
                            changeOnWheel
                            width={'100%'}
                        />
                        {/* <span className='text-[12px] text-textColor2 flex items-center gap-1 mt-2 ml-3'><Info size={15} /> Refund policy <a href="">here</a></span> */}
                    </Form.Item>
                    <Form.Item name={"protestFeePerTime"} label={"Potest Fee Per Time"} initialValue={1000}>
                        <InputNumber<number>
                            min={0}
                            suffix={'VND'}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            style={{ marginTop: '8px', width: '100%' }}
                            placeholder="Fee"
                            changeOnWheel
                            width={'100%'}
                        />
                        {/* <span className='text-[12px] text-textColor2 flex items-center gap-1 mt-2 ml-3'><Info size={15} /> Refund policy <a href="">here</a></span> */}
                    </Form.Item>
                    <Divider />

                    <Form.Item name={"registrationDate"} style={{ display: 'block' }} label="Registration Date" required>
                        <RangePicker
                            placeholder={["Select Start Date", "Select End Date"]}
                            disabledDate={disabledRegisterDate}
                            showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
                            }}
                            onChange={(date: any) => {
                                setRegisterDate(date);
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item name={"attachments"} label="Required attachments" required>
                        <Select {...sharedAttachmentProps} {...selectAttachmentProps} />
                    </Form.Item>


                </div>
            </div>
            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Schedule & Matches</h1>
                    </div>
                </div>
                <div className='w-full h-max p-10'>
                    <Form.Item name={"drawDate"} label="Draw Date" style={{ display: 'block', }} required>
                        <RangePicker
                            placeholder={["Select Start Date", "Select End Date"]}
                            disabledDate={disabledDrawDate}
                            showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
                            }}
                            onChange={(date: any) => {
                                setDrawDate(date);
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item name={"occurDate"} label="Occur Date" style={{ display: 'block', }} required>
                        <RangePicker
                            placeholder={["Select Start Date", "Select End Date"]}
                            disabledDate={disabledOccurDate}
                            showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
                            }}
                            onChange={(date: any) => {
                                setOccurDate(date);
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item name={"checkIn"} label="Check-in before start time" required>
                        <TimePicker defaultValue={dayjs('15:00', formatTimeCheckIn)} format={formatTimeCheckIn} />
                    </Form.Item>
                    <Divider />
                    <Form.Item name="umpirePerMatch" label="Umpires & linesman in a match" required>
                        <InputNumber min={1} max={3} suffix={'Umpire(s)'} style={{ width: '100%' }} placeholder="Number of umpires" changeOnWheel />

                    </Form.Item>
                    <Form.Item name="linemanPerMatch" label="Umpires & linesman in a match" required>
                        <InputNumber min={1} max={5} suffix={'Linesmans'} style={{ width: '100%', marginTop: '8px' }} placeholder="Number of umpires" changeOnWheel />
                    </Form.Item>
                </div>
            </div>
            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand text-base font-bold text-white'>Merchandise</h1>
                    </div>
                </div>
                <div className='w-full h-max p-10'>
                    <Form.Item name="isMerchandise" label="Merchandise for audiences">
                        <Radio.Group
                            onChange={(e) => setIsMerchandise(e.target.value)}
                            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', rowGap: '8px' }}
                        >
                            <Radio value={false}>No merchandise </Radio>
                            <Radio value={true}>Give merchandise for audiences </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div style={{ display: isMerchandise ? 'block' : 'none' }}>
                        <Form.Item name={"merchandise"} label="Merchandise description">
                            <Input style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name={"numberOfMerchandise"} label="Number of merchandise">
                            <InputNumber min={1} max={1000} style={{ width: '100%' }} placeholder="Number of merchandise" changeOnWheel />
                        </Form.Item>
                        <Form.Item name="merchandiseImage" label="Merchandise Image">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileImgMerchandiseChange}
                                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <div>
                                {fileImgMerchandise && (
                                    <Image
                                        src={URL.createObjectURL(fileImgMerchandise)}
                                        alt="Uploaded"
                                        width={200}
                                        height={200}
                                        className="max-w-full h-auto rounded-lg shadow"
                                    />
                                )}
                            </div>
                        </Form.Item>
                    </div>


                </div>
            </div>


        </div>


    )
}

export default CreateTourStep1;