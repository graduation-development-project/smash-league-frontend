'use client';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { getAllPackagesAPI, inactivePackageAPI } from '@/services/package';
import { toast } from 'react-toastify';
import { AnyARecord } from 'node:dns';
import UpdatePackageModal from './update-package.modal';
import { ConsoleSqlOutlined } from '@ant-design/icons';
const ManagePackageTable = () => {
  interface DataType {
    id: string;
    packageName: string;
    packageDetail: string;
    currentDiscountByAmount: number;
    price: number;
    credits: number;
    advantages: string[];
    isRecommended: boolean;
    isAvailable: boolean;
  }

  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageId, setPackageId] = useState('');

  const getAllPackages = async () => {
    setIsLoading(true);
    const response = await getAllPackagesAPI();
    console.log('check', response?.data);
    setPackages(response?.data);
    setIsLoading(false);
    if (response.statusCode === 200 || response.statusCode === 201) {
      setIsLoading(false);
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
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  const handleInactivePackage = async (packageId: string) => {
    try {
      setIsLoading(true);
      const response = await inactivePackageAPI(packageId);
      console.log('response', response);
      if (response?.status === 200 || response?.status === 201) {
        setIsModalOpen(false);
        setIsLoading(false);
        getAllPackages();
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
        setIsModalOpen(false);
        setIsLoading(false);
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
    } catch (error) {
      console.log('error', error);
    }
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Package Name',
      dataIndex: 'packageName',
      key: 'packageName',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Details',
      dataIndex: 'packageDetail',
      key: 'packageDetail',
    },

    {
      title: 'Advantages',
      dataIndex: 'advantages',
      key: 'advantages',
      render: (_, { advantages }) => (
        <>
          <ul className="flex flex-col gap-3 list-disc">
            {advantages.map((ad: any, index) => {
              return (
                <li key={index}>
                  <span>{ad}</span>
                </li>
              );
            })}
          </ul>
        </>
      ),
    },
    {
      title: 'Discount',
      dataIndex: 'currentDiscountByAmount',
      key: 'currentDiscountByAmount',
      align: 'right',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
    },

    {
      title: 'Credits',
      dataIndex: 'credits',
      key: 'credits',
      align: 'right',
    },
    {
      title: 'Recommended',
      key: 'isRecommended',
      dataIndex: 'isRecommended',
      align: 'center',
      render: (_, { isRecommended }) => (
        <>
          {isRecommended ? (
            <Tag
              style={{ padding: '5px 5px', fontSize: '12px' }}
              color="volcano"
            >
              Recommended
            </Tag>
          ) : (
            <Tag style={{ padding: '5px 5px', fontSize: '12px' }} color="blue">
              Normal
            </Tag>
          )}
        </>
      ),
    },

    {
      title: 'Available',
      key: 'isAvailable',
      dataIndex: 'isAvailable',
      align: 'center',
      render: (_, { isAvailable }) => (
        <>
          {isAvailable ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Inactive</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { id }) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setPackageId(id);
              console.log('packageId', packageId);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleInactivePackage(id)}>Inative</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={packages}
        loading={isLoading}
      />

      <UpdatePackageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        packageId={packageId}
        getAllPackages={getAllPackages}
      />
    </div>
  );
};

export default ManagePackageTable;
