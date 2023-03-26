import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from 'src/app/query.service';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
@Component({
  selector: 'app-differences',
  templateUrl: './differences.component.html',
  styleUrls: ['./differences.component.css']
})
export class DifferencesComponent implements OnInit {
  query1:string = "SELECT * FROM CUSTOMER WHERE ID=1";
  query2:string = "SELECT * FROM CUSTOMERS WHERE ID=1 AND NAME='Terrence'";
  data:any;
  description:string[];
  tree1:any;
  tree2:any;
  isTree1:boolean = true;
  root1:any;
  root2:any;
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private queryService:QueryService) {
    this.data = this.router.getCurrentNavigation().extras.state;
    this.tree1 = this.data[0];
    this.tree2 = this.data[1];
    this.description = this.data[2];
    this.root1= null;
    this.root2 = null;
   }
   ngOnInit(): void {
       
   }

  ngAfterViewInit(): void {
    console.log("After view init");
    //tree 1
    this.root1 = am5.Root.new("chartdiv1");
    this.root1.setThemes([
      am5themes_Animated.new(this.root1)
    ]);
    var container1 = this.root1.container.children.push(
      am5.Container.new(this.root1, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: this.root1.verticalLayout
      })
    );
    
    var series1 = container1.children.push(
      am5hierarchy.Tree.new(this.root1, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 100,
        topDepth: 0,
        valueField: "content",
        categoryField: "operator",
        childDataField: "inputs",
        orientation: "vertical",
        marginTop: 40,
        marginBottom: 40,
        paddingTop: 40,
        paddingBottom: 40
      })
    );
    series1.circles.template.setAll({
      radius: 30  
    });
    series1.links.template.setAll({
      strokeWidth: 5,
      strokeOpacity: 0.5,
    });
    series1.outerCircles.template.setAll({
      radius: 30
    });
    series1.nodes.template.setAll({
      draggable: false,
      tooltipText:"[bold]{operator} \n{content}"
    });
    series1.labels.template.setAll({
      fontSize: 20,
      fill: am5.color(0x550000),
      text: "{operator}"
    });
    series1.data.setAll(this.tree1);
    series1.set("selectedDataItem", series1.dataItems[0]);

    //tree 2
    this.root2 = am5.Root.new("chartdiv2");
    this.root2.setThemes([
      am5themes_Animated.new(this.root2)
    ]);
    var container2 = this.root2.container.children.push(
      am5.Container.new(this.root2, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: this.root2.verticalLayout
      })
    );
    
    var series2 = container2.children.push(
      am5hierarchy.Tree.new(this.root2, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 100,
        topDepth: 0,
        valueField: "content",
        categoryField: "operator",
        childDataField: "inputs",
        orientation: "vertical",
        marginTop: 40,
        marginBottom: 40,
        paddingTop: 40,
        paddingBottom: 40
      })
    );
    series2.circles.template.setAll({
      radius: 30  
    });
    series2.links.template.setAll({
      strokeWidth: 5,
      strokeOpacity: 0.5,
    });
    series2.outerCircles.template.setAll({
      radius: 30
    });
    series2.nodes.template.setAll({
      draggable: false,
      tooltipText:"[bold]{operator} \n{content}"
    });
    series2.labels.template.setAll({
      fontSize: 20,
      fill: am5.color(0x550000),
      text: "{operator}"
    });
    series2.data.setAll(this.tree2);
    series2.set("selectedDataItem", series2.dataItems[0]);
  }
  changeTree(event){
    this.isTree1 =  event.value == "Q1" ? true:false;
  }

}
