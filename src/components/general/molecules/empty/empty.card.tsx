import { Empty } from "antd";
import React from "react";

const EmptyCard = ({
  description,
  image,
}: {
  description: string;
  image: string;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center p-8 text-[16px] font-bold text-slate-400">
      <Empty
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: 'inherit',
          fontSize: "16px",
          color: "#333",
        }}
        description={description}
        image={image}
      />
    </div>
  );
};

export default EmptyCard;
