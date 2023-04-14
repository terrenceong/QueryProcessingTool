import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from 'src/app/query.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  query:string = "SELECT * FROM CUSTOMER WHERE ID=1";
  data:any;
  description:string[];
  tree:any;
  constructor(private router:Router, private activatedRoute:ActivatedRoute) {
    this.data = this.router.getCurrentNavigation().extras.state;
    this.query = this.data[0];
    this.tree = this.data[1];
    this.description = this.data[2];
  
   }

  ngOnInit(): void {
    // this.queryService.updateTree.next(this.tree);
  }


}
