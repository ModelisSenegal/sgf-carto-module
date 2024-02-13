//Ce fichier permet d'ajouter toutes les functions qu'on aura utiliser dans notre module
import Map from "ol/Map";
import View from "ol/View";
import LayerTile from "ol/layer/Tile";
import ZoomToExtent from "ol/control/ZoomToExtent";
import FullScreen from "ol/control/FullScreen";
import ScaleLine from "ol/control/ScaleLine";
import Attribution from "ol/control/Attribution";
import SourceOsm from "ol/source/OSM";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";
import proj4 from "proj4";
import { ParcelleProps } from "./types";
import { Coordinate } from "ol/coordinate";
import { PinchZoom, defaults as defaultInteractions } from "ol/interaction";
import { defaults as defaultControls } from "ol/control";
import BaseLayer from "ol/layer/Base";

proj4.defs([
  ["EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"],
  ["EPSG:32628", "+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"],
  ["EPSG:32629", "+proj=utm +zone=29 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"],
]);

export function transformCoords(coords: Coordinate[], epsgDepart: string) {
  let coordModif = [];
  for (let element of coords) {
    const point = proj4(epsgDepart, "ESPG:4326", element);
    coordModif.push(point);
  }
  return coordModif;
}

export function transforAllCoords({ coordinate, espg }: ParcelleProps) {
  let transform = [];
  //console.log(coords);
  for (let i = 0; i < coordinate.length; i++) {
    let result = transformCoords([coordinate[i]], espg);
    transform.push(result);
  }
  return transform;
}

export function loadMap(maptarget: string, layers: BaseLayer[] | undefined) {
  const map = new Map({
    target: maptarget,
    interactions: defaultInteractions().extend([new PinchZoom()]),
    layers: layers,
    controls: defaultControls().extend([
      new Attribution(),
      new ZoomToExtent({
        extent: [813079.7791264898, 5929220.284081122, 848966.9639063801, 5936863.986909639],
      }),
      new FullScreen(),
      new ScaleLine({
        bar: true,
        minWidth: 150,
      }),
    ]),
  });
}

export function addLayerToMap(coord: number[], color: string, pos?: number) {}
