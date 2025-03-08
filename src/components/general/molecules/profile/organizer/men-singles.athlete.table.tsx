import React, { useRef, useState } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Space,
  Table,
  Tag,
  Image,
  Popconfirm,
} from "antd";
import type { TableProps } from "antd";
import { createStyles } from "antd-style";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button as CustomButton } from "@/components/ui/button";

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

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  image: string;
  tournaments: string[];
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    name: "Vo Nguyen Trung Son",
    age: 32,
    image:
      "https://extranet.bwf.sport/docs/players/25831/gallery/20210729_1714_OlympicGames2020_BPST05206.jpg",
    tournaments: ["2020 Olympics", "2021 Olympics", "2022 Olympics"],
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Ho Duong Trung Nguyen",
    age: 42,
    image:
      "https://extranet.bwf.sport/docs/players/25831/gallery/20210729_1714_OlympicGames2020_BPST05206.jpg",
    tournaments: ["2020 Olympics", "2021 Olympics", "2022 Olympics"],
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Pham Vinh Son",
    age: 32,
    image:
      "https://extranet.bwf.sport/docs/players/25831/gallery/20210729_1714_OlympicGames2020_BPST05206.jpg",
    tournaments: ["2020 Olympics", "2021 Olympics", "2022 Olympics"],
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const MenSinglesAthleteTable = () => {
  const { styles } = useStyle();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleReset = (clearFilters?: () => void) => {
    clearFilters?.();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: string
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{ padding: 8, fontFamily: "inherit" }}
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
          style={{ marginBottom: 8, display: "block", width: "100%" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, fontFamily: "inherit" }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90, color: "#2c2c2c", fontFamily: "inherit" }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            style={{ color: "#2c2c2c", fontFamily: "inherit" }}
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
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#FF8243 " : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text?.toString() || ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      fixed: "left",
      width: 150,
      render: (image) => (
        <Image
          style={{
            borderRadius: "50%",
            border: "1px solid #FF8243",
            padding: "2px",
          }}
          src={image}
          width={100}
          height={100}
          alt="Athlete Image"
        />
      ),
    },

    {
      title: "Full Name",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      ...getColumnSearchProps("name"),
      render: (text) => <h1 className="font-semibold text-[16px]">{text}</h1>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: "Tournaments",
      dataIndex: "tournaments",
      key: "tournaments",
      width: 200,
      fixed: "left",
      render: (_, { tournaments }) =>
        tournaments.map((tournament, index) => <p key={index}>{tournament}</p>),
    },
    {
      title: "Actions",
      key: "action",
      align:"center",
      render: () => (
        <div className="flex gap-5">
          <button className="w-max p-0 font-quicksand border-none outline-none bg-transparent text-secondColor font-semibold hover:bg-transparent hover:underline">
            Edit
          </button>
          <Popconfirm title="Are you sure?">
            <button className="w-max p-0 font-quicksand border-none outline-none bg-transparent text-primaryColor font-semibold hover:bg-transparent hover:underline">
              Delete
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h1 className="text-[32px] font-bold">Men&apos;s Singles Athlete List</h1>
      <div className="w-full h-full p-5 rounded-[10px] border border-solid border-gray-200">
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: "#FF8243",
            },
          }}
        >
          <Table<DataType>
            className={styles.customTable}
            columns={columns}
            dataSource={data}
            style={{
              width: "100%",
              height: "100%",
              fontFamily: "inherit",
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default MenSinglesAthleteTable;
