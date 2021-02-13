import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Statistics } from '../models/statistics';
import { environment } from 'src/environments/environment.prod';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private statCountUrl = environment.countStatics;
  private statAvgUrl= environment.avgStatics;

  constructor(private http: HttpClient) { }

  // dailyForecast(){
  //   return this.http.get("").map(data=>data);
  // }
  
  getSta(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(this.statCountUrl);
  }
  getAvg(): Observable<Statistics[]>{
    return this.http.get<Statistics[]>(this.statAvgUrl);
  }

}
