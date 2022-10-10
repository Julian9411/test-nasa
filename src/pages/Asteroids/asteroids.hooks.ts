import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { userState } from "../../redux/reducers/user";
import { IDates } from "./asteroids.props";

export const useGetAsteroids = (dates: IDates) => {
  const {
    userSelect: { key },
  } = useSelector((state: { user: userState }) => state.user);
  const { start, end } = dates;

  return useQuery("getAsteroids", () =>
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${key}`
      )
      .then((res) => {
        const data = Object.values(res.data.near_earth_objects).flat()
      
        return data as [];
      })
  );
};
