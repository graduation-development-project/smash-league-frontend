"use client"
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, InputNumber, Radio, Select, SelectProps, Space } from 'antd'
import React from 'react'

interface SelectItemProps {
    label: string;
    value: string;
}

const CreateTourStep2 = () => {

    const [sponsorList, setSponsorList] = React.useState<string[]>([]);
    const [isRecruit, setIsRecruit] = React.useState<boolean>(false);


    const selectSponsors: SelectItemProps[] = [];
    for (let i = 10; i < 36; i++) {
        const value = i.toString(36) + i;
        selectSponsors.push({
            label: `${value}`,
            value,
        });
    }
    const sharedSponsorProps: SelectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        options: selectSponsors,
        placeholder: 'Select Item...',
        maxTagCount: 'responsive',
    };
    const selectSponsorProps: SelectProps = {
        value: sponsorList,
        onChange: setSponsorList,
    }


    return (
        <div className='w-full h-max flex flex-col items-center justify-center rounded gap-10'>
            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Invitations </h1>
                    </div>
                </div>
                <div className='w-5/6 h-max p-10'>

                    <Form.Item name="sponsors" label="Sponsors" >
                        <Select {...sharedSponsorProps} {...selectSponsorProps} placeholder="Select sponsors" />
                    </Form.Item>
                    <Divider />
                    <Form.Item name="isRecruit" label="Umpires" required>
                        <Radio.Group
                            onChange={(e) => setIsRecruit(e.target.value)}
                            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', rowGap: '8px' }}
                        >
                            <Radio value={false}>Already have umpires team </Radio>
                            <Radio value={true}> Recruit umpires </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="numberOfUmpires" style={isRecruit ? { display: 'block' } : { display: 'none' }} label="Number of umpires" initialValue={1}>
                        <InputNumber min={1} max={50} suffix={'Umpires'} style={{ width: '100%' }} placeholder="Number of umpires" changeOnWheel />
                    </Form.Item>

                    {/* <div className='w-full h-max flex flex-col items-center justify-center'> */}
                    {/* <div className='w-full '> */}
                    <Form.Item label="Umpires' List" name="umpireList">
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
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Organizers' List" name="organizerList">
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
                    </Form.Item>
                </div>
            </div>
            <div className='w-full flex flex-col shadow-shadowBtn'>
                <div className='w-full h-max flex bg-primaryColor rounded-t-md'>
                    <div className='w-full h-max flex justify-between items-center px-10 py-1'>
                        <h1 className='font-quicksand  text-base font-bold text-white'>Additional Options</h1>
                    </div>
                </div>
                <div className='w-full h-max p-8 flex flex-col'>
                    <Form.Item name={"isPrivate"} valuePropName='checked'>
                        <Checkbox >Private Tournament - Only who has URL can join</Checkbox>

                    </Form.Item>
                    <Form.Item name={"isLiveDraw"}>
                        <Checkbox >Live Streaming Draw</Checkbox>
                    </Form.Item>
                    <Form.Item name={"isLiveDraw"}>
                        <Checkbox >Live Streaming Matches</Checkbox>
                    </Form.Item>
                </div>
            </div>

        </div>
    )
}

export default CreateTourStep2