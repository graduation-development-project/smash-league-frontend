import { Button, DatePicker, Divider, Form, InputNumber, Radio, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react'

const formatTimeCheckIn = 'mm:ss';

const UpdateScheduleMatchesDetailsTour = () => {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();

    const [registerDate, setRegisterDate] = useState<Array<dayjs.Dayjs>>([]);
    const [drawDate, setDrawDate] = useState<Array<dayjs.Dayjs>>([]);
    const [occurDate, setOccurDate] = useState<Array<dayjs.Dayjs>>([]);


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
                    <Form.Item name={"checkIn"} label="Check-in before start time" initialValue={dayjs('15:00', formatTimeCheckIn)} required>
                        <TimePicker defaultValue={dayjs('15:00', formatTimeCheckIn)} format={formatTimeCheckIn} />
                    </Form.Item>
                    <Divider />
                    <Form.Item name="umpirePerMatch" label="Main umpires in a match" required>
                        <InputNumber min={1} max={3} suffix={'Umpire(s)'} style={{ width: '100%' }} placeholder="Number of umpires" changeOnWheel />

                    </Form.Item>
                    <Form.Item name="linemanPerMatch" label="Linesman in a match" required>
                        <InputNumber min={1} max={5} suffix={'Linemans'} style={{ width: '100%', marginTop: '8px' }} placeholder="Number of umpires" changeOnWheel />
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

export default UpdateScheduleMatchesDetailsTour