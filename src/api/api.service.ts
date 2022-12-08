import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import axios from 'axios';
const URL = 'http://dev.virtualearth.net/REST/v1/Locations/'

function getLocationData(lat: string, long: string, key: string) {
  return axios.get(`${URL}${lat},${long}?includeEntityTypes=Address&includeNeighborhood=0&verboseplacenames=true&include=ciso2&key=${key}`)
}

@Injectable()
export class ApiService {

  constructor(private config: ConfigService) {}

  private BING_API: string = this.config.get<string>("BINGMAP_API_KEY");

  async getLocation(lat: string, long: string) {
    const { data } = await getLocationData(lat, long, this.BING_API);
    const locationData = data.resourceSets[0].resources[0];

    const res = {
      address: locationData.address,
      name: locationData.name,
      point: locationData.point.coordinates,
      confidence: locationData.confidence
    }

    return res;
  }
}
