'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import {
  Button,
  ConfigProvider,
  Image,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

import { createStyles } from 'antd-style';
import {
  getAllVerificationsAPI,
  verifyInformationAPI,
} from '@/services/verification';
import { useProfileContext } from '@/context/profile.context';
import { toast } from 'react-toastify';

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table-container {
      .ant-table-body,
      .ant-table-content {
        scrollbar-width: thin;
        scrollbar-color: #eaeaea transparent;
        scrollbar-gutter: stable;
      }
    }

    .ant-table-tbody > tr > td {
      padding: 5px 16px !important;
      padding-bottom: 30px !important;
    }
  `,
}));

interface DataType {
  IDCardBack: string;
  IDCardFront: string;
  cardPhoto: string;
  createdAt: string;
  id: string;
  status: string;
  role: string;
  userName: string;
  userId: string;
}

const UmpiresVerifyTable = () => {
  const { styles } = useStyle();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState('PENDING');
  const [filterVerifications, setFilterVerifications] = useState<DataType[]>(
    [],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const [verifications, setVerifications] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Gọi API để lấy danh sách xác minh
  const getAllVerifications = async () => {
    if (!user?.access_token) return;
    setIsLoading(true);
    try {
      const response = await getAllVerificationsAPI(user?.access_token);
      setVerifications(
        response?.data?.data
          .filter((veri: any) => veri.role === 'Umpire')
          .map((veri: any) => ({
            ...veri,
            userName: veri.user?.name || 'N/A', // Thêm key userName để tránh lỗi undefined
          })),
      );
      setFilterVerifications(
        response?.data?.data
          .filter((veri: any) => veri.role === 'Umpire')
          .map((veri: any) => ({
            ...veri,
            userName: veri.user?.name || 'N/A', // Thêm key userName để tránh lỗi undefined
          })),
      );
    } catch (error) {
      toast.error('Failed to fetch verifications.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi API sau khi user đã được cập nhật
  useEffect(() => {
    if (user) getAllVerifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // console.log('Check verifications', verifications);

  const handleChange = (value: string) => {
    if (value === 'ALL') {
      console.log('Check', verifications);
      setFilterVerifications(verifications);
      return;
    }

    setFilterVerifications(
      verifications.filter((veri: any) => veri?.status === value),
    );
  };

  // console.log('Check ', verifications);

  const handleVerify = async (id: string, option: boolean, reason: string) => {
    if (!user?.access_token) return;
    try {
      const response = await verifyInformationAPI(
        id,
        option,
        reason,
        user?.access_token,
      );
      console.log('Check response', response);
      if (response?.status === 200 || response?.status === 201) {
        setIsLoading(false);
        toast.success(`${response?.data?.message}`, {
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
        setIsLoading(false);
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
      console.log(error);
    }
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleReset = (clearFilters?: () => void) => {
    clearFilters?.();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: string,
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{ padding: 8, fontFamily: 'inherit' }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block', width: '100%' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, fontFamily: 'inherit' }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90, color: '#2c2c2c', fontFamily: 'inherit' }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            style={{ color: '#2c2c2c', fontFamily: 'inherit' }}
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex as string);
            }}
          >
            Choose All
          </Button>
          {/* <Button type="link" size="small" onClick={close} style={{ color: "#2c2c2c" }}>
              Close
            </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#FF8243 ' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text?.toString() || ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Full Name',
      width: 200,
      dataIndex: 'userName', // Dùng key đã map sẵn
      key: 'userName',
      fixed: 'left',
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Front ID Card',
      dataIndex: 'IDCardFront',
      key: 'IDCardFront',
      width: 200,
      fixed: 'left',
      render: (_, { IDCardFront }) => (
        <Image
          src={IDCardFront}
          alt="Front ID Card"
          width={200}
          height={120}
          style={{ objectFit: 'cover' }}
        />
      ),
    },

    {
      title: 'Back ID Card',
      dataIndex: 'IDCardBack',
      key: 'IDCardBack',
      width: 200,
      fixed: 'left',
      render: (_, { IDCardBack }) => (
        <Image
          src={IDCardBack}
          alt="Back ID Card"
          width={200}
          height={120}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'ID Photo',
      dataIndex: 'cardPhoto',
      key: 'cardPhoto',
      width: 200,
      fixed: 'left',
      render: (_, { cardPhoto }) => (
        <Image
          src={cardPhoto}
          alt="ID Photo"
          width={150}
          height={150}
          style={{ objectFit: 'cover' }}
        />
      ),
    },

    {
      title: 'Actions',
      align: 'center',
      dataIndex: ['id', 'status'],
      key: 'operation',
      fixed: 'left',
      width: 80,
      render: (_, { id, status }) => (
        <div className="flex gap-2 p-1 justify-center items-center">
          {status === 'PENDING' ? (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => {
                  console.log(id);
                  handleVerify(id, true, '');
                }}
              >
                Accept
              </Button>
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => {
                  handleVerify(id, false, 'Khong thich');
                }}
              >
                <Button type="link" danger icon={<DeleteOutlined />}>
                  Reject
                </Button>
              </Popconfirm>
            </>
          ) : status === 'ACCEPTED' ? (
            <>
              <Tag
                style={{
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  padding: '8px',
                }}
                color="green"
              >
                Accepted
              </Tag>
            </>
          ) : (
            <>
              <Tag
                style={{
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  padding: '8px',
                }}
                color="red"
              >
                Rejected
              </Tag>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[32px] font-bold">Umpires Verification</h1>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'ALL', label: 'All' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'ACCEPTED', label: 'Accepted' },
            { value: 'REJECTED', label: 'Rejected' },
          ]}
        />
      </div>
      <div className="w-full h-full p-5 rounded-[10px] border border-solid border-gray-200">
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: '#FF8243',
            },
          }}
        >
          <Table<DataType>
            // className={styles.customTable}
            columns={columns}
            dataSource={filterVerifications}
            // scroll={{
            //   x: verifications.length > 0 ? 'max-content' : 500,
            //   y: 500,
            // }}
            locale={{ emptyText: 'No verifications' }}
            loading={isLoading}
            style={{
              fontFamily: 'inherit',
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default UmpiresVerifyTable;
