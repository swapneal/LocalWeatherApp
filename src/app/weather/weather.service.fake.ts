import { IWeatherService } from "./weather.service";

import { ICurrentWeather } from "../icurrent-weather";

import { of } from "rxjs";

export class WeatherServiceFake implements IWeatherService{
  private fakeWeather: ICurrentWeather = {
    city: 'Kathmandu',
    country: 'NP',
    date: 1423445634,
    image:'',
    temperature: 273,
    description: 'bright and sunny'
  }

  public getCurrentWeather(search: string | number, country?: string) {
    return of(this.fakeWeather);
  }
}