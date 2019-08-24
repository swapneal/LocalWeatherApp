import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { FormControl, Validators } from "@angular/forms";

import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-city-search",
  templateUrl: "./city-search.component.html",
  styleUrls: ["./city-search.component.css"]
})
export class CitySearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  search = new FormControl("", [Validators.minLength(3)]);
  constructor() {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        if (!this.search.invalid) {
          this.searchEvent.emit(searchValue);

          // const userInput = searchValue.split(",").map(s => s.trim());
          // this.weatherService
          //   .getCurrentWeather(
          //     userInput[0],
          //     userInput.length > 1 ? userInput[1] : undefined
          //   )
          //   .subscribe(data => console.log(data));
        }
      });

    //map (s = s.trim) is going to perform for loop in every element of arrary
  }
}
