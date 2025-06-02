'use client';

import { useTourContext } from '@/context/tour.context';
import { getAllTransactionsAPI } from '@/services/payment';
import { getAllUsersAPI } from '@/services/user';
import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';

const AdminCard = () => {
  const { getTours, tourList } = useTourContext();
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    const response = await getAllUsersAPI(user?.access_token);
    if (
      response?.data?.statusCode === 200 ||
      response?.data?.statusCode === 201
    ) {
      setUsersList(response?.data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const getAllTransactions = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await getAllTransactionsAPI(user?.access_token);
      console.log(response?.data, 'check');
      if (response?.statusCode === 200 || response.statusCode === 201) {
        setTransactionList(response?.data);
        setIsLoading(false);
      } else {
        setTransactionList([]);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log('Error', error);
    }
  };
  useEffect(() => {
    getTours(1, 100, '');
    getAllUsers();
    getAllTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Row gutter={16} style={{ fontFamily: 'inherit' }}>
      <Col span={8}>
        <Card title="Number Of Users">
          <span className="font-semibold text-2xl">{usersList.length}</span>{' '}
          <span className="text-sm">Users</span>{' '}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Number Of Tournaments">
          <span className="font-semibold text-2xl">{tourList.length}</span>{' '}
          <span className="text-sm">Tournaments</span>{' '}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Number Of Transactions">
          {' '}
          <span className="font-semibold text-2xl">
            {transactionList.length}
          </span>{' '}
          <span className="text-sm">Transactions</span>{' '}
        </Card>
      </Col>
    </Row>
  );
};

export default AdminCard;
