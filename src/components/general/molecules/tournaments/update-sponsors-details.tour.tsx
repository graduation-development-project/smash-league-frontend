/* eslint-disable @next/next/no-img-element */
import { uploadBgTourImageAPI } from '@/services/create-tour';
import { createSponsorsDetailsTourAPI, deleteSponsorAPI, getSponsorTourDetailsAPI } from '@/services/update-tour';
import { InfoCircleOutlined, LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, ConfigProvider, DatePicker, Divider, Form, Input, InputNumber, Modal, Radio, Row, Select, Tooltip } from 'antd'
import { AlertCircle, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const sponsorTypes = [
    { id: "diamond", name: "Kim Cương", limit: "1–2", color: "#9c59ff" },
    { id: "platinum", name: "Bạch Kim", limit: "2–3", color: "#e5e4e2" },
    { id: "gold", name: "Vàng", limit: "3–5", color: "#f0c419" },
    { id: "silver", name: "Bạc", limit: "5–10", color: "#bdc3c7" },
    { id: "bronze", name: "Đồng", limit: "Không giới hạn", color: "#cd7f32" },
    { id: "other", name: "Khác", limit: "Không giới hạn", color: "#95a5a6" },
]

const initialSponsors = {
    diamond: [
        { id: "d1", name: "Nestlé", logo: "/placeholder.svg?height=100&width=100" },
        { id: "d2", name: "ACB Bank", logo: "/placeholder.svg?height=100&width=100" },
    ],
    platinum: [
        { id: "p1", name: "Vingroup", logo: "/placeholder.svg?height=100&width=100" },
        { id: "p2", name: "Samsung", logo: "/placeholder.svg?height=100&width=100" },
    ],
    gold: [
        { id: "g1", name: "ACB", logo: "/placeholder.svg?height=100&width=100" },
        { id: "g2", name: "BWF", logo: "/placeholder.svg?height=100&width=100" },
        { id: "g3", name: "ACB", logo: "/placeholder.svg?height=100&width=100" },
    ],
    silver: [
        { id: "s1", name: "Silver Sponsor 1", logo: "/placeholder.svg?height=100&width=100" },
        { id: "s2", name: "Silver Sponsor 2", logo: "/placeholder.svg?height=100&width=100" },
        { id: "s3", name: "Silver Sponsor 3", logo: "/placeholder.svg?height=100&width=100" },
        { id: "s4", name: "Silver Sponsor 4", logo: "/placeholder.svg?height=100&width=100" },
    ],
    bronze: [
        { id: "b1", name: "Bronze Sponsor 1", logo: "/placeholder.svg?height=100&width=100" },
        { id: "b2", name: "Bronze Sponsor 2", logo: "/placeholder.svg?height=100&width=100" },
        { id: "b3", name: "Bronze Sponsor 3", logo: "/placeholder.svg?height=100&width=100" },
        { id: "b4", name: "Bronze Sponsor 4", logo: "/placeholder.svg?height=100&width=100" },
        { id: "b5", name: "Bronze Sponsor 5", logo: "/placeholder.svg?height=100&width=100" },
        { id: "b6", name: "Bronze Sponsor 6", logo: "/placeholder.svg?height=100&width=100" },
    ],
    other: [
        { id: "o1", name: "Other Sponsor 1", logo: "/placeholder.svg?height=100&width=100" },
        { id: "o2", name: "Other Sponsor 2", logo: "/placeholder.svg?height=100&width=100" },
    ],
}
const UpdateSponsorsDetailsTour = ({
    detail,
    setDetail,
}: {
    detail: any;
    setDetail: any
}) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [logoImage, setLogoImage] = useState<File | null>(null);
    const [sponsorList, setSponsorList] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sponsors, setSponsors] = useState(initialSponsors);
    const [selectedType, setSelectedType] = useState("diamond")

    const tierOptions = [
        {
            label: 'Diamond',
            value: 'DIAMOND',
        }
    ]

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
            }
        }
    }, []);

    const fetchCreateSponsor = async (data: any) => {
        await createSponsorsDetailsTourAPI(data, user.access_token);
    }
    const fetchGetSponsorsDetailTour = async () => {
        const response = await getSponsorTourDetailsAPI(detail?.id);
        setSponsorList(response?.data);
    }
    const fetchUploadImage = async (fileImage: File) => {
        const response = await uploadBgTourImageAPI(fileImage);
        return response;
    }
    const fetchDeleteSponsor = async (tourId: string, sponsorId: string) => {
        await deleteSponsorAPI(tourId, sponsorId, user.access_token);
    }

    useEffect(() => {
        fetchGetSponsorsDetailTour();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail?.id])

    const isLimitReached = (type: string) => {
        const sponsorType = sponsorTypes.find((t) => t.id === type)
        if (!sponsorType) return false

        // No limit for bronze and other
        if (type === "bronze" || type === "other") return false

        const currentCount = sponsors[type as keyof typeof sponsors].length
        const maxLimit = sponsorType.limit.split("–")[1]

        return currentCount >= Number.parseInt(maxLimit)
    }
    const onFinish = async (fieldValues: any) => {
        setIsLoading(true);
        const imageLink = await fetchUploadImage(fieldValues.logo);

        const data = [
            {
                "name": fieldValues.name,
                "logo": imageLink,
                "tier": fieldValues.tier,
            },
        ]

        await fetchCreateSponsor(data);
        await fetchGetSponsorsDetailTour();
        setIsLoading(false);
    };
    return (
        <div>
            {/* <Form
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

            </Form> */}
            <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md border">
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
                        <h3 className="text-lg font-medium mb-4">Thêm nhà tài trợ mới</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Form.Item
                                label={"Sponsor's Name"}
                                name={"name"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input sponsor name!',
                                    }
                                ]}
                            >
                                <Input
                                    maxLength={50}
                                    placeholder="Tên nhà tài trợ"
                                />
                            </Form.Item>
                            <div>
                                <Form.Item
                                    label={"Logo"}
                                    name={"logo"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please upload logo!',
                                        }
                                    ]}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setLogoImage(file);
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <Form.Item
                                    label={"Sponsor Tier"}
                                    name={"tier"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select a tier!',
                                        }
                                    ]}
                                >
                                    <Select

                                        options={tierOptions}
                                    >
                                        {sponsorTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name} ({type.limit})
                                            </option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="flex items-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-[#F47B3F] hover:bg-[#e06a2e] text-white"
                                    disabled={isLimitReached(selectedType)}
                                >
                                    <PlusCircleOutlined className="w-4 h-4 mr-2" /> Add Sponsor
                                </Button>
                                {isLimitReached(selectedType) && (
                                    // <TooltipContent>
                                    //     <p>Đã đạt giới hạn tối đa cho loại tài trợ này</p>
                                    // </TooltipContent>

                                    <Tooltip placement="bottomLeft" title={"Maximum limit reached for this type"} >
                                        <Button icon={<InfoCircleOutlined className="w-4 h-4 text-gray-500" />}></Button>
                                    </Tooltip>


                                )}
                            </div>
                        </div>
                    </Form>
                </div>


                {/* Sponsor categories */}
                <div>
                    {sponsorTypes.map((type) => (
                        <div key={type.id} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3
                                        className="text-lg font-medium py-1 px-3 rounded-md text-white"
                                        style={{ backgroundColor: type.color }}
                                    >
                                        {type.name} Sponsors
                                    </h3>
                                    <Tooltip placement="bottomLeft" title={`Maximum quantity: ${type.limit}`} >
                                        <Button icon={<InfoCircleOutlined className="w-4 h-4 text-gray-500" />}></Button>
                                    </Tooltip>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {sponsors[type.id as keyof typeof sponsors].length} /
                                    {type.id === "bronze" || type.id === "other" ? "∞" : type.limit.split("–")[1]}
                                </div>
                            </div>

                            <div className="overflow-x-auto pb-2">
                                <div className={`flex gap-4 ${type.id === "bronze" || type.id === "other" ? "min-w-max" : ""}`}>
                                    {sponsors[type.id as keyof typeof sponsors].map((sponsor) => (
                                        <Card key={sponsor.id} className="w-[200px] flex-shrink-0">
                                            <div className="p-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-24 h-24 mb-4 flex items-center justify-center">
                                                        <img
                                                            src={sponsor.logo || "/placeholder.svg"}
                                                            alt={sponsor.name}
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="text-center mb-4">
                                                        <h4 className="font-medium">{sponsor.name}</h4>
                                                        <p className="text-sm text-gray-500">{type.name} Sponsor</p>
                                                    </div>
                                                    <Button
                                                        onClick={() => fetchDeleteSponsor(detail?.id, sponsor.id)}
                                                        className="w-full"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                    {sponsors[type.id as keyof typeof sponsors].length === 0 && (
                                        <div className="flex items-center justify-center w-full h-32 bg-gray-50 rounded-md border border-dashed">
                                            <p className="text-gray-500">Chưa có nhà tài trợ {type.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div >
        </div >
    )
}

export default UpdateSponsorsDetailsTour