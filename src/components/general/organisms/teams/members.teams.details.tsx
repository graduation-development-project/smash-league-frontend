'use client';
import React, { useEffect, useState } from 'react';
import PaginationCard from '../../atoms/pagination/pagination-card';
import { ConfigProvider, Empty, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import TeamMemberCard from '../../atoms/teams/team-member-card';
import EmptyCard from '../../molecules/empty/empty.card';
import { Button } from '@/components/ui/button';
import { IoAddCircleSharp } from 'react-icons/io5';
import InviteMemberTeamModal from '../../molecules/teams/invite-member.team.modal';
import { useTeamContext } from '@/context/team.context';
import { getTeamMembersAPI } from '@/services/team';
import { useDebounce } from '@/hooks/use-debounce';

const MembersTeamsDetails = (props: any) => {
  const { teamMemberList, setTeamMemberList, teamId } = props;
  const [isMembers, setIsMembers] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const { teamDetails} = useTeamContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(8);

  const debouncedValue = useDebounce(searchTerm, 1000);
  const fetchTeamMembers = async (
    teamId: string,
    searchTerm: string,
    page: number,
    perPage: number,
  ) => {
    if (teamId) {
      setIsLoading(true);
      try {
        const res = await getTeamMembersAPI(teamId, searchTerm, page, perPage);
        console.log(res?.data.data?.meta, "Check meta");
        setTeamMemberList(res?.data?.data?.data || []);
        setPage(res?.data?.data?.meta?.currentPage);
        setPerPage(res?.data?.data?.meta?.totalPerPage);
        setTotal(res?.data?.data?.meta?.total);
      } catch (error) {
        console.error('Failed to fetch team members', error);
      }
      setIsLoading(false);
    }
  };

  // console.log('Check team members list', teamMemberList);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers(teamId, debouncedValue, page, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, debouncedValue]);

  const isTeamLeader =
    user?.userRoles?.includes('Team Leader') &&
    user?.id === teamDetails?.teamLeaderId;

  const handleChange = async (page: number) => {
    await fetchTeamMembers(teamId, debouncedValue, page, perPage);
  };

  return (
    <>
      {teamMemberList.length > 0 ? (
        <div className="w-full h-full flex flex-col items-center gap-5 p-5">
          <div className="w-full flex justify-between items-center px-5">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    activeBorderColor: '#FF8243',
                    activeShadow: '0 0 0 2px #fffff',
                    hoverBorderColor: '#FF8243',
                  },
                },
              }}
            >
              <Input
                size="large"
                variant="outlined"
                placeholder="Find the member"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '40%',
                }}
                suffix={
                  <SearchOutlined
                    style={{
                      fontSize: 20,
                      color: '#FF8243',
                      fontWeight: 'bold',
                    }}
                  />
                }
              />
            </ConfigProvider>
            {isTeamLeader && (
              <Button size={'sm'} onClick={() => setIsModalOpen(true)}>
                <IoAddCircleSharp /> Invite Members
              </Button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-x-8 gap-y-6 place-items-center justify-items-center">
            {teamMemberList?.map((member: UserProps) => (
              <div key={member?.id}>
                <TeamMemberCard
                  member={member}
                  fetchMembers={() =>
                    fetchTeamMembers(teamId, debouncedValue, page, perPage)
                  }
                />
              </div>
            ))}
          </div>

          <PaginationCard
            total={total}
            currentPage={page}
            totalPerPage={perPage}
            onChange={handleChange}
            itemText="members"
          />
        </div>
      ) : (
        <EmptyCard
          description="No members found"
          image="https://static.thenounproject.com/png/88030-200.png"
        />
      )}
      <InviteMemberTeamModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default MembersTeamsDetails;
