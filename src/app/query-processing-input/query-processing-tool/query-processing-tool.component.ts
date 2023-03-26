import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/shared/Item';

@Component({
  selector: 'app-query-processing-tool',
  templateUrl: './query-processing-tool.component.html',
  styleUrls: ['./query-processing-tool.component.css']
})
export class QueryProcessingToolComponent implements OnInit {
  isSingleQuery = true;
  queryFormGroup:FormGroup;
  constructor(private router:Router){}

  ngOnInit(): void {
    this.queryFormGroup = new FormGroup({
      'querySingle': new FormControl(null,[Validators.required]),
      'queryOne': new FormControl(null,[Validators.required]),
      'queryTwo': new FormControl(null,[Validators.required]),
      'querySingleSelect': new FormControl(0),
      'queryOneSelect': new FormControl(0),
      'queryTwoSelect': new FormControl(0)
    });
  }
  toggleChanged(event){
    this.isSingleQuery = !event.checked;
  }
  sendQuery(){
    // call API using service class
    let tree1:Item[] = [{operator:"Projection",content:"empty",
    inputs:[
      {operator:"Hash Join",content:"empty",
      inputs:[
        {operator:"Selection",content:"ID=1",
        inputs:[
          {operator:"Seq Scan",content:"Relation A"}
        ]},
        {operator: "Index Scan",content:"Relation B"}
      ]}
    ]}];

    let tree2:Item[] = [{operator:"Projection",content:"empty",
    inputs:[
      {operator:"Sort M Join",content:"empty",
      inputs:[
        {operator:"Selection",content:"ID=1",
        inputs:[
          {operator:"Seq Scan",content:"Relation A"}
        ]},
        {operator: "Index Scan",content:"Relation B"}
      ]}
    ]}];
    if(this.isSingleQuery){
      this.router.navigateByUrl('/query/result',{state:[tree1,["description"]]});
    }else{
      this.router.navigateByUrl('/query/compare',{state:[tree1,tree2,["description"]]});
    }
  }

}
