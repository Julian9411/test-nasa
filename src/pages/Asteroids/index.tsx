import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { useGetAsteroids } from "./asteroids.hooks";
import { IAsteroidsData } from "./asteroids.props";

export const Asteroids = () => {
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-d"));
  const [endDate, setEndDate] = useState(
    format(addDays(new Date(startDate), 1), "yyyy-MM-d")
  );
  const [rows, setRows] = useState<IAsteroidsData[] | undefined>([]);

  const {
    data: dataAsteroids,
    isLoading,
    refetch,
  } = useGetAsteroids({
    start: startDate,
    end: endDate,
  });

  useEffect(() => {
    if (!isLoading) {
      setRows(dataAsteroids);
    }
  }, [isLoading]);

  useEffect(() => {
    refetch();
  }, [endDate, startDate]);

  return (
    <div className="contentContainer">
      <h1>Asteroids</h1>
      <span>Asteroids near the earth</span>
      <div className="filters">
        <label htmlFor="dateStart">
          Date Start{" "}
          <input
            type="date"
            onChange={(e) =>
              setStartDate(
                format(new Date(e.target.valueAsNumber), "yyyy-MM-d")
              )
            }
          />
        </label>
        <label htmlFor="dateEnd">
          Date End{" "}
          <input
            type="date"
            min={addDays(new Date(startDate), 1).toString()}
            max={addDays(new Date(startDate), 6).toString()}
            onChange={(e) =>
              setEndDate(format(new Date(e.target.valueAsNumber), "yyyy-MM-d"))
            }
          />
        </label>
      </div>
      {!isLoading ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Potential Hazardous</TableCell>
                <TableCell align="right">Min diameter by meters</TableCell>
                <TableCell align="right">Max diameter by meters</TableCell>
                <TableCell align="right">Magnitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow
                  key={`${row.name}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{`${row.is_potentially_hazardous_asteroid}`}</TableCell>
                  <TableCell align="right">
                    {Math.ceil(
                      row.estimated_diameter.meters.estimated_diameter_min
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {Math.ceil(
                      row.estimated_diameter.meters.estimated_diameter_max
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {row.absolute_magnitude_h}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Loading />
      )}
    </div>
  );
};
