export interface Welcome7 {
  __type:        string;
  bbox:          number[];
  name:          string;
  point:         Point;
  address:       Address;
  confidence:    string;
  entityType:    string;
  geocodePoints: GeocodePoint[];
  matchCodes:    string[];
}

export interface Address {
  addressLine:       string;
  adminDistrict:     string;
  adminDistrict2:    string;
  countryRegion:     string;
  formattedAddress:  string;
  intersection:      Intersection;
  locality:          string;
  postalCode:        string;
  countryRegionIso2: string;
}

export interface Intersection {
  baseStreet:       string;
  secondaryStreet1: string;
  intersectionType: string;
  displayName:      string;
}

export interface GeocodePoint {
  type:              string;
  coordinates:       number[];
  calculationMethod: string;
  usageTypes:        string[];
}

export interface Point {
  type:        string;
  coordinates: number[];
}