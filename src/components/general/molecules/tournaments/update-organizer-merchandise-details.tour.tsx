import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Image, Input, InputNumber, Radio } from 'antd';
import React, { useRef, useState } from 'react'

const UpdateOrganizerMerchandiseDetailsTour = ({
  fileImgMerchandiseList,
  setFileImgMerchandiseList,
}: {
  fileImgMerchandiseList: File[],
  setFileImgMerchandiseList: (value: File[]) => void
}) => {

  const [form] = Form.useForm();

  const [hasMerchandise, setHasMerchandise] = useState(false);
  const inputImgMerchanRef = useRef<HTMLInputElement | null>(null);


  const handleFileImgMerchandiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
      console.log(fileImgMerchandiseList);

      setFileImgMerchandiseList([...fileImgMerchandiseList, ...Array.from(e.target.files)]);
    }
  };


  const handleDeleteFileBgTour = (index: number) => {
    setFileImgMerchandiseList(fileImgMerchandiseList.filter((_: File, i: number) => i !== index));
  };

  return (
    <div>
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
          <Form.Item
            name="host"
            label="Host"
            required
          >
            <Input value={"Ho Chi Minh Federation"} disabled />
          </Form.Item>
          {/* <Form.Item name="organizers" label="Co-Organizers">
                                  <Select {...sharedOrganizerProps} {...selectOrganizerProps} />
                              </Form.Item> */}
          <Form.Item
            name="contactEmail"
            label="Contact Email"
            required>
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

          <Divider />

          <Form.Item name="hasMerchandise" label="Merchandise for audiences">
            <Radio.Group
              onChange={(e) => setHasMerchandise(e.target.value)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', rowGap: '8px' }}
            >
              <Radio value={false}>No merchandise </Radio>
              <Radio value={true}>Give merchandise for audiences </Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ display: hasMerchandise ? 'block' : 'none' }}>
            <Form.Item name={"merchandise"} label="Merchandise description">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name={"numberOfMerchandise"}
              label="Number of merchandise"
              initialValue={0}
              required
            >
              <InputNumber
                min={0}
                max={1000}
                style={{ width: '100%' }}
                placeholder="Number of merchandise"
                changeOnWheel
              />
            </Form.Item>

            <Divider />

            <Form.Item
              name="merchandiseImages"
              label="Merchandise Image"
            >
              <div className='flex gap-4 flex-wrap w-full'>
                {fileImgMerchandiseList.length < 5 && (
                  <div
                    className="w-[150px] h-[150px] flex justify-center items-center rounded-lg border-[1px] border-dashed border-[#FF8243] cursor-pointer"
                    onClick={() => inputImgMerchanRef.current?.click()}
                  >
                    <PlusOutlined style={{ fontSize: "30px", color: "#FF8243" }} />
                  </div>
                )}
                {
                  fileImgMerchandiseList?.map((file: File, index: number) => (
                    <div key={index}
                      className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="Uploaded"
                        width={150}
                        height={150}
                        style={{ objectFit: "contain" }}
                        className="rounded-lg shadow-shadowBtn max-w-[150px] max-h-[150px]"
                      />

                      <button
                        onClick={() => handleDeleteFileBgTour(index)}
                        className="absolute top-0 right-0 bg-[#ffffffbd]  rounded-full p-1 "
                      >
                        <CloseOutlined style={{ color: 'red', fontSize: '15px', }} />
                      </button>
                    </div>
                  ))
                }

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

export default UpdateOrganizerMerchandiseDetailsTour