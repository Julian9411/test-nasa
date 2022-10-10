import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import groupBy from "lodash.groupby";
import { useGetSatellites } from "./satellites.hooks";
import { Loading } from "../../components/Loading";
import "./style.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Satellites = () => {
  const [satellites, setSatellites] = useState({});
  const { data, isLoading } = useGetSatellites();

  useEffect(() => {
    if (!isLoading) {
      const satellitesModifyObject = data.member.map(
        (item: { name: string }) => {
          return { name: item.name.split(" ")[0] };
        }
      );
      const groupData = groupBy(satellitesModifyObject, "name");
      setSatellites(groupData);
    }
  }, [isLoading]);

  const countSatellites: Number[] = [];

  Object.values(satellites).forEach((item: any) =>
    countSatellites.push(item.length)
  );

  const dataPieChart = {
    labels: Object.keys(satellites),
    datasets: [
      {
        data: countSatellites,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="contentContainer">
      <h1>Satellites</h1>
      <span>Satellites near the earth</span>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="containerPie">
          <Pie data={dataPieChart} />
        </div>
      )}
    </div>
  );
};
