import { getTeamMembersAPI } from '@/services/team';
import { RegisterAthleteTournamentFormProps } from '@/types/types';
import { ATTACHMENTS_ENUM } from '@/utils/enum';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Select } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const RegisterTeamStep1Form = ({
    form,
    teamId,
    detail,
    registerAthleteList,
    setRegisterAthleteList,
}: {
    form: any;
    teamId: string;
    detail: any;
    registerAthleteList: RegisterAthleteTournamentFormProps[];
    setRegisterAthleteList: React.Dispatch<React.SetStateAction<RegisterAthleteTournamentFormProps[]>>;
}) => {
    const [athleteList, setAthleteList] = useState<{ label: string; value: string }[]>([]);
    const [fullAthleteList, setFullAthleteList] = useState<{ label: string; value: string }[]>([]);


    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const res = await getTeamMembersAPI(teamId, '', 1, 200);
                const formatted = res?.data?.data?.data?.map((a: any) => ({  value: a.id, label: a.name }));
                setAthleteList(formatted);
                setFullAthleteList(formatted);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAthletes();
    }, [teamId]);
    console.log("athleteList", athleteList);


    const handleSelectAthlete = (index: number, value: string) => {
        const selected = athleteList.find((a) => a.value === value);
        if (!selected) return;


        const updatedList = [...registerAthleteList];
        updatedList[index].playerId = value;
        updatedList[index].playerName = selected.label;
        updatedList[index].fromTeamId = teamId;
        updatedList[index].tournamentId = detail.id;
        updatedList[index].tournamentEventId = '';
        updatedList[index].registrationDocumentCreator = {};

        setRegisterAthleteList(updatedList);
        setAthleteList((prev) => prev.filter((a) => a.value !== value));
    };

    const handleAddAthlete = () => {
        setRegisterAthleteList((prev) => [
            ...prev,
            {
                playerId: '',
                playerName: '',
                fromTeamId: teamId,
                tournamentId: detail.id,
                tournamentEventId: '',
                registrationDocumentCreator: {},
            },
        ]);
    }
    const handleFileChange = (
        athleteIndex: number,
        attachmentType: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const max = attachmentType === 'IDENTIFICATION_CARD' ? 2 : 1;
        const updatedList = [...registerAthleteList];
        const current = updatedList[athleteIndex];
        const oldFiles = current.registrationDocumentCreator?.[attachmentType] || [];
        const newFiles = [...oldFiles, ...files].slice(0, max);
        current.registrationDocumentCreator[attachmentType] = newFiles;
        setRegisterAthleteList(updatedList);
    };

    const handleRemoveFile = (athleteIndex: number, attachmentType: string, fileIndex: number) => {
        const updatedList = [...registerAthleteList];
        const files = updatedList[athleteIndex].registrationDocumentCreator[attachmentType];
        updatedList[athleteIndex].registrationDocumentCreator[attachmentType] = files.filter(
            (_, i) => i !== fileIndex
        );
        setRegisterAthleteList(updatedList);
    };

    const handleRemoveAthlete = (index: number) => {
        const removed = registerAthleteList[index];

        // Tìm lại từ danh sách gốc
        const athleteOption = fullAthleteList.find((a) => a.value === removed.playerId);
        if (athleteOption) {
            setAthleteList((prev) => [...prev, athleteOption]);
        }
        setRegisterAthleteList((prev) => prev.filter((_, i) => i !== index));
    };
    console.log('registerAthleteList', registerAthleteList);
    

    return (
        <div className="flex flex-col items-center w-full">
            {registerAthleteList.map((athlete, index) => {
                return (

                    <Card
                        key={index}
                        title={`Athlete ${index + 1}`}
                        style={{ width: '90%', marginBottom: 16 }}
                        extra={
                            registerAthleteList.length > 1 && (
                                <CloseOutlined onClick={() => handleRemoveAthlete(index)} style={{ color: 'red' }} />
                            )
                        }
                    >
                        <Form.Item  label="Athlete">
                            <Select
                                showSearch
                                options={athleteList}
                                optionFilterProp="label"
                                placeholder="Select Athlete"
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={(val) => handleSelectAthlete(index, val)}
                            />
                        </Form.Item>

                        {detail?.requiredAttachment?.map((item: string) => (
                            <Form.Item key={item} label={ATTACHMENTS_ENUM[item as keyof typeof ATTACHMENTS_ENUM]}>
                                <input
                                    type="file"
                                    multiple={item === 'IDENTIFICATION_CARD'}
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(index, item, e)}
                                />
                                <div className="flex gap-4 mt-2 flex-wrap">
                                    {athlete.registrationDocumentCreator?.[item]?.map((file, i) => (
                                        <div key={i} className="relative">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`File ${i}`}
                                                width={200}
                                                height={200}
                                                className="rounded-lg shadow"
                                            />
                                            <CloseOutlined
                                                className="absolute top-1 right-1 text-red-600 cursor-pointer"
                                                onClick={() => handleRemoveFile(index, item, i)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Form.Item>
                        ))}
                    </Card>
                )
            })}

            <Button type="dashed" onClick={handleAddAthlete} className="w-4/5">
                + Add Athlete
            </Button>
        </div>
    );
};

export default RegisterTeamStep1Form;
