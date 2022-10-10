import axios from "axios";
import { useQuery } from "react-query";


export const useGetSatellites = () =>  useQuery("getSatellites", () =>
    axios.get(`https://tle.ivanstanojevic.me/api/tle`).then((res) => {
      return res.data;
    })
  );
;
