import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  data: any;
  constructor() { }

  //get the student marks form csv file
  ngOnInit() {
    d3.csv('../assets/students.csv').then((data) => {
      if (data) {
        this.data = data;
        this.drawDonutChart(data);
      }
    })
  }

  drawDonutChart(data) {
    console.log("donut chart values", data);
    //select svg element
    var svg = d3.select("svg"),
      width = svg.attr("width"),
      height = svg.attr("height"),
      radius = Math.min(width, height) / 2;
    //set the color ranges
    var colors = d3.scaleLinear()
      .domain([10, 300])
      .range(["#ff00bf", "#4db8ff"]);

    //Pie generator has configuration functions like startAngle(),endAngle(),padAngle(),sort()
    var pie = d3.pie()
      .padAngle(0.005)
      .value(d => d.Total);

    var pieData = pie(data);
    //create arc for the donut chart
    var arc = d3.arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    //append the graphics element into svg
    var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //draw chart using path
    g.selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("fill",function (d, i) { return colors(d.data.Total); })
      .attr("d", arc)
      .append("title")
      .text(d => d.data.Name)

      //to compute label positioning for text
      var text = g.selectAll("text")
      .data(pieData)
      .enter()
      .append("text")
      .attr("transform", d =>  "translate(" + arc.centroid(d) + ")")//centroid has the start and end angle of the arc
      .attr("dy", "0.35em");


    text.append("tspan")
      .attr("x", "-1.0em")
      .attr("y", "-0.7em")
      .style("font-weight", "bold")
      .text(d => d.data.Name);

    text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
      .attr("x", 0)
      .attr("y", "0.7em")
      .attr("fill-opacity", 0.7)
      .text(d => d.data.Total);



  }

}
