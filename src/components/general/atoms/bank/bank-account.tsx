/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import {
  EyeIcon,
  SlashIcon as EyeSlashIcon,
  CheckCircleIcon,
  PlusCircleIcon,
} from 'lucide-react';
import { useProfileContext } from '@/context/profile.context';

// Sample bank data with logos
// const bankLogos: Record<string, string> = {
//   Vietcombank: "/bank-logos/vietcombank.png",
//   BIDV: "/bank-logos/bidv.png",
//   Techcombank: "/bank-logos/techcombank.png",
//   TPBank: "/bank-logos/tpbank.png",
//   "MB Bank": "/bank-logos/mbbank.png",
//   ACB: "/bank-logos/acb.png",
// }

// Sample bank accounts data
const sampleAccounts = [
  {
    id: 'acc-001',
    accountNumber: '1234567890123',
    ownerName: 'Nguyen Van A',
    bankName: 'Vietcombank',
    isPrimary: true,
    isVerified: true,
  },
];

interface BankAccountProps {
  accountNumber: string;
  // ownerName: string
  logo: string;
  bankName: string;
  isPrimary?: boolean;
  isVerified?: boolean;
}

const BankAccount = ({
  accountNumber,
  // ownerName,
  logo,
  bankName,
  isPrimary = false,
  isVerified = false,
}: BankAccountProps) => {
  const [isHidden, setIsHidden] = useState(true);

  // Mask account number for security
  const maskedAccountNumber = isHidden
    ? `${accountNumber.substring(0, 2)}${'•'.repeat(
        Math.max(accountNumber.length - 4, 0),
      )}${accountNumber.substring(accountNumber.length - 2)}`
    : accountNumber;

  // Get bank logo or use a default
  // const bankLogo = bankLogos[bankName] || "/bank-logos/default-bank.png"

  return (
    <div
      className={`relative rounded-lg border ${
        isPrimary ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
      } p-4 shadow-sm transition-all hover:shadow-md`}
    >
      {isPrimary && (
        <div className="absolute -top-2 -right-2">
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            <CheckCircleIcon className="mr-1 h-3 w-3" />
            Primary
          </span>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200 bg-white p-1">
            <img
              src={logo}
              alt={`${bankName} logo`}
              className="h-full w-full object-contain"
              // onError={(e) => {
              //   // Fallback if image fails to load
              //   ;(e.target as HTMLImageElement).src = "/bank-logos/default-bank.png"
              // }}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{bankName}</h3>
            <p className="text-sm text-gray-500">
              {isVerified ? (
                <span className="inline-flex items-center text-green-600">
                  <CheckCircleIcon className="mr-1 h-3 w-3" />
                  Verified
                </span>
              ) : (
                <span className="text-amber-600">Pending verification</span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsHidden(!isHidden)}
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label={isHidden ? 'Show account number' : 'Hide account number'}
        >
          {isHidden ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeSlashIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <p className="text-xs font-medium text-gray-500">ACCOUNT NUMBER</p>
          <p className="font-mono text-base font-medium tracking-wider text-gray-900">
            {maskedAccountNumber}
          </p>
        </div>

        {/* <div>
          <p className="text-xs font-medium text-gray-500">ACCOUNT HOLDER</p>
          <p className="text-base font-medium text-gray-900">{ownerName}</p>
        </div> */}
      </div>
    </div>
  );
};

export default function BankAccountShow() {
  const [user, setUser] = useState<any>({});
  const { activeKey } = useProfileContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [activeKey]);

  const account = user?.UserBankAccount ? user.UserBankAccount[0] : {};
  const bank = account?.bank;

  console.log('Check account', account);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Bank Accounts</h2>
        <p className="text-gray-600">
          Manage your connected bank accounts for payments and withdrawals
        </p>
      </div>

      <div className="space-y-4">
        {account ? (
          <BankAccount
            key={account.id}
            accountNumber={account.accountNumber || 'N/A'}
            logo={bank?.logo || ''}
            bankName={bank?.name || 'Unknown Bank'}
            isPrimary={true}
            isVerified={true}
          />
        ) : (
          <p className="text-gray-500">No bank account found.</p>
        )}
      </div>
    </div>
  );
}
