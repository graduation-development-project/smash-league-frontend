import React from 'react';
import styles from './score.module.scss';
import { RiArrowGoBackFill } from 'react-icons/ri';
const ScorePage = () => {
  let score1 = 11;
  let score2 = 12;
  let active = false;
  return (
    <div className="bg-black p-6">
      <div className="w-full h-full flex justify-between items-center text-white px-6">
        <div className="text-[28px] text-primaryColor font-bold">Game 1</div>
        <div className="flex flex-col justify-center items-center gap-1 text-[20px] font-semibold">
          <div>Trung Son</div>
          <div>Tran Anh Minh</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 text-[20px] font-semibold">
          <p className={`${score1 >= score2 ? 'text-secondColor' : ''}`}>
            {score1}
          </p>
          <p className={`${score2 >= score1 ? 'text-secondColor' : ''}`}>
            {score2}
          </p>
        </div>
      </div>
      <div className="flex w-full h-screen justify-between items-center p-5">
        <div className="flex flex-col h-full justify-center items-center gap-3">
          <div className="h-[60%] border w-max border-white text-white flex justify-center items-center p-10 hover:bg-secondColor hover:font-bold">
            +1
          </div>
          <button className="text-white text-[20px] w-max flex justify-center items-center p-2"></button>
        </div>
        <div className="relative w-full min-h-screen flex items-center justify-center p-6 text-white mb-4">
          <div className={styles.court}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className={`${active ? 'font-bold bg-primaryColor' : ''}`}>
              Trung Son
            </div>{' '}
            {/**Player */}
            <div></div>
            <div></div>
            <div className={`${active ? 'font-bold bg-primaryColor' : ''}`}>
              Trung Son
            </div>{' '}
            {/**Player */}
            <div></div>
            <div></div>
            <div className={`${active ? 'font-bold bg-primaryColor' : ''}`}>
              Trung Son
            </div>
            {/**Player */}
            <div className={`${active ? 'font-bold bg-primaryColor' : ''}`}>
              Trung Son
            </div>{' '}
            {/**Player */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-center items-center gap-4">
          <div className="h-[60%] border w-max border-white text-white flex justify-center items-center p-10 hover:bg-secondColor hover:font-bold">
            +1
          </div>
          <button className="text-white text-[20px] w-max flex justify-center items-center gap-1 border border-white p-2 hover:font-bold hover:bg-gray-400 ">
            <RiArrowGoBackFill
              size={20}
              className="text-white hover:font-bold"
            />
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
