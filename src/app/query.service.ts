import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SingleQueryDto } from './single-query-dto';
import { AppConfigService } from './app-config.service';
import { CompareQueryDtos } from './compare-query-dto';
@Injectable({
  providedIn: 'root'
})
export class QueryService {
  setRootNull = new BehaviorSubject<any>(0);
  constructor(private httpClient:HttpClient,private appConfigService:AppConfigService) { 
  }
  postSingleQuery(query:SingleQueryDto){
    return this.httpClient.post(this.appConfigService.apiUrl + 'api/single',query);
  }
  postCompareQuery(query:CompareQueryDtos){
    return this.httpClient.post(this.appConfigService.apiUrl + 'api/compare',query);
  }
}
