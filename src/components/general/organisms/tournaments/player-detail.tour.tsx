import React from 'react'

const PlayerDetailTour = () => {
  const bgColor = "bg-[#60a5fa]";
  const textColor = "text-white"


  const tableRow = () => {
    return [1, 2, 3, 4, 5].map((player) => {
      return (
        <tr className='h-max pt-10 text-lg font-medium text-center'>
          <td>{player}</td>
          <td className='w-32 h-32 pt-5'>
            <img  className='w-32 h-32 object-contain' src="https://img.bwfbadminton.com/image/upload/w_308,h_359,c_thumb,g_face:center/v1697765036/assets/players/thumbnail/87442.png" alt="" />
          </td>
          <td className=' text-start'>Malcolm Lockyer</td>
          <td>20</td>
          <td>20</td>
          <td>20</td>
        </tr>
      )
    })

  }

  return (
    <div>
      <div>
        <table className="table-auto w-full ">
          <thead className={`font-bold text-2xl ${bgColor} ${textColor}`} >
            <tr  className=''>
              <th>No.</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Age</th>
              <th>Age</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {tableRow()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlayerDetailTour