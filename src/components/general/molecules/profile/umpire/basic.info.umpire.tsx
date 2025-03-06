'use client';
import InfoBox from '@/components/general/atoms/profile/athlete/info.box';
import InfoLine from '@/components/general/atoms/profile/athlete/info.line';
import { Divider } from 'antd';
import React, { useState } from 'react';
import CertificateImageShowModal from './certificate.image.show.modal';

const UmpireBasicInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const certificates = [
    'The Certificate of Umpire From The Badminton Association Of Vietnam',
    'The Certificate of Umpire From The International Badminton Federation',
    'The Certificate of Umpire From The Asian Badminton Confederation',
    'Advanced Umpire Certification From National Sports Academy',
    'World Badminton Umpire Accreditation',
  ];

  // Show only 3 certificates unless "View More" is clicked
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, 3);

  return (
    <div className="w-full h-full flex flex-col gap-4 rounded-[10px] shadow-shadowBtn p-6">
      <h2 className="text-[32px] font-bold text-primaryColor underline w-full h-full">
        BASIC INFO
      </h2>
      <div className="w-full h-full flex justify-between">
        <div className="w-full h-full flex flex-col gap-3">
          {/* Info Boxes */}
          <div className="w-full h-full flex gap-2">
            <InfoBox title="AGE" info="24" />
            <InfoBox title="HEIGHT(cm)" info="160" />
            <InfoBox title="EXPERIENCE YEARS" info="20" />
          </div>
          <div className="w-full h-full flex gap-2 justify-center">
            <InfoBox title="LOCATION" info="Thu Duc, Ho Chi Minh" />
            <InfoBox title="LANGUAGE" info="Vietnamese/Korean/English" />
          </div>

          {/* Certificates Section */}
          <div className="w-full h-full flex flex-col gap-2 justify-center rounded-[5px] mt-5">
            <h1 className="text-[28px] font-bold text-primaryColor underline w-full h-full">
              CERTIFICATE
            </h1>
            <div className="w-[80%] h-full flex flex-col text-[16px] gap-2 cursor-pointer text-justify transition-all duration-300 ease-in-out">
              {displayedCertificates.map((certificate, index) => (
                <p
                  key={index}
                  className="hover:underline hover:text-primaryColor transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap text-ellipsis"
                  onClick={() => setIsModalOpen(true)}
                >
                  {certificate}
                </p>
              ))}
              {/* Show "View More" only if there are more than 3 certificates */}
              {certificates.length > 3 && !showAllCertificates ? (
                <p
                  className="text-primaryColor font-semibold cursor-pointer hover:underline"
                  onClick={() => setShowAllCertificates(true)}
                >
                  View More
                </p>
              ) : (
                <p
                  className="text-secondColor font-semibold cursor-pointer hover:underline"
                  onClick={() => setShowAllCertificates(false)}
                >
                  Show Less
                </p>
              )}
            </div>
            <CertificateImageShowModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>

        {/* Right Side Info Lines */}
        <div className="w-full h-full flex flex-col px-9">
          <InfoLine
            quest="When did you start professional umpire career?"
            ans="2020"
          />
          <Divider />
          <InfoLine quest="Date Of Birth" ans="12/12/1986" />
          <Divider />
          <InfoLine quest="Place Of Birth" ans="Thu Duc, Ho Chi Minh" />
          <Divider />
          <InfoLine
            quest="What thing made you want to be an umpire?"
            ans="In 2009, I started playing badminton and my brother recommended playing badminton."
          />
          <Divider />
          <InfoLine
            quest="Sport Ambitions"
            ans="I want to be a professional badminton umpire in the future."
          />
        </div>
      </div>
    </div>
  );
};

export default UmpireBasicInfo;
