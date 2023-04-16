import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { CompareQueryDtos } from 'src/app/compare-query-dto';
import { QueryService } from 'src/app/query.service';
import { SingleQueryDto } from 'src/app/single-query-dto';
import { HierarchyTree } from 'src/app/tree-dto';
import { Item } from 'src/shared/Item';

@Component({
  selector: 'app-query-processing-tool',
  templateUrl: './query-processing-tool.component.html',
  styleUrls: ['./query-processing-tool.component.css']
})
export class QueryProcessingToolComponent implements OnInit {
  isSingleQuery =false;
  queryFormGroup:FormGroup;
  sampleQuery:string[] = ["",
  "SELECT c_address, COUNT(*) FROM customer JOIN nation ON customer.c_nationkey = nation.n_nationkey WHERE nation.n_regionkey = 1 GROUP BY c_address;",
  "SELECT o.o_orderkey, o.o_orderdate, c.c_name, s.s_name, p.p_name, l.l_quantity FROM public.orders o JOIN public.customer c ON o.o_custkey = c.c_custkey JOIN public.lineitem l ON o.o_orderkey = l.l_orderkey JOIN public.partsupp ps ON l.l_partkey = ps.ps_partkey AND l.l_suppkey = ps.ps_suppkey JOIN public.part p ON l.l_partkey = p.p_partkey JOIN public.supplier s ON l.l_suppkey = s.s_suppkey AND s.s_nationkey IN ( SELECT n_nationkey FROM public.nation WHERE n_name = 'UNITED STATES');",
  "SELECT c_name, c_phone, n_name FROM public.customer, public.nation WHERE c_nationkey=n_nationkey;",
  "SELECT n.n_name, s.s_name FROM public.nation n JOIN public.supplier s ON n.n_nationkey = s.s_nationkey;",
  "SELECT c.c_name, c.c_mktsegment FROM public.customer c WHERE c.c_nationkey IN (SELECT n_nationkey FROM public.nation WHERE n_name = 'UNITED STATES');",
  "SELECT l.l_orderkey, l.l_linenumber, l.l_quantity, DENSE_RANK() OVER (PARTITION BY l.l_orderkey ORDER BY l.l_quantity DESC) AS dense_rank, RANK() OVER (PARTITION BY l.l_orderkey ORDER BY l.l_quantity DESC) AS rank FROM public.lineitem l;",
  "SELECT r.r_name, COUNT(DISTINCT n.n_nationkey) AS num_nations, COUNT(DISTINCT CASE WHEN s.s_acctbal > 2000 THEN s.s_suppkey END) AS num_vips FROM public.region r JOIN public.nation n ON r.r_regionkey = n.n_regionkey JOIN public.supplier s ON n.n_nationkey = s.s_nationkey GROUP BY r.r_name HAVING COUNT(DISTINCT CASE WHEN s.s_acctbal > 2000 THEN s.s_suppkey END) >= ( SELECT 0.5 * COUNT(DISTINCT s.s_suppkey) FROM public.supplier s JOIN public.nation n ON s.s_nationkey = n.n_nationkey JOIN public.region r ON n.n_regionkey = r.r_regionkey WHERE r.r_name = 'ASIA') ORDER BY num_nations DESC, num_vips DESC;"  
]
  sampleQuery2:string[]=["",
  "SELECT c_address, COUNT(*) FROM customer JOIN nation ON customer.c_nationkey = nation.n_nationkey WHERE nation.n_regionkey = 1 OR nation.n_regionkey = 2 GROUP BY c_address;",
  "SELECT o.o_orderkey, o.o_orderdate, c.c_name, s.s_name, p.p_name, l.l_quantity FROM public.orders o JOIN public.customer c ON o.o_custkey = c.c_custkey JOIN public.lineitem l ON o.o_orderkey = l.l_orderkey JOIN public.partsupp ps ON l.l_partkey = ps.ps_partkey AND l.l_suppkey = ps.ps_suppkey JOIN public.part p ON l.l_partkey = p.p_partkey JOIN public.supplier s ON l.l_suppkey = s.s_suppkey AND s.s_nationkey IN ( SELECT n.n_nationkey FROM public.region r JOIN public.nation n ON r.r_regionkey = n.n_regionkey WHERE r_name = 'ASIA');",
  "SELECT c_address, c_phone, n_name, r_name FROM public.customer, public.nation, public.region WHERE c_nationkey=n_nationkey and n_regionkey=r_regionkey;",
  "SELECT n.n_name, s.s_name FROM public.nation n JOIN public.supplier s ON n.n_nationkey = s.s_nationkey WHERE n_name = 'SAUDI ARABIA';",
  "SELECT c.c_name, c.c_mktsegment FROM public.customer c WHERE c.c_nationkey IN (SELECT n_nationkey FROM public.nation WHERE n_name = 'UNITED STATES') AND c.c_mktsegment='FURNITURE';",
  "SELECT l.l_orderkey, l.l_linenumber, l.l_quantity, DENSE_RANK() OVER (PARTITION BY l.l_orderkey ORDER BY l.l_quantity ASC) AS dense_rank, RANK() OVER (PARTITION BY l.l_orderkey ORDER BY l.l_quantity ASC) AS rank FROM public.lineitem l;",
  "SELECT n.n_name, COUNT(DISTINCT n.n_nationkey) AS num_nations, COUNT(DISTINCT CASE WHEN s.s_acctbal > 2000 THEN s.s_suppkey END) AS num_vips FROM public.nation n JOIN public.supplier s ON n.n_nationkey = s.s_nationkey GROUP BY n.n_name HAVING COUNT(DISTINCT CASE WHEN s.s_acctbal > 2000 THEN s.s_suppkey END) >= ( SELECT 0.5 * COUNT(DISTINCT s.s_suppkey) FROM public.supplier s JOIN public.nation n ON s.s_nationkey = n.n_nationkey WHERE n.n_name = 'RUSSIA') ORDER BY num_nations DESC, num_vips DESC;"
]
explanation:string[][] = [[],[]];
compareQuerySummary = new Map<number,string>();
highlightDifferenceMap = new Map<number,string>();


  constructor(private router:Router,private queryService:QueryService,
    private snackBar: MatSnackBar){}

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
    this.isSingleQuery = event.checked;
  }
  singleQuerySelection(event){
    this.queryFormGroup.get('querySingle').setValue(this.sampleQuery[event.value]);
  }
  compareQueryOneSelection(event){
    this.queryFormGroup.get('queryOne').setValue(this.sampleQuery[event.value]);
  }
  compareQueryTwoSelection(event){
    this.queryFormGroup.get('queryTwo').setValue(this.sampleQuery2[event.value]);
  }
  validateSubmit(){
      if(this.isSingleQuery){
        return !this.queryFormGroup.get('querySingle').valid;
      }
      else{
        return !this.queryFormGroup.get('queryOne').valid || 
               !this.queryFormGroup.get('queryTwo').valid
      }
  }
  inOrderTraversal(data:HierarchyTree,index:number):Item{
    let leftChild:Item = null;
    let rightChild:Item =null;
    let node = null;
    let length:number;
      if(data.left_child!=null)
           leftChild = this.inOrderTraversal(data.left_child,index);
      if(data.right_child!=null){
           rightChild = this.inOrderTraversal(data.right_child,index);
      }
      this.explanation[index].push(data.explanation);
      length = this.explanation[index].length;
      if(data.filters!=""){
        if(index==0){
          if(this.compareQuerySummary.has(length)
            && this.compareQuerySummary.get(this.explanation[index].length)=='delete'){
                  let text = this.compareQuerySummary.get(length);
                  text = text + " (" + data.filters + ")";
                  this.compareQuerySummary.set(length,text);
          }
        } 
        else{
          if(this.compareQuerySummary.has(length)
          && this.compareQuerySummary.get(this.explanation[index].length)!='delete'){
                let text = this.compareQuerySummary.get(length);
                text = text + " (" + data.filters + ")";
                this.compareQuerySummary.set(length,text);
          }
        }
      }
       node = {operator:data.description,
        content:'Cost: ' + data.cost + '\n' + data.filters,
        inputs:[]};
       if(leftChild!=null){
         node.inputs.push(leftChild);
         if(rightChild!=null){
          node.inputs.push(rightChild);
         }
       }
      return node;
  }
  processingQueryDifferences(differencesList:{"compare":string}[]){
    let index:number;
    let type = '';
    let summary = '';
    differencesList.forEach((diff)=>{
        index = +diff.compare.split('|')[0];
        type = diff.compare.split('|')[1];
        summary = diff.compare.split('|')[2];
        this.highlightDifferenceMap.set(index,type);
        this.compareQuerySummary.set(index,summary);
    })
  }
  sendQuery(){
    // call API using service class
    this.explanation = [[],[]];
    if(this.isSingleQuery){
        let queryDto:SingleQueryDto = {query:this.queryFormGroup.get('querySingle').value};
        this.queryService.postSingleQuery(queryDto).subscribe((data:HierarchyTree)=>{
        let tree:Item[] = [];
           tree.push(this.inOrderTraversal(data,0));
          this.router.navigateByUrl('/query/result',{state:[queryDto.query,tree,this.explanation[0]]});
        },error=>{
           this.snackBar.open('Invalid Query. Please try again', 'X', {
             duration: 2000
          });
        });
    }
    else{
        let queryDto:CompareQueryDtos = {query1:this.queryFormGroup.get('queryOne').value,
                                        query2:this.queryFormGroup.get('queryTwo').value};
        this.queryService.postCompareQuery(queryDto).subscribe((data:any[])=>{
            let tree1:Item[] = [];
            let tree2:Item[] = [];
            let differencesList:{"compare":string}[] = data[2];
            this.processingQueryDifferences(differencesList);
            tree1.push(this.inOrderTraversal(data[0],0,));
            tree2.push(this.inOrderTraversal(data[1],1));
            this.router.navigateByUrl('/query/compare',{state:[queryDto.query1,queryDto.query2
              ,tree1,tree2,this.explanation[0],this.explanation[1],this.highlightDifferenceMap
            ,this.compareQuerySummary]});
        },error=>{
          this.snackBar.open('Invalid Query. Please try again', 'X', {
            duration: 2000
         });
        });
        
        
    }
  }

}
