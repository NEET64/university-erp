import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { useEffect, useState } from "react";

export const Chart = () => {
  const [data, setData] = useState([]);
  // const [response, setResponse] = useState([]);
  // const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/attendance/chart/65c657dbaf0982c4aebeedc1")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (index < response.length) {
  //       setData((prevData) => [...prevData, response[index]]);
  //       setIndex((prevIndex) => prevIndex + 1);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [index, response]);
  // const temp = [
  //   {
  //     data: [],
  //     id: "positive",
  //   },
  //   {
  //     data: [],
  //     id: "negative",
  //   },
  // ];

  // let last = 0;
  // for (let i = 1; i < data.length; i++) {
  //   if (data[i].y <= 75) {
  //     if (last === 0) {
  //       temp[1].data.push({
  //         x: data[i - 1].x,
  //         y: data[i - 1].y,
  //       });
  //       last = 1;
  //     }
  //     temp[0].data.push({
  //       x: data[i].x,
  //       y: null,
  //     });
  //     temp[1].data.push(data[i]);
  //   } else {
  //     temp[1].data.push({
  //       x: data[i].x,
  //       y: null,
  //     });
  //     if (last === 1) {
  //       temp[0].data.push({
  //         x: data[i - 1].x,
  //         y: data[i - 1].y,
  //       });
  //       last = 0;
  //     }
  //     temp[0].data.push(data[i]);
  //   }
  // }

  return (
    <>
      {data.length > 1 && (
        <MyResponsiveLine data={[{ id: "hey", data: data }]} />
      )}
      {/* // <MyResponsiveLine data={temp} /> */}
    </>
  );
};

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    layers={[
      "grid",
      "markers",
      "axes",
      "areas",
      "crosshair",
      "lines",
      "points",
      "slices",
      "mesh",
      "legends",
    ]}
    animate
    // curve="monotoneX"
    // curve="natural"
    curve="linear"
    areaOpacity={0.2}
    areaBaselineValue={75}
    colors={["rgb(97, 205, 187)", "rgb(244, 117, 96)"]}
    crosshairType="cross"
    axisBottom={{
      format: "%b %d",
      tickValues: "every 4 days",
    }}
    enableGridX
    enableGridY
    enablePoints
    enablePointLabel={false}
    // enableArea
    margin={{ top: 15, right: 15, bottom: 30, left: 30 }}
    pointBorderColor={{
      from: "color",
      modifiers: [["darker", 0.5]],
    }}
    pointColor={{
      from: "color",
      modifiers: [["brighter", 0.3]],
    }}
    pointBorderWidth={2}
    pointLabelYOffset={-10}
    pointSize={8}
    useMesh
    gridXValues={30}
    xFormat="time:%Y-%m-%d"
    xScale={{
      format: "%Y-%m-%d",
      precision: "day",
      type: "time",
      useUTC: false,
    }}
    yScale={{
      min: "auto",
      max: "100",
      stacked: false,
      type: "linear",
    }}
    motionConfig={{
      mass: 3,
      tension: 200,
      friction: 30,
      clamp: false,
      precision: 0.01,
      velocity: 0,
    }}
  />
);
