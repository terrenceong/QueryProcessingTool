import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/shared/Item';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  query:string = "SELECT * FROM CUSTOMER WHERE ID=1";
  data:any;
  constructor(private router:Router, private activatedRoute:ActivatedRoute) {
    this.data = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
  
  }

}
