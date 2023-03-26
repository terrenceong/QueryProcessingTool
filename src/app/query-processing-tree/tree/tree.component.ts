import { Component, Input, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Item } from 'src/shared/Item';
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() tree:any;
  constructor() { }

  ngOnInit(): void {
    var root = am5.Root.new("chartdiv");
    // var series = root.container.inputs.push(
    //   am5hierarchy.Tree.new(root, {
    //     contentField: "content",
    //     categoryField: "operator",
    //     childDataField: "inputs",
    //     orientation: "vertical"
    //   })
    // );
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    // var data = [{
    //   operator: "Projection",
    //   content: "empty",
    //   inputs:[{
    //     operator:"Hash Join",
    //     content:"empty",
    //     inputs:[{
    //       operator:"Selection",
    //       content:"ID=1",
    //       inputs:[{
    //         operator:"Seq Scan",
    //         content:"Relation R"
    //       }]
    //     },
    //     {
    //       operator: "Index Scan",
    //       content: "Relation S"
    //     }
    //   ]
    //   }]

    // }]
    
    
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );
    
    var series = container.children.push(
      am5hierarchy.Tree.new(root, {
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
    series.circles.template.setAll({
      radius: 30  
    });
    series.links.template.setAll({
      strokeWidth: 5,
      strokeOpacity: 0.5,
    });
    series.outerCircles.template.setAll({
      radius: 30
    });
    series.nodes.template.setAll({
      draggable: false,
      tooltipText:"[bold]{operator} \n{content}"
    });
    series.labels.template.setAll({
      fontSize: 20,
      fill: am5.color(0x550000),
      text: "{operator}"
    });
    series.data.setAll(this.tree);
    series.set("selectedDataItem", series.dataItems[0]);
  }

}
