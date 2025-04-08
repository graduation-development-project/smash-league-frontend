import { getTournamentEventDetailAPI } from '@/services/tournament'
import { RegisterAthleteTournamentFormProps } from '@/types/types'
import { calculateAge } from '@/utils/calculateAge'
import { EVENT_ENUM } from '@/utils/enum'
import { Card, Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'

const RegisterTeamStep2Form = (
  {
    detailId,
    detail,
    registerAthleteList,
  }: {
    detailId: string
    detail: any,
    registerAthleteList: RegisterAthleteTournamentFormProps[],
  }
) => {

  const [tournamentEvent, setTournamentEvent] = useState([]);
  const tournamentEventReal = async () => {
    // if (detail) return;
    try {
      // console.log('Check detail id', detail?.id); 
      const response = await getTournamentEventDetailAPI(detailId);
      setTournamentEvent(response.data.data);
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    tournamentEventReal();
  }, [detailId]);

  const tournamentEventsOptions = tournamentEvent
    ?.sort((a: any, b: any) => {
      if (a.tournamentEvent < b.tournamentEvent) return -1;
      if (a.tournamentEvent > b.tournamentEvent) return 1;
      return a.fromAge - b.fromAge;
    })
    .map((item: any) => ({
      value: item.id,
      label: `${EVENT_ENUM[item.tournamentEvent as keyof typeof EVENT_ENUM]} - Age: ${item.fromAge} to ${item.toAge}`,
      // disabled:
      //   item.fromAge > calculateAge(user?.dateOfBirth) ||
      //   calculateAge(user?.dateOfBirth) > item.toAge,
    }));

  // const registerAthleteList 
  console.log(detail?.tournamentEvents, 'detail step2');


  const handleAthleteChange = async (e: any) => {

  }
  return (
    <div>
      {
        tournamentEventsOptions?.map((item: any, index: number) => {
          return (
            <Card
              key={item.id}
              title={item.label}
            >
              {
                item.label.includes("SINGLE") ? (
                  <div>
                    <Form.Item name={'playerId'} label="Athlete" >
                      <Select
                        onChange={(e) => handleAthleteChange(e)}
                        showSearch
                        style={{ width: "" }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={registerAthleteList.map((item: any) => ({ label: item?.playerName, value: item?.playerId }))}
                      />
                    </Form.Item>

                  </div>

                ) : (
                  <div>
                    <Form.Item name={[index, 'playerId']} label="Athlete">
                      <Select
                        onChange={(e) => handleAthleteChange(e)}
                        showSearch
                        style={{ width: "" }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={registerAthleteList.map((item: any) => ({ label: item?.playerName, value: item?.playerId }))}
                      />

                    </Form.Item>
                    <Form.Item name={[index, 'playerId']} label="Athlete">
                      <Select
                        onChange={(e) => handleAthleteChange(e)}
                        showSearch
                        style={{ width: "" }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={registerAthleteList.map((item: any) => ({ label: item?.playerName, value: item?.playerId }))}
                      />

                    </Form.Item>
                  </div>

                )
              }

            </Card>
          )
        })

      }
    </div>
  )
}

export default RegisterTeamStep2Form