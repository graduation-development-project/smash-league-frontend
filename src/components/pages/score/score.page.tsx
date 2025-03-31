import React from 'react';
import styles from './score.module.scss';
import { RiArrowGoBackFill } from 'react-icons/ri';
const ScorePage = () => {
  let set1ofPlayer1 = 11;
  let set2ofPlayer1 = 13;
  let set3ofPlayer1 = 11;
  let set1ofPlayer2 = 12;
  let set2ofPlayer2 = 12;
  let set3ofPlayer2 = 12;

  let score2 = 12;
  let active = true;
  return (
    <div className="bg-black w-full h-full ">
      <div className="w-full h-full flex justify-between items-center text-white px-6 pt-3">
        <div className="text-[28px] text-primaryColor font-bold">Game 1</div>
        <div className="flex flex-col justify-center items-center gap-1 text-[20px] font-semibold">
          <div>Trung Son</div>
          <div>Tran Anh Minh</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 text-[20px] font-semibold">
          <div className="flex gap-4">
            <p
              className={`${
                set1ofPlayer1 >= set1ofPlayer2 ? 'text-secondColor' : ''
              }`}
            >
              {set1ofPlayer1}
            </p>
            <p
              className={`${
                set2ofPlayer1 >= set2ofPlayer2 ? 'text-secondColor' : ''
              }`}
            >
              {set2ofPlayer1}
            </p>
            <p
              className={`${
                set3ofPlayer1 >= set3ofPlayer2 ? 'text-secondColor' : ''
              }`}
            >
              {set3ofPlayer1}
            </p>
          </div>
          <div className="flex gap-4">
            <p
              className={`${
                set1ofPlayer2 >= set1ofPlayer1 ? 'text-secondColor' : ''
              }`}
            >
              {set1ofPlayer2}
            </p>

            <p
              className={`${
                set2ofPlayer2 >= set2ofPlayer1 ? 'text-secondColor' : ''
              }`}
            >
              {set2ofPlayer2}
            </p>

            <p
              className={`${
                set3ofPlayer2 >= set3ofPlayer1 ? 'text-secondColor' : ''
              }`}
            >
              {set3ofPlayer2}
            </p>
          </div>
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
