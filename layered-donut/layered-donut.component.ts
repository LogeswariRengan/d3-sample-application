import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartData } from '../chartData';


@Component({
  selector: 'app-layered-donut',
  templateUrl: './layered-donut.component.html',
  styleUrls: ['./layered-donut.component.css']
})
export class LayeredDonutComponent implements OnInit {
  firstYrstudentRecords: any;
  secondYrstudentRecords: any;
  name = "Logu";
  chartData: object;
  firstYrMark = [];
  secondYrMark = [];
  valueArray = [];
  data = [];

  constructor() { }

  //get the student mark details form csv files
  ngOnInit() {
    d3.csv("../assets/firstYr-student-marks.csv").then((studentData) => {
      this.firstYrstudentRecords = studentData;
      console.log("1 yr records", this.firstYrstudentRecords);
      
    })
    d3.csv("../assets/secondYr-student-marks.csv").then((studentData) => {
      this.secondYrstudentRecords = studentData;
      console.log(" 2 yr records", this.secondYrstudentRecords);
      
    })


  }

  //filter the records based on the selected student name
  filterRecords(name, year1Record, year2Record) {

    var chartData = new ChartData();

    console.log("name", name);
    console.log("records", year1Record.length);
    for (let i = 0; i < year1Record.length; i++) {
      if (year1Record[i].Name === name) {
        console.log("logu records", year1Record[i])
        this.firstYrMark.push(year1Record[i].Mark1);
        this.firstYrMark.push(year1Record[i].Mark2);
        this.firstYrMark.push(year1Record[i].Mark3);
        this.firstYrMark.push(year1Record[i].Mark4);
        this.firstYrMark.push(year1Record[i].Mark5);
        console.log("mark array 1", this.firstYrMark)
      }
    }
    if (this.firstYrMark.length > 0) {
      console.log("setting")
      chartData._firstYrMark = this.firstYrMark;

      console.log("model", chartData._firstYrMark)
    }

    for (let i = 0; i < year2Record.length; i++) {
      if (year2Record[i].Name === name) {
        console.log("logu records", year2Record[i])
        this.secondYrMark.push(year2Record[i].Mark1);
        this.secondYrMark.push(year2Record[i].Mark2);
        this.secondYrMark.push(year2Record[i].Mark3);
        this.secondYrMark.push(year2Record[i].Mark4);
        this.secondYrMark.push(year2Record[i].Mark5);
        console.log("mark array2", this.secondYrMark)
      }
    }
    if (this.secondYrMark.length > 0) {

      chartData._secondYrMark = this.secondYrMark;
    }

    console.log("objcte values", chartData)

    if (chartData) {

      this.drawDonuts(chartData)
    }


  }


//define the number of layers
  drawDonuts(data) {
    console.log("object length", Object.keys(data).length)
    for (let i = 0; i < Object.keys(data).length; i++) {
      let index = Object.keys(data)[i]
     
      this.drawLayer(data[index], i)

    }
  }


  //draw the donut charts 
  drawLayer(_data, i) {

    //select svg element
    var svg = d3.select("svg"),
      width = svg.attr("width"),
      height = svg.attr("height"),
      radius = 50;

      var pieWidth = 50;

    var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    //set the color ranges
    var colors = d3.scaleLinear()
      .domain([10, 100])
      .range(["#ff00bf", "#4db8ff"]);
 
    console.log("chart values", _data);

    // //Pie generator has configuration functions like startAngle(),endAngle(),padAngle(),sort()
    var pie = d3.pie()
      .padAngle(0.005)
      .sort(null)
      .value(d => d);

    var pieData = pie(_data);

    // var arc = d3.arc()
    //   .innerRadius(i * pieWidth)
    //   .outerRadius((i + 1) * pieWidth - 1)
    var arc = d3.arc()
      .innerRadius((radius * i) + pieWidth)
      .outerRadius((radius * (i + 1)) + pieWidth)


 // //append the graphics element into svg
    g.selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("fill", function (d, i) {
        return colors(d.data);
      })
      .attr("d", arc)
      .append("title")
      .text(d => d.data)

    //to compute label positioning for text
    var text = g.selectAll("text")
      .data(pieData)
      .enter()
      .append("text")
      .attr("transform", d => "translate(" + arc.centroid(d) + ")")//centroid has the start and end angle of the arc
      .attr("dy", "0.35em");


    text.append("tspan")
      .attr("x", "-1.0em")
      .attr("y", "-0.7em")
      .style("font-weight", "bold")
      .text(d => d.data);

  }
  
 




  getDonut(event) {
    this.name = event.value;
    this.filterRecords(this.name, this.firstYrstudentRecords, this.secondYrstudentRecords);
    while (this.secondYrMark.length) {
      this.secondYrMark.pop()
    }
    while (this.firstYrMark.length) {
      this.firstYrMark.pop()
    }


  }
}
