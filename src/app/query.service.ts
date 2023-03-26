import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QueryService {
  setRootNull = new BehaviorSubject<any>(0);
  constructor() { 
  }
}
