import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { userState } from "../../redux/reducers/user";
import { IFilters } from "./photos.props";

export const useGetList = (filters: IFilters) => {
  const {
    userSelect: { key },
  } = useSelector((state: { user: userState }) => state.user);
  const { date, camera, name } = filters;

  const filterDate = date !== "" ? `&earth_date=${date}` : "";
  const filterCamera = camera !== "" ? `&camera=${camera}` : "";
  const filterName = name !== "" ? `&name=${name}` : "";

  return useQuery("getPhotos", () =>
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000${filterCamera}${filterDate}${filterName}&page=1&api_key=${key}`
      )
      .then((res) => {
        return res.data.photos;
      })
  );
};
