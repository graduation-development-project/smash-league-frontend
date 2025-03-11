import {
  DownOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Dropdown,
  MenuProps,
  message,
  Space,
} from 'antd';
import Input from 'antd/es/input/Input';
import { CirclePlus, CircleX } from 'lucide-react';
import { IoSearch } from 'react-icons/io5';
import { TbLoader2 } from 'react-icons/tb';
import React from 'react';

const SearchTeamBar = ({
  searchTerms,
  setSearchTerms,
  isLoading,
}: {
  searchTerms: string;
  setSearchTerms: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Check values', e.target);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      label: <p className="text-[16px] font-semibold">All Teams</p>,
      key: '1',
      icon: <TeamOutlined style={{ fontSize: 15 }} />,
    },
    {
      label: <p className="text-[16px] font-semibold">Open</p>,
      key: '2',
      icon: <CirclePlus size={15} />,
    },
    {
      label: <p className=" text-[16px] font-semibold">Full</p>,
      key: '3',
      icon: <CircleX size={15} />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="w-[90%] flex items-center justify-between gap-10 shadow-shadowBtn bg-white rounded-[15px] p-4 ">
      <div className="w-[85%] flex flex-col gap-4 ">
        <h2 className="text-[16px] font-bold">Search Teams</h2>
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
            placeholder="Find a Team name here..."
            onChange={(e) => {
              setSearchTerms(e.target.value);
            }}
            suffix={
              isLoading ? (
                <TbLoader2 className="animate-spin" size={20} />
              ) : (
                <IoSearch size={20} className={searchTerms ? 'text-primaryColor' : 'text-gray-400'} />
              )
            }
          />
        </ConfigProvider>
      </div>
      <div className="w-[15%] flex flex-col gap-4 ">
        <h2 className="text-[16px] font-bold">Filter By Status</h2>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                /* here is your component tokens */
                defaultActiveBorderColor: '#FF8243',
                defaultActiveColor: '#FF8243',
                defaultHoverBorderColor: '#FF8243',
                defaultHoverColor: '#FF8243',
              },
            },
          }}
        >
          <Dropdown menu={menuProps}>
            <Button
              size="large"
              style={{
                width: 'max-content',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* <Space> */}
              --- Choose Status ---
              <DownOutlined />
              {/* </Space> */}
            </Button>
          </Dropdown>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SearchTeamBar;
