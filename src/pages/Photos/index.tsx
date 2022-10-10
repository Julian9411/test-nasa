import { Card, CardContent, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetList } from "./photos.hooks";
import { roverCameras } from "./photos.const";
import { IPhoto } from "./photos.props";
import { Loading } from "../../components/Loading";
import './style.css';

export const Photos = () => {
  const [filterDate, setFilterDate] = useState("");
  const [filterCamera, setFilterCamera] = useState("");
  const [filterName, setFilterName] = useState("");

  const { data, isLoading, refetch } = useGetList({
    date: filterDate,
    camera: filterCamera,
    name: filterName,
  });

  useEffect(() => {
    refetch();
  }, [filterCamera, filterDate, filterName]);

  return (
    <div className="contentContainer">
      <h1>Photos by Mark Rover</h1>
      <div
        className="filters"
      >
        <span>Filter by:</span>
        <label htmlFor="date">
          Date{" "}
          <input
            type="date"
            onChange={(e) =>
              setFilterDate(
                format(new Date(e.target.valueAsNumber), "yyyy-MM-d")
              )
            }
          />
        </label>
        <label htmlFor="camera">
          Camera name{" "}
          <select onChange={(e) => setFilterCamera(e.target.value)}>
            <option value="" selected disabled hidden>
              Choose here
            </option>
            {roverCameras.map((camera) => (
              <option value={camera}>{camera}</option>
            ))}
          </select>
        </label>
        <label htmlFor="name">
          Rover Name{" "}
          <input
            value={filterName}
            type="text"
            onChange={(e) => setFilterName(e.target.value)}
          />
        </label>
      </div>
      <div
        className="photos"
      >
        {!isLoading ? (
          data.map((photo: IPhoto) => (
            <Card>
              <CardMedia
                component="img"
                height="194"
                image={photo.img_src}
                alt="photo rover "
              />
              <CardContent>
                <ul style={{ textAlign: "left" }}>
                  <li>Full name camera: {photo.camera.full_name}</li>
                  <li>name rover: {photo.rover.name}</li>
                  <li>Earth date {photo.earth_date}</li>
                </ul>
              </CardContent>
            </Card>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
