import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { WeatherService } from "../weather/weather.service";

@Component({
  selector: "app-city-search",
  templateUrl: "./city-search.component.html",
  styleUrls: ["./city-search.component.css"]
})
export class CitySearchComponent implements OnInit {
  search = new FormControl();
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.search.valueChanges.subscribe((searchValue: string) => {
      const userInput = searchValue.split(",").map(s => s.trim());
      this.weatherService.getCurrentWeather(userInput[0], userInput.length > 1 ? userInput[1] : undefined).subscribe(data => console.log(data));
    });

    //map (s = s.trim) is going to perform for loop in every element of arrary
  }
}
