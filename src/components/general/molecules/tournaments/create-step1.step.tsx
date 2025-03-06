"use client"
import React, { useState } from 'react'
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
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    SelectProps,
    Slider,
    Space,
    Switch,
    Tag,
    TreeSelect,
    Upload,
} from 'antd';
import Image from 'next/image';
import { Info } from 'lucide-react';
import dayjs from "dayjs";


interface SelectItemProps {
    label: string;
    value: string;
}

const CreateTourStep1 = () => {
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;


    type RequiredMark = boolean | 'optional' | 'customize';
    const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
        <>
            {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
            {label}
        </>
    );
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');







    const [fileBgTour, setFileBgTour] = useState<File | null>(null);
    const [imageURLBgTour, setImageURLBgTour] = useState<string>("");

    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [street, setStreet] = useState('');
    const location = [street, ward, district, province].join(', ')

    const [sponsorList, setSponsorList] = useState(['Nestlé', 'Pepsi', 'Nike', 'Adidas', 'Sacombank']);


    const [organizerList, setOrganizerList] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);

    const [isRecruit, setIsRecruit] = useState(false);


    const [winPoints, setWinPoints] = useState<Number>();
    const [lastPoints, setLastPoints] = useState<Number>();
    // const [rules, setRules] = useState('');
    const [categories, setCategories] = useState({
        items: [
            {

            }
        ]
    });

    //Registration & Fee
    const [isRegister, setIsRegister] = useState(false);
    const [registerDate, setRegisterDate] = useState(null);
    const [occurDate, setOccurDate] = useState(null);


    const [isMerchandise, setIsMerchandise] = useState(false);

    const [fileImgMerchandise, setFileImgMerchandise] = useState<File | null>(null);

    const handleFileBgTourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileBgTour(e.target.files[0]);
        }
    };

    const disabledOccurDate = (current: any) => {
        return current && (current.isBefore(dayjs(), "day") || (registerDate && current.isBefore(registerDate, "day")));
    };
    const disabledRegisterDate = (current: any) => {
        return current && current.isBefore(dayjs(), "day");
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
        placeholder: 'Select Organizers...',
        maxTagCount: 'responsive',
    };
    const selectOrganizerProps: SelectProps = {
        value: organizerList,
        onChange: setOrganizerList,
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
    // api truyen file => URL 3 anh sau khi up len cloud




    const handleFileImgMerchandiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileImgMerchandise(e.target.files[0]);
        }
    };


    return (
        <div className='w-full h-max flex flex-col items-center justify-center rounded gap-10'>
            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Tournament Information</h1>
                    </div>
                </div>
                <div className='w-full h-max p-10'>
                    <Form.Item label="Tournament Name" name="name" required>
                        <Input placeholder="Your tournament's name" required />
                    </Form.Item>

                    <Form.Item label="Tournament URL" name="url" required>
                        <Input addonBefore="https://smashit.com.vn/" placeholder="Your tournament's URL" defaultValue="mysite" required />
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
                    <Form.Item style={{ rowGap: '10px' }} label="Location" required>
                        <Space.Compact block>
                            <Form.Item
                                name={'province'}

                                noStyle
                                rules={[{ required: true, message: 'Province is required' }]}
                            >
                                <Select onChange={(e) => setProvince(e)} placeholder="Select province">
                                    <Select.Option value="Ho Chi Minh">HCM</Select.Option>
                                    <Select.Option value="Ha Noi">HN</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={'district'}
                                noStyle
                                rules={[{ required: true, message: 'District is required' }]}
                            >
                                <Select onChange={(e) => setDistrict(e)} placeholder="Select district">
                                    <Select.Option value="summer">Happy Summer Camp</Select.Option>
                                    <Select.Option value="winter">IceBreaker Battle</Select.Option>
                                </Select>

                            </Form.Item>
                            <Form.Item
                                name={'ward'}
                                noStyle
                                rules={[{ required: true, message: 'Ward is required' }]}
                            >
                                <Select onChange={(e) => setWard(e)} placeholder="Select ward" >
                                    <Select.Option value="summer">Happy Summer Camp</Select.Option>
                                    <Select.Option value="winter">IceBreaker Battle</Select.Option>
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
                        <Input name='location' value={location} disabled />
                    </Form.Item>


                    <Form.Item name="description" label="Description">
                        <TextArea
                            // value={value}
                            // onChange={(e) => setValue(e.target.value)}
                            placeholder="Tournament description..."
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            required
                        />
                    </Form.Item>
                    <Form.Item name="series" label="Series">
                        <Select placeholder="Select event">
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

                        <Form.Item name="format" label="Format" required initialValue={"single"}>
                            <Select placeholder="Format of Tournament">
                                <Select.Option value="single">Single Elimination</Select.Option>
                                <Select.Option value="robin">Round Robin</Select.Option>
                            </Select>

                        </Form.Item>
                        <Form.Item name="maxAthletes" label="Maximum athletes" >
                            <InputNumber min={0} max={1000} suffix={'Athletes'} style={{ width: '100%' }} placeholder="Maximum athletes" changeOnWheel />
                        </Form.Item>

                        <Form.Item name="numberOfSets" label="Number of sets" required>
                            <Select placeholder="Number of set(s) ">
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="3">3</Select.Option>
                                <Select.Option value="5">5</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="winPoints" label="Winning points">
                            <InputNumber min={15} max={51} suffix={'Points'} style={{ width: '100%' }} placeholder="Winning points" changeOnWheel />
                        </Form.Item>
                        <Form.Item name="lastPoints" label="Last points" required>
                            <InputNumber min={15} max={51} suffix={'Points'} style={{ width: '100%' }} placeholder="Last points" changeOnWheel />
                        </Form.Item>
                        <Form.Item name="rules" label="Rules" >
                            <TextArea
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                        <Form.Item label="Categories" required>

                            <Divider />
                            <Checkbox indeterminate={indeterminate} onChange={(e) => setCateList(e.target.checked ? plainCateOptions : [])} checked={checkAllCateList}>
                                Check all
                            </Checkbox>
                            <Divider />
                            <CheckboxGroup options={plainCateOptions} value={cateList} onChange={onChange} />

                        </Form.Item>
                    </div>
                    <div className='w-full h-max flex justify-center items-center'>
                        
                        <Form.List name="categories" >
                            {(fields, { add, remove }) => (
                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16, width: '50%' }}>
                                    {cateList.map((category, index) => {
                                        // Kiểm tra nếu category đã có trong danh sách fields hay chưa
                                        const field = fields.find(f => f.name === index);
                                        if (!field) add();

                                        return (
                                            <Card
                                                size="small"
                                                title={category}
                                                key={category}
                                                extra={
                                                    <CloseOutlined onClick={() => {
                                                        remove(index);
                                                        setCateList(cateList.filter(item => item !== category));
                                                    }} />
                                                }
                                            >
                                                {/* <Form.Item label="Category Name" name={[index, 'name']} initialValue={category}>
                                                                <Input value={category} disabled/>
                                                            </Form.Item> */}

                                                {/* Sub List - Range Number */}
                                                <Form.Item label="Age">
                                                    <Form.List name={[index, 'rangeList']}>
                                                        {(subFields, subOpt) => (
                                                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                                {subFields.map((subField) => (
                                                                    <Space key={subField.key}>
                                                                        <Form.Item noStyle name={[subField.name, 'min']}>
                                                                            <InputNumber placeholder="Min" />
                                                                        </Form.Item>
                                                                        <Form.Item noStyle name={[subField.name, 'max']}>
                                                                            <InputNumber placeholder="Max" />
                                                                        </Form.Item>
                                                                        <CloseOutlined
                                                                            onClick={() => {
                                                                                subOpt.remove(subField.name);
                                                                            }}
                                                                        />
                                                                    </Space>
                                                                ))}
                                                                <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                    + Add Range Age
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </Form.List>
                                                </Form.Item>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </Form.List>
                    </div>
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
                    <Divider />

                    <Form.Item name={"registrationDate"} label="Registration Date" required>
                        <RangePicker
                            style={{ width: '100%' }}
                            placeholder={["Select Start Date", "Select End Date"]}
                            disabledDate={disabledRegisterDate}
                            onChange={(date: any) => setRegisterDate(date)}

                        />
                    </Form.Item>
                    <Form.Item name={"attachments"} label="Required attachments" required>
                        <Select {...sharedOrganizerProps} {...selectOrganizerProps} />
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
                    <Form.Item name={"occurDate"} label="Occur Date" style={{ display: 'block',}} required>
                        <RangePicker
                            placeholder={["Select Start Date", "Select End Date"]}
                            disabledDate={disabledOccurDate}
                            onChange={(date: any) => setOccurDate(date)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item name={"checkIn"} label="Check-in before start time" required>
                        {/* opens */}
                        <Select style={{ width: '100px' }}>
                            <Select.Option value="onTime">On time</Select.Option>
                            <Select.Option value="15min">15 min</Select.Option>
                            <Select.Option value="30min">30 min</Select.Option>
                            <Select.Option value="45min">45 min</Select.Option>
                            <Select.Option value="1hour">1 hour</Select.Option>
                            <Select.Option value="2hours">2 hours</Select.Option>
                            <Select.Option value="3hours">3 hours</Select.Option>
                        </Select>
                        {/* before start time */}
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Umpires & linesman in a match" required>
                        <InputNumber min={1} max={3} suffix={'Umpire(s)'} style={{ width: '100%' }} placeholder="Number of umpires" changeOnWheel />

                    </Form.Item>
                    <Form.Item label="Umpires & linesman in a match" required>
                        <InputNumber min={1} max={5} suffix={'Linesmans'} style={{ width: '100%', marginTop: '8px' }} placeholder="Number of umpires" changeOnWheel />
                    </Form.Item>
                </div>
            </div>
            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand text-base font-bold text-white'>Rewards & Merchandise</h1>
                    </div>
                </div>
                <div className='w-full h-max p-10'>
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
                    <Form.Item name={"champion"} label="Champion Rewards" required>
                        <Input style={{ width: '100%' }} />

                    </Form.Item>
                    <Form.Item name={"runnerUp"} label="Runner-up" required>
                        <Input style={{ width: '100%' }} />

                    </Form.Item>
                    <Form.Item name={"thirdPlace"} label="Third Place" required>
                        <Input style={{ width: '100%' }} />

                    </Form.Item>
                    <Divider />
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

export default CreateTourStep1