"use client";

import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { organizerDataset } from "@/assets/data";
import { colors } from "@mui/material";

type TickParamsSelectorProps = {
  tickPlacement: "end" | "start" | "middle" | "extremities";
  tickLabelPlacement: "tick" | "middle";
  setTickPlacement: React.Dispatch<
    React.SetStateAction<"end" | "start" | "middle" | "extremities">
  >;
  setTickLabelPlacement: React.Dispatch<
    React.SetStateAction<"tick" | "middle">
  >;
};

function valueFormatter(value: number | null) {
  return `${value}mm`;
}

function TickParamsSelector({
  tickPlacement,
  tickLabelPlacement,
  setTickPlacement,
  setTickLabelPlacement,
}: TickParamsSelectorProps) {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <FormControl>
        <FormLabel id="tick-placement-radio-buttons-group-label">
          tickPlacement
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="tick-placement-radio-buttons-group-label"
          name="tick-placement"
          value={tickPlacement}
          onChange={(event) =>
            setTickPlacement(
              event.target.value as "start" | "end" | "middle" | "extremities"
            )
          }
        >
          <FormControlLabel value="start" control={<Radio />} label="start" />
          <FormControlLabel value="end" control={<Radio />} label="end" />
          <FormControlLabel value="middle" control={<Radio />} label="middle" />
          <FormControlLabel
            value="extremities"
            control={<Radio />}
            label="extremities"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="label-placement-radio-buttons-group-label">
          tickLabelPlacement
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="label-placement-radio-buttons-group-label"
          name="label-placement"
          value={tickLabelPlacement}
          onChange={(event) =>
            setTickLabelPlacement(event.target.value as "tick" | "middle")
          }
        >
          <FormControlLabel value="tick" control={<Radio />} label="tick" />
          <FormControlLabel value="middle" control={<Radio />} label="middle" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  series: [
    {
      dataKey: "seoul",
      label: "Seoul rainfall",
      valueFormatter,
      color: "#74ba74",
    },
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const chartSetting1 = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  series: [
    {
      dataKey: "paris",
      label: "Paris rainfall",
      valueFormatter,
      color: "#FF8243",
    },
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const DashboardOrganizer = () => {
  const [credit, setCredit] = useState(0);
  const [tickPlacement, setTickPlacement] = React.useState<
    "start" | "end" | "middle" | "extremities"
  >("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState<
    "middle" | "tick"
  >("middle");
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-[32px] font-bold">Dashboard</h1>
      <div className="w-full flex flex-col gap-2 font-semibold">
        <h1>Number of Credit: {credit} </h1>
        {credit === 0 && (
          <h1 className="text-[14px] font-normal italic">
            You don&apos;t have any credit.{" "}
            <span className="text-primaryColor not-italic hover:underline cursor-pointer">
              View the tournaments packages
            </span>
          </h1>
        )}
      </div>

      <div className="w-full h-full flex justify-between items-center gap-5">
        <div className="w-full h-full border-2 border-gray-300 p-4 rounded-[5px]">
          <BarChart
            title="Rainfall in New York"
            dataset={organizerDataset}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
                tickPlacement,
                tickLabelPlacement,
              },
            ]}
            {...chartSetting}
          />
        </div>
        <div className="w-full h-full border-2 border-gray-300 p-4 rounded-[5px]">
          <BarChart
            title="Rainfall in Paris"
            dataset={organizerDataset}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
                tickPlacement,
                tickLabelPlacement,
              },
            ]}
            {...chartSetting1}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardOrganizer;
