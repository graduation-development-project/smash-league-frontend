import { SearchOutlined } from '@ant-design/icons';
import { Modal, ConfigProvider, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import MemberSearchTeamCard from '../../atoms/teams/member-search.teams.card';
import { useDebounce } from '@/hooks/use-debounce';
import { searchUserByEmail } from '@/services/user';
import { useTeamContext } from '@/context/team.context';
import { inviteMemberAPI } from '@/services/team';
import { toast } from 'react-toastify';

const InviteMemberTeamModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [user, setUser] = useState<any>({});
  const [tippyVisible, setTippyVisible] = useState(false);
  const [selectUser, setSelectUser] = useState<UserProps | null>();
  const [userList, setUserList] = useState([]);
  const [searchTerms, setSearchTerms] = useState<string>('');
  const debounceValue = useDebounce(searchTerms, 1000);
  const { teamDetails, setTeamDetails } = useTeamContext();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') as string) || {};
    setUser(storedUser);
  }, []);

  // console.log('teamDetails', teamDetails);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const searchUsers = async (debounceValue: string) => {
    try {
      const response = await searchUserByEmail(
        debounceValue,
        user.access_token,
      );
      // console.log(response?.data?.data, 'response');
      setUserList(response?.data?.data.filter((us: any) => us.id !== user.id));
    } catch (error: any) {
      console.log(error, 'Error User');
    }
  };

  useEffect(() => {
    searchUsers(debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  const handleOk = async () => {
    try {
      const response = await inviteMemberAPI(
        selectUser?.email,
        teamDetails?.id,
        user.access_token,
      );
      console.log('Check res invite member', response);

      if (response?.status === 200 || response?.status === 201) {
        setIsModalOpen(false);
        toast.success(`${response?.data}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.error(`${response?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  return (
    <div className="w-full">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF8243',
          },
        }}
      >
        <Modal
          title="Invite Team Member"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          styles={{
            body: {
              height: '400px', // Set fixed height
              overflowY: 'auto', // Enable scrolling if content overflows
            },
          }}
          okButtonProps={{
            style: {
              background: '#74ba74',
              fontFamily: 'inherit',
              fontWeight: '600',
            },
          }}
          okText="Invite"
        >
          {selectUser ? (
            <div className="w-full h-max flex justify-center items-center border rounded-[5px] p-3 bg-green-400">
              <MemberSearchTeamCard
                choosen={true}
                user={selectUser}
                setSelectUser={setSelectUser}
                selectUser={selectUser}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-4">
              <HeadlessTippy
                interactive
                placement="bottom"
                visible={tippyVisible && userList ? userList.length > 0 : false}
                onClickOutside={() => setTippyVisible(false)}
                render={(attrs) => (
                  <div
                    tabIndex={-1}
                    {...attrs}
                    className="border w-full h-[300px] bg-white rounded-[10px] flex flex-col items-center gap-4 py-5 px-2 overflow-auto"
                  >
                    {userList &&
                      userList?.map((us: any, index) => (
                        <div key={us?.id} className="w-full">
                          <MemberSearchTeamCard
                            user={us}
                            selectUser={selectUser}
                            setSelectUser={setSelectUser}
                          />
                        </div>
                      ))}
                  </div>
                )}
              >
                <input
                  placeholder="Invite Team Member"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded hover:border-primaryColor focus:outline-0 focus:outline-offset-0 focus:border-primaryColor"
                  onFocus={() => {
                    setTippyVisible(true);
                  }}
                  onChange={(e) => setSearchTerms(e.target.value)}
                />
              </HeadlessTippy>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default InviteMemberTeamModal;
