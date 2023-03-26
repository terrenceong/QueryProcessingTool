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
    console.log(this.queryFormGroup.get('querySingleSelect').value);
    // call API using service class
    let tree:Item[] = [{operator:"Projection",content:"empty",
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

    this.router.navigateByUrl('/query/queryResult',{state:[tree,["description"]]});
  }

}
