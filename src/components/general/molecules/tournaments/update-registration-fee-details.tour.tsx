import { Button, DatePicker, Divider, Form, InputNumber, Radio, Select, SelectProps } from 'antd'
import dayjs from 'dayjs';
import React, { useState } from 'react'


interface SelectItemProps {
    label: string;
    value: string;
}
const UpdateRegistrationFeeDetailsTour = () => {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();

    const [isRegister, setIsRegister] = useState(false);
    const [registerDate, setRegisterDate] = useState<Array<dayjs.Dayjs>>([]);
    const [attachmentList, setAttachmentList] = useState([]);

    const disabledRegisterDate = (current: dayjs.Dayjs) => {
        return current && current.isBefore(dayjs().add(1, "day").startOf("day"), "day");
    };

    const selectAttachments: SelectItemProps[] = [];
    //get organizer list from DB
    selectAttachments.push({ label: "Portrait Photo", value: "PORTRAIT_PHOTO" }, { label: "Identity Card", value: "IDENTIFICATION_CARD" });

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

    return (
        <div className='w-full h-max flex flex-col items-center justify-center'>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                form={form}

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
                    <Form.Item name="isRegister"
                        label="Registration"
                        style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}
                        initialValue={false}
                        required
                    >
                        <Radio.Group onChange={(e) => { setIsRegister(e.target.value) }} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', rowGap: '8px' }}>
                            <Radio value={false}> Provide a list of participants </Radio>
                            <Radio value={true}> Host a sign-up tournament — This will allow ahtletes to sign up  </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"registrationFeePerPair"} label={"Registration Fee Per Pair"}
                        style={isRegister ? { display: 'block' } : { display: 'none' }} initialValue={0}>
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
                    <Form.Item name={"registrationFeePerPerson"} label={"Registration Fee"}
                        style={isRegister ? { display: 'block' } : { display: 'none' }} initialValue={0}>
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
                    <Form.Item name={"protestFeePerTime"} label={"Potest Fee Per Time"} initialValue={0}>
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
                    <Form.Item name={"requiredAttachment"} label="Required attachments" required>
                        <Select {...sharedAttachmentProps} {...selectAttachmentProps} />
                    </Form.Item>



                </div>

                <Button style={{ padding: '22px 30px', fontSize: '18px', fontWeight: 'bold' }} type="primary" htmlType="submit">
                    Save
                </Button>
                {/* </section> */}
            </Form>

        </div>
    )
}

export default UpdateRegistrationFeeDetailsTour