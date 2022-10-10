export interface IDates {
  start: string;
  end: string;
}

export interface IAsteroidsData {
  name: string,
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    }
  }
  absolute_magnitude_h: number;
}
