import { getTournamentEventDetailAPI } from '@/services/tournament';
import {
  RegisterAthleteTournamentBeforeSubmitFormProps,
  RegisterAthleteTournamentFormProps,
} from '@/types/types';
import { EVENT_ENUM } from '@/utils/enum';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const RegisterTeamStep2Form = ({
  detailId,
  detail,
  registerAthleteList,
  beforeSubmitList,
  setBeforeSubmitList,
}: {
  detailId: string;
  detail: any;
  registerAthleteList: RegisterAthleteTournamentFormProps[];
  beforeSubmitList: RegisterAthleteTournamentBeforeSubmitFormProps[];
  setBeforeSubmitList: React.Dispatch<React.SetStateAction<RegisterAthleteTournamentBeforeSubmitFormProps[]>>;
}) => {
  const [tournamentEvent, setTournamentEvent] = useState<any[]>([]);
  const [eventSelections, setEventSelections] = useState<Record<string, { playerId: string; partnerId?: string }[]>>({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getTournamentEventDetailAPI(detailId);
        setTournamentEvent(response.data);
      } catch (error) {
        console.log('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [detailId]);

  const tournamentEventsOptions = tournamentEvent
    ?.sort((a, b) => {
      if (a.tournamentEvent < b.tournamentEvent) return -1;
      if (a.tournamentEvent > b.tournamentEvent) return 1;
      return a.fromAge - b.fromAge;
    })
    .map((item) => ({
      value: item.id,
      label: `${EVENT_ENUM[item.tournamentEvent as keyof typeof EVENT_ENUM]} - Age: ${item.fromAge} to ${item.toAge}`,
      type: item.tournamentEvent,
    }));

  const getAvailableAthletes = (eventId: string) => {
    const selectedIds = eventSelections[eventId]?.flatMap((sel) => [sel.playerId, sel.partnerId]).filter(Boolean);
    return registerAthleteList.filter((ath) => !selectedIds?.includes(ath.playerId)).map((ath) => ({
      label: ath.playerName,
      value: ath.playerId,
    }));
  };

  const handleAddSelection = (eventId: string, isDouble: boolean) => {
    const updated = { ...eventSelections };
    const newItem = isDouble ? { playerId: '', partnerId: '' } : { playerId: '' };
    updated[eventId] = [...(updated[eventId] || []), newItem];
    setEventSelections(updated);
  };

  const handleRemoveSelection = (eventId: string, index: number) => {
    const updatedSelections = { ...eventSelections };
    const removed = updatedSelections[eventId][index];
    updatedSelections[eventId].splice(index, 1);
    setEventSelections(updatedSelections);

    const updatedBeforeSubmit = beforeSubmitList.filter((item) =>
      item.tournamentEventId !== eventId ||
      (item.playerId !== removed.playerId && item.partnerId !== removed.partnerId)
    );
    setBeforeSubmitList(updatedBeforeSubmit);
  };

  const handleSelectionChange = (
    eventId: string,
    index: number,
    type: 'playerId' | 'partnerId',
    value: string
  ) => {
    const updated = { ...eventSelections };
    updated[eventId][index][type] = value;
    setEventSelections(updated);

    const player = registerAthleteList.find((a) => a.playerId === updated[eventId][index].playerId);
    const partner = registerAthleteList.find((a) => a.playerId === updated[eventId][index].partnerId);

    const newEntry: RegisterAthleteTournamentBeforeSubmitFormProps = {
      playerId: updated[eventId][index].playerId || '',
      playerName: player?.playerName || '',
      partnerId: updated[eventId][index].partnerId || '',
      partnerName: partner?.playerName || '',
      tournamentId: detail.id,
      fromTeamId: player?.fromTeamId || '',
      tournamentEventId: eventId,
      registrationDocumentCreator: player?.registrationDocumentCreator || {},
      registrationDocumentPartner: partner?.registrationDocumentCreator || {},
    };

    const updatedBeforeSubmit = beforeSubmitList.filter((item) =>
      !(item.tournamentEventId === eventId &&
        item.playerId === newEntry.playerId &&
        item.partnerId === newEntry.partnerId)
    );
    setBeforeSubmitList([...updatedBeforeSubmit, newEntry]);
  };
  console.log('beforeSubmitList', beforeSubmitList);

  return (
    <div>
      {tournamentEventsOptions.map((eventOption) => {
        const eventId = eventOption.value;
        const isDouble = eventOption.label.includes('Double');
        const selections = eventSelections[eventId] || [];

        return (
          <Card key={eventId} title={eventOption.label} style={{ marginBottom: 24 }}>
            {selections.map((sel, index) => (
              <Card
                key={index}
                size="small"
                title={isDouble ? `Couple ${index + 1}` : `Athlete ${index + 1}`}
                extra={
                  <CloseOutlined
                    onClick={() => handleRemoveSelection(eventId, index)}
                    style={{ color: 'red' }}
                  />
                }
              >
                <Form.Item label="Athlete">
                  <Select
                    placeholder="Select athlete"
                    options={getAvailableAthletes(eventId)}
                    // value={sel.playerId || undefined}
                    onChange={(val) => handleSelectionChange(eventId, index, 'playerId', val)}
                  />
                </Form.Item>
                {isDouble && (
                  <Form.Item label="Partner">
                    <Select
                      placeholder="Select partner"
                      options={getAvailableAthletes(eventId)}
                      // value={sel.partnerId || undefined}
                      onChange={(val) => handleSelectionChange(eventId, index, 'partnerId', val)}
                    />
                  </Form.Item>
                )}
              </Card>
            ))}
            <Button
              type="dashed"
              onClick={() => handleAddSelection(eventId, isDouble)}
              className="mt-2"
            >
              + {isDouble ? 'Add Couple' : 'Add Athlete'}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default RegisterTeamStep2Form;
