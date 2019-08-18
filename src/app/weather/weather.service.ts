import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ICurrentWeather } from "../icurrent-weather";
import { map, count } from "rxjs/operators";

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  //variable name with ? is optional parameter
  getCurrentWeather(search: string | number, country?: string) {
    let uriParams = "";
    if (typeof search === "string") {
      uriParams = `q=${search}`;
    } else {
      uriParams = `zip=${search}`;
    }

    if (country) {
      uriParams = `${uriParams},${country}`;
    }
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${
          environment.baseUrl
        }api.openweathermap.org/data/2.5/weather?${uriParams}&appid=${
          environment.appId
        }`
        //http://api.openweathermap.org/data/2.5/weather?q=q=London,uk&APPID=1111111111
      )
      .pipe(
        map(dataFromInterface =>
          this.transformToICurrentWeather(dataFromInterface)
        )
      );
    //pipe will transform the observable datatype into ICurrentWeatherData, API will return in Observable
    //map calls another function
  }

  //angular needs to define the return value from function while declaring the function
  private transformToICurrentWeather(
    data: ICurrentWeatherData
  ): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000, //date comes in miliseconds
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`, //weather can be of 1 or more days, for today, we need to get first data from weather array
      temperature: data.main.temp,
      description: data.weather[0].description
    };
  }
}
