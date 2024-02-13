import { Coordinate } from "ol/coordinate";

// ce fichier permet de definir tout les types qu'on utilisera dans le modules
export type ParcelleProps = {
  coordinate: Coordinate[];
  espg: string;
};
