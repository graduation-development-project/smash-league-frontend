import { Form } from 'antd'
import React from 'react'

const UpdateInvitationsAdditionalOptionsDetails = () => {
    const [form] = Form.useForm();

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

            </Form>
        </div>
    )
}

export default UpdateInvitationsAdditionalOptionsDetails