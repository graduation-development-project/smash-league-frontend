import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout';
import TransactionHistoryPage from '@/components/pages/transaction/transaction-history.page';
import React from 'react';

const Transaction = async () => {
  const session = await auth();
  return (
    <MainLayout noHero={true} session={session}>
      <TransactionHistoryPage />
    </MainLayout>
  );
};

export default Transaction;
