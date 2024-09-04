export type GeoJSONPoint = { type: 'Point'; coordinates: [number, number] };

export type GeoJSONLineString = { type: 'LineString'; coordinates: [[number, number], [number, number]] };

export type GeoJSONPolygon = {
  type: 'Polygon';
  coordinates: [number, number][][]
};

export type GeoJSONMultiPoint = { type: 'MultiPoint'; coordinates: GeoJSONPoint['coordinates'][] };

export type GeoJSONMultiLineString = { type: 'MultiLineString'; coordinates: GeoJSONLineString['coordinates'][] };

export type GeoJSONMultiPolygon = { type: 'MultiPolygon'; coordinates: GeoJSONPolygon['coordinates'][] };

export type GeoJSONGeometryCollection = {
  type: 'GeometryCollection';
  geometries: (
    GeoJSONPoint
    | GeoJSONLineString
    | GeoJSONPolygon
    | GeoJSONMultiPoint
    | GeoJSONMultiLineString
    | GeoJSONMultiPolygon
  )[]
};

export type GeoJSON =
  GeoJSONPoint
  | GeoJSONLineString
  | GeoJSONPolygon
  | GeoJSONMultiPoint
  | GeoJSONMultiLineString
  | GeoJSONMultiPolygon
  | GeoJSONGeometryCollection;
