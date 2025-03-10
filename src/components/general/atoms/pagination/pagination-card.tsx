import React from 'react';
import { ConfigProvider, Pagination } from 'antd';

const PaginationCard = ({
  total,
  currentPage,
  totalPerPage,
  onChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center bg-white w-max py-3 px-6 shadow-shadowBtn rounded-[10px]">
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
            colorPrimary: '#FF8243',
            colorPrimaryBorder: '#FF8243',
            colorPrimaryHover: '#FF8243',
            fontWeightStrong: 700,
          },
        }}
      >
        <Pagination
          style={{ fontWeight: 600 }}
          size="default"
          total={total}
          showTotal={(total) => `Total ${total} items`}
          pageSize={totalPerPage}
          current={currentPage}
          onChange={(page) => {
            console.log('checkpage', page);
            onChange(page);
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default PaginationCard;
