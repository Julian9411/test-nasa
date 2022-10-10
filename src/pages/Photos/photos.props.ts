export interface IFilters {
  date: string;
  camera: string;
  name: string;
}

export interface IPhoto {
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
  rover: {
    name: string;
  };
}
