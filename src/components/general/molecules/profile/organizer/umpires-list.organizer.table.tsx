import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  ConfigProvider,
  Input,
  Space,
  Table,
  Tag,
  Image,
  Popconfirm,
  Select,
} from 'antd';
import type { TableProps } from 'antd';
import { createStyles } from 'antd-style';
import Highlighter from 'react-highlight-words';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import {
  banAthleteAPI,
  getTournamentEventParticipantsAPI,
  getTournamentUmpiresParticipantsAPI,
} from '@/services/tournament';
import {
  getTournamentRegistrationAPI,
  getUmpireRegistrationAPI,
  responseTournamentRegistrationAPI,
} from '@/services/tour-registration';
import { toast } from 'react-toastify';
import { calculateAge } from '@/utils/calculateAge';
import { useProfileContext } from '@/context/profile.context';
import { useRouter } from 'next/navigation';

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
      padding: 20px 16px !important; /* Adjusted padding */
    }
  `,
}));

const UmpiresListTable = ({
  tourId,
  tournamentId,
}: {
  tourId: string | null;
  isVerification?: boolean;
  tournamentId: string | null;
}) => {
  // const { styles } = useStyle();

  interface ParticipantInfo {
    avatarURL: string;
    dateOfBirth: Date;
    email: string;
    gender: string;
    hands: string;
    height: number;
    id: string;
    name: string;
    phoneNumber: string;
  }

  interface BaseDataType {
    id: string;
    user: ParticipantInfo;
    partner: ParticipantInfo | null;
  }

  interface VerificationDataType {
    id: string;
    userId: string;
    name: string;
    registrationDocumentCreator: string[];
    isPayForTheRegistrationFee: boolean;
    status: string;
  }

  type DataType<T extends boolean> = T extends true
    ? VerificationDataType
    : BaseDataType;

  // console.log(eventId);

  // console.log('check', isVerification);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [user, setUser] = useState<any>(null);
  const [isVerification, setIsVerification] = useState('verify');

  const [participantList, setParticipantList] = useState([]);
  const [verificationList, setVetificationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUmpireId } = useProfileContext();
  const router = useRouter();

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []); // Run only once on mount

  const getTournamentUmpiresParticipants = async () => {
    setIsLoading(true);
    const res = await getTournamentUmpiresParticipantsAPI(
      user?.access_token,
      tourId,
    );

    // console.log(res?.data.data, 'check umpires');
    if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
      // Transform data into correct format
      const formatData = res.data.data.map((participant: any) => ({
        user: participant.user,
        partner: null,
      }));

      setParticipantList(formatData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setParticipantList([]);
    }
  };

  const getTournamentRegistration = async () => {
    if (!user) return;
    try {
      // console.log('API RUN');
      setIsLoading(true);
      const response = await getUmpireRegistrationAPI(
        user?.access_token,
        tourId,
      );
      // console.log(response?.data, 'check');

      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        const formatData = response.data.data.map((regis: any) => ({
          id: regis.id,
          userId: regis.userId,
          name: regis.user.name,
          registrationDocumentCreator: regis.registrationDocumentCreator,
          isPayForTheRegistrationFee: regis.isPayForTheRegistrationFee,
          status: regis.status,
        }));

        setVetificationList(formatData);
        setIsLoading(false);
      } else {
        setVetificationList([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getTournamentRegistration();
    getTournamentUmpiresParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId, user]);

  // console.log('check registration', participantList);

  const handleReset = (clearFilters?: () => void) => {
    clearFilters?.();
    setSearchText('');
  };

  const handleChange = (value: string) => {
    // console.log('check', value);
    setIsVerification(value);
  };

  const handleVerify = async (id: string, option: boolean, reason: string) => {
    if (!user?.access_token) return;
    try {
      const response = await responseTournamentRegistrationAPI(
        user?.access_token,
        id,
        option,
        reason,
      );
      if (response?.status === 200 || response?.status === 201) {
        getTournamentRegistration();
        getTournamentUmpiresParticipants();
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

  const handleBan = async (
    tournamentId: string | null,
    participantId: string,
  ) => {
    try {
      const response = await banAthleteAPI(
        tournamentId,
        participantId,
        '',
        user?.access_token,
      );
      console.log('Check response', response.data);
      if (
        response?.data.statusCode === 200 ||
        response?.data?.statusCode === 201 ||
        response?.data?.statusCode === 204
      ) {
        getTournamentUmpiresParticipants();
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
        toast.error(`${response?.data?.message}`, {
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
      console.log('Check error', error);
    }
  };

  const getColumnSearchProps = (
    dataIndex: string,
  ): TableColumnType<BaseDataType> => ({
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
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#FF8243 ' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    render: (text: any) =>
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

  const columns: TableProps<BaseDataType>['columns'] = [
    {
      title: '',
      dataIndex: ['user'],
      key: 'image',
      fixed: 'left',
      width: 150,
      render: (_, { user }) => (
        <Image
          style={{
            borderRadius: '50%',
            border: '1px solid #FF8243',
            padding: '2px',
          }}
          src={
            user?.avatarURL
              ? user?.avatarURL
              : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
          }
          width={100}
          height={100}
          alt="Umpire Image"
        />
      ),
    },

    {
      title: 'Full Name',
      width: 250,
      dataIndex: ['user'],
      key: 'name',
      fixed: 'left',
      // ...getColumnSearchProps('name'),
      render: (_, { user }) => (
        <h1
          className="font-semibold text-[16px] hover:underline cursor-pointer"
          onClick={() => {
            localStorage.setItem('umpireId', user?.id as string);
            setUmpireId(user?.id as string);
            router.push(`/profile/umpire/${user?.name.toLowerCase()}`);
          }}
        >
          {user?.name}
        </h1>
      ),
    },
    {
      title: 'Age',
      dataIndex: ['user'],
      align: 'center',
      key: 'age',
      width: 100,
      // ...getColumnSearchProps('age'),
      render: (_, { user }) => (
        <h1 className="font-semibold text-[16px]">
          {calculateAge(user?.dateOfBirth)}
        </h1>
      ),
    },
    {
      title: 'Email',
      dataIndex: ['user'],
      key: 'email',
      align: 'center',
      width: 100,
      // ...getColumnSearchProps('phoneNumber'),
      render: (_, { user }) => (
        <h1 className="font-semibold text-[16px]">{user?.email}</h1>
      ),
    },

    {
      title: 'Hand',
      dataIndex: ['user'],
      key: 'hand',
      align: 'center',
      width: 100,
      // ...getColumnSearchProps('phoneNumber'),
      render: (_, { user }) => (
        <h1 className="font-semibold text-[16px]">
          {user?.hands ? user?.hands : 'No Infomation'}
        </h1>
      ),
    },

    {
      title: 'Actions',
      align: 'center',
      dataIndex: ['id', 'status'],
      key: 'operation',
      fixed: 'left',
      width: 80,
      render: (_, { user, partner, id }) => {
        return (
          <Button
            variant="outlined"
            danger
            onClick={() => handleBan(tournamentId, id)}
          >
            Ban
          </Button>
        );
      },
    },
  ];
  const columnsVerification: TableProps<VerificationDataType>['columns'] = [
    {
      title: 'Full Name',
      width: 200,
      dataIndex: 'name', // Dùng key đã map sẵn
      key: 'name',
      fixed: 'left',

      render: (_, { name, userId }) => (
        <h1
          className="font-semibold text-[16px] hover:underline cursor-pointer"
          onClick={() => {
            localStorage.setItem('umpireId', userId);
            setUmpireId(userId);
            router.push(`/profile/umpire/${name.toLowerCase()}`);
          }}
        >
          {name}
        </h1>
      ),
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Front ID Card',
      dataIndex: 'registrationDocumentCreator',
      key: 'registrationDocumentCreator',
      width: 200,
      fixed: 'left',
      render: (_, record) => {
        const verificationRecord = record as VerificationDataType;
        // console.log('Check record', verificationRecord);
        return (
          <Image
            src={
              verificationRecord?.registrationDocumentCreator[0]
                ? verificationRecord?.registrationDocumentCreator[0]
                : ''
            }
            alt="Front ID Card"
            width={200}
            height={120}
            style={{ objectFit: 'cover' }}
          />
        );
      },
    },

    {
      title: 'Back ID Card',
      dataIndex: 'registrationDocumentCreator',
      key: 'registrationDocumentCreator1',
      width: 200,
      fixed: 'left',
      render: (_, record) => {
        // console.log('check record', record);
        const verificationRecord = record as VerificationDataType;

        return (
          <Image
            src={
              verificationRecord?.registrationDocumentCreator[1]
                ? verificationRecord?.registrationDocumentCreator[1]
                : ''
            }
            alt="Back ID Card"
            width={200}
            height={120}
            style={{ objectFit: 'cover' }}
          />
        );
      },
    },
    {
      title: 'ID Photo',
      dataIndex: 'registrationDocumentCreator',
      key: 'registrationDocumentCreator2',
      width: 200,
      fixed: 'left',
      render: (_, record) => {
        const verificationRecord = record as VerificationDataType;
        return (
          <Image
            src={
              verificationRecord?.registrationDocumentCreator[2]
                ? verificationRecord?.registrationDocumentCreator[2]
                : ''
            }
            alt="ID Photo"
            width={150}
            height={150}
            style={{ objectFit: 'cover' }}
          />
        );
      },
    },

    {
      title: 'Actions',
      align: 'center',
      dataIndex: ['id', 'status'],
      key: 'operation',
      fixed: 'left',
      width: 80,
      render: (_, record) => {
        const verificationRecord = record as VerificationDataType;
        return (
          <div className="flex gap-2 p-1 justify-center items-center">
            {verificationRecord?.status === 'PENDING' ? (
              <>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => {
                    // console.log(id);
                    handleVerify(verificationRecord?.id, true, '');
                  }}
                >
                  Accept
                </Button>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    handleVerify(verificationRecord?.id, false, 'Khong thich');
                  }}
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    Reject
                  </Button>
                </Popconfirm>
              </>
            ) : verificationRecord.status === 'APPROVED' ? (
              <>
                <Tag
                  style={{
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    padding: '8px',
                  }}
                  color="green"
                >
                  Approved
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
        );
      },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full h-max flex justify-between">
        <h1 className="text-[32px] font-bold">
          {isVerification === 'verify'
            ? 'Umpires Verification List'
            : 'Umpires Participant List'}
        </h1>

        <Select
          defaultValue={'verify'}
          style={{ width: 120, fontFamily: 'inherit', marginTop: '10px' }}
          onChange={handleChange}
          options={[
            { value: 'verify', label: 'Verifications' },
            { value: 'participant', label: 'Participants' },
            // { value: 'assign', label: 'Assign' },
          ]}
        />
      </div>

      <div className="w-full h-full rounded-[10px] border border-solid border-gray-200">
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: '#FF8243',
              fontFamily: 'inherit',
            },
          }}
        >
          {isVerification === 'verify' ? (
            <Table<VerificationDataType>
              // className={styles.customTable}
              columns={columnsVerification}
              dataSource={verificationList}
              loading={isLoading}
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'inherit',
              }}
            />
          ) : (
            <Table<BaseDataType>
              // className={styles.customTable}
              columns={columns}
              dataSource={participantList}
              loading={isLoading}
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'inherit',
              }}
            />
          )}
        </ConfigProvider>
      </div>
    </div>
  );
};

export default UmpiresListTable;
