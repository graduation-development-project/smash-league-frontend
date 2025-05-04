import { Button, Divider, Form, Input, InputNumber, Radio } from 'antd'
import React, { useEffect, useState } from 'react'

const UpdateSponsorsDetailsTour = ({
    detail,
    setDetail,
}: {
    detail: any;
    setDetail: any
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
            }
        }
    }, []);


    const onFinish = (fieldValues: any) => {
        console.log('Success:', fieldValues);
    };
    return (
        <div>
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
                    <Form.Item name='sponsors'>

                    </Form.Item>
                </div>

                <Button style={{ padding: '22px 30px', fontSize: '18px', fontWeight: 'bold' }}
                    type="primary"
                    htmlType="submit"
                >
                    Save
                </Button>

            </Form>
        </div>
    )
}

export default UpdateSponsorsDetailsTour