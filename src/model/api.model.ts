import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType({ description: "Interception" })
export class Interception {
  @Field((type) => String)
  baseStreet: string

  @Field((type) => String)
  secondaryStreet1: string

  @Field((type) => String)
  intersectionType: string

  @Field((type) => String)
  displayName: string
}

@ObjectType({ description: "Address" })
export class Address {
  @Field((type) => String)
  addressLine: string

  @Field((type) => String)
  adminDistrict: string
  
  @Field((type) => String)
  adminDistrict2: string
  
  @Field((type) => String)
  countryRegion: string
  
  @Field((type) => String)
  formattedAddress: string
  
  @Field((type) => Interception)
  intersection: Interception
  
  @Field((type) => String)
  locality: string
  
  @Field((type) => String)
  postalCode: string
  
  @Field((type) => String)
  countryRegionIso2: string
}

@ObjectType({ description: "Geocodepoint" })
export class GeocodePoint {
  @Field((type) => String)
  type: string

  @Field((type) => [Number])
  coordinates: number[]

  @Field((type) => String)
  calculationMethod: string

  @Field((type) => [String])
  usageTypes: string[]
}

@ObjectType({ description: "Point" })
export class Point {
  @Field((type) => String)
  type: string

  @Field((type) => [Number])
  coordinates: number[]
}

@ObjectType({ description: "Location" })
export class Location {
  @Field((type) => [Number])
  bbox: number[]

  @Field((type) => String)
  name: string

  @Field((type) => Point)
  point: Point

  @Field((type) => Address)
  address: Address

  @Field((type) => String)
  confidence: string

  @Field((type) => String)
  entityType: string

  @Field((type) => GeocodePoint)
  geocodePoint: GeocodePoint

  @Field((type) => [String])
  matchCodes: string[]
}