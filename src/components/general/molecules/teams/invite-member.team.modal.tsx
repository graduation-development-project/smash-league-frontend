import { SearchOutlined } from '@ant-design/icons';
import { Modal, ConfigProvider, Form } from 'antd';
import React, { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import MemberSearchTeamCard from '../../atoms/teams/member-search.teams.card';

const InviteMemberTeamModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [tippyVisible, setTippyVisible] = useState(false);
  const [selectUser, setSelectUser] = useState();
  const user = {
    teamId: '1e56a8fc-84db-423c-bd4e-e16d72d828b3',
    email: 'sonvntse172952@fpt.edu.vn',
    name: 'Noo Đông Trung Thái'
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          bodyStyle={{
            height: '400px', // Set fixed height
            overflowY: 'auto', // Enable scrolling if content overflows
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
                user={user}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-4">
              <HeadlessTippy
                interactive
                placement="bottom"
                visible={tippyVisible}
                onClickOutside={() => setTippyVisible(false)}
                render={(attrs) => (
                  <div
                    tabIndex={-1}
                    {...attrs}
                    className="border w-full h-[300px] bg-white rounded-[10px] flex flex-col justify-center items-center gap-4 py-5 px-2 overflow-auto"
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="w-full">
                        <MemberSearchTeamCard
                          user={user}
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
                  onFocus={() => setTippyVisible(true)}
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
