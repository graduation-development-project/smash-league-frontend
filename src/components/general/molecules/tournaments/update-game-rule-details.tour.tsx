import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, CheckboxProps, ColorPicker, Divider, Form, Input, InputNumber, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';


const UpdateGameRuleDetailsTour = () => {
  const [form] = Form.useForm();

  const eventOptions = [
    { label: 'Men\'s Singles', value: 'MENS_SINGLE' },
    { label: 'Women\'s Singles', value: 'WOMENS_SINGLE' },
    { label: 'Men\'s Doubles', value: 'MENS_DOUBLE' },
    { label: 'Women\'s Doubles', value: 'WOMENS_DOUBLE' },
    { label: 'Mixed Doubles', value: 'MIXED_DOUBLE' },
  ]
  const defaultEventList = ['MENS_SINGLE', 'WOMENS_SINGLE',];
  const [eventList, setEventList] = useState<string[]>(defaultEventList);

  const checkAllEventList = eventOptions.length === eventList.length;
  const indeterminate = eventList.length > 0 && eventList.length < eventOptions.length;
  const onChangeEvent = (list: string[]) => {
    setEventList(list.length > 0 ? list : defaultEventList);
  };
  const onCheckAllEventChange: CheckboxProps['onChange'] = (e) => {
    setEventList(e.target.checked ? eventOptions.map(option => option.value) : []);
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
        {/* <div className='w-full h-max pt-10 px-3'> */}
          <div className='w-full h-max flex flex-col p-10 justify-center items-center'>
            <div className='w-full h-max flex flex-col'>
              <Form.Item name="maxEventPerPerson" label="Max events an athlete can register">
                <Select placeholder="Number events per athlete can join">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Select.Option key={num} value={num}>{num}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Events" required>
                <Divider />
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllEventChange} checked={checkAllEventList}>
                  Check all
                </Checkbox>
                <Divider />
                <Checkbox.Group options={eventOptions} value={eventList} onChange={onChangeEvent} />

              </Form.Item>
            </div>
            {/* <div className='w-full h-max flex justify-center items-center'> */}

            {/* <Form.Item noStyle name={['categories', 'min']}> */}
            <Form.List name="createTournamentEvent">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16, width: '90%' }}>
                  {eventList?.map((event, index) => {

                    const field = fields.find((f) => f.name === index);
                    if (!field) add()

                    return (
                      <Card
                        size="small"
                        title={eventOptions?.find((e) => e.value === event)?.label || event}
                        key={event}
                        style={{ borderWidth: 2, width: '100%', display: 'flex', flexDirection: 'column', rowGap: 16, alignSelf: 'center' }}
                        extra={eventList.length > 1 && (
                          <CloseOutlined
                            onClick={() => {
                              remove(index);
                              setEventList(eventList.filter((item) => item !== event));
                            }}
                          />
                        )
                        }
                      >
                        <Form.List name={[index, event]} >
                          {(subFields, subOpt) => {
                            if (subFields.length === 0) {
                              subOpt.add();
                            }

                            return (
                              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16, width: '100%' }}>
                                {subFields.map((subField) => (
                                  <Card
                                    size="small"
                                    style={{ borderWidth: 2, width: '90%', display: 'flex', flexDirection: 'column', rowGap: 16, alignSelf: 'center' }}
                                    key={subField.key}
                                    title={
                                      <Space key={subField.key}>
                                        From
                                        <Form.Item noStyle name={[subField.name, 'fromAge']} required>
                                          <InputNumber style={{ width: '150px' }} placeholder="Minimum Age" />
                                        </Form.Item>
                                        to
                                        <Form.Item noStyle name={[subField.name, 'toAge']} required>
                                          <InputNumber style={{ width: '150px' }} placeholder="Maxium age" />
                                        </Form.Item>
                                      </Space>
                                    }
                                    extra={subFields.length > 1 && (
                                      <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
                                    )}
                                  >
                                    {/* FIX: Properly nest fields inside Form.List */}
                                    <Form.Item name={[subField.name, "typeOfFormat"]} label="Type of format" initialValue={"SINGLE_ELIMINATION"} required>
                                      <Select placeholder="Number of game(s)">
                                        <Select.Option value="SINGLE_ELIMINATION">Single Elimination</Select.Option>
                                        {/* <Select.Option value="ROUND_ROBIN">Round Robin</Select.Option> */}
                                      </Select>
                                    </Form.Item>
                                    <Form.Item name={[subField.name, "maximumAthlete"]} label="Maximum athletes" required>
                                      <InputNumber min={0} max={1000} style={{ width: '100%' }} placeholder="Maximum athletes" />
                                    </Form.Item>
                                    <Form.Item name={[subField.name, "minimumAthlete"]} label="Minimum athletes" required>
                                      <InputNumber min={4} max={100} style={{ width: '100%' }} placeholder="Maximum athletes" />
                                    </Form.Item>


                                    <Form.Item name={[subField.name, "numberOfGames"]} label="Number of games" required>
                                      <Select placeholder="Number of game(s)">
                                        <Select.Option value="1">1</Select.Option>
                                        <Select.Option value="3">3</Select.Option>
                                        <Select.Option value="5">5</Select.Option>
                                      </Select>
                                    </Form.Item>

                                    <Form.Item name={[subField.name, "winningPoint"]} label="Winning points" >
                                      <InputNumber min={15} max={51} style={{ width: '100%' }} placeholder="Winning points" />
                                    </Form.Item>

                                    <Form.Item name={[subField.name, "lastPoint"]} label="Last points" required>
                                      <InputNumber min={15} max={51} style={{ width: '100%' }} placeholder="Last points" />
                                    </Form.Item>

                                    <Form.Item name={[subField.name, "ruleOfEventExtension"]} label="Rules">
                                      <TextArea placeholder="Enter rules" autoSize={{ minRows: 3, maxRows: 5 }} />
                                    </Form.Item>

                                    <Divider />
                                    <Form.Item name={[subField.name, "championshipPrize"]} label="Champion Rewards" required >
                                      <Input style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item name={[subField.name, "runnerUpPrize"]} label="Runner-up" >
                                      <Input style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item name={[subField.name, "thirdPlacePrize"]} label="Third Place">
                                      <Input style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item name={[subField.name, "jointThirdPlacePrize"]} label="Third Place (Tie)">
                                      <Input style={{ width: '100%' }} />
                                    </Form.Item>

                                  </Card>
                                ))}
                                <Button type="dashed" onClick={() => subOpt.add()} block>
                                  + Add Range Age
                                </Button>
                              </div>
                            )
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

        {/* </div> */}

        <Button style={{ padding: '22px 30px', fontSize: '18px', fontWeight: 'bold' }} type="primary" htmlType="submit">
          Save
        </Button>
        {/* </section> */}
      </Form>

    </div>
  )
}

export default UpdateGameRuleDetailsTour