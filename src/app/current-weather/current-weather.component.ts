import { Component, OnInit, Input } from "@angular/core";

import { ICurrentWeather } from "../icurrent-weather";
import { WeatherService } from "../weather/weather.service";

@Component({
  selector: "app-current-weather",
  templateUrl: "./current-weather.component.html",
  styleUrls: ["./current-weather.component.css"]
})
export class CurrentWeatherComponent implements OnInit {
  @Input() current: ICurrentWeather;

  constructor(private weatherService: WeatherService) {
    // this.current = {
    //   city: 'Lynnwood',
    //   country: 'US',
    //   date: new Date(),
    //   image:'',
    //   temperature: 72,
    //   description: 'hot'
    // };
  }

  ngOnInit() {
    // this.weatherService
    //   .getCurrentWeather("Bethesda", "US")
    //   .subscribe(data => (this.current = data));
  }
}
