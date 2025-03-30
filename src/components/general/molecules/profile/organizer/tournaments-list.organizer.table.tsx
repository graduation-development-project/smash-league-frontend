"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, ConfigProvider, Input, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

import { createStyles } from "antd-style";

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
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const dataSource: DataType[] = [
  {
    key: 1,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 2,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 3,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 4,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },

  {
    key: 5,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 6,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 7,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 8,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 9,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 10,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 11,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 12,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 13,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 14,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 15,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 16,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 17,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 18,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 19,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 20,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 21,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 22,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 23,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 24,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 25,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 26,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 27,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 28,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 29,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 30,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 31,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 32,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 33,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 34,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 35,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 36,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 37,
    name: `Vo Nguyen Trung Son`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 38,
    name: `Tran Anh Minh`,
    age: 18,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 39,
    name: `Ho Duong Trung Nguyen`,
    age: 32,
    address: `London, Park Lane no. 123`,
  },
  {
    key: 40,
    name: `Pham Vinh Son`,
    age: 22,
    address: `London, Park Lane no. 123`,
  },
];

const TournamentsListTable = () => {
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#FF8243 " : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text?.toString() || ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Full Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      width: 40,
      align: "center",
      dataIndex: "age",
      key: "age",
      fixed: "left",
      ...getColumnSearchProps("age"),
    },
    ...Array.from({ length: 20 }).map((_, index) => ({
      title: `Column ${index + 1}`,
      dataIndex: "address",
      key: `${index + 1}`,
      width: 150,
    })),
    {
      title: "Actions",
      align: "center",
      key: "operation",
      fixed: "right",
      width: 50,
      render: () => (
        <div className="flex gap-5 p-3">
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
      <h1 className="text-[32px] font-bold">Tournaments List</h1>
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
            dataSource={dataSource}
            scroll={{ x: "max-content", y: 500 }}
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "inherit",
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default TournamentsListTable;
