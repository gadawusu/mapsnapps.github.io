// Created by Mapsnapps, 2013. D3js.org.   max@mapsnapps.com

var margin = {top: 35, right: 5, bottom: 5, left: 40},
    width = 550 - margin.left - margin.right,
    height = 330 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("p").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function(error, data) {

  data.forEach(function(d) {
    d.Wifihotspots = +d.Wifihotspots;
  });

  x.domain(data.map(function(d) { return d.Type; }));
  y.domain([0, d3.max(data, function(d) { return d.Wifihotspots; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".61em")
      .style("text-anchor", "end")
      .text("#of BT Hotspots")

// Graph title

  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("UK Wifi Hotspots per location (BT)");

//Bars coming to life.

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Type); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Wifihotspots); })
      .attr("height", function(d) { return height - y(d.Wifihotspots); })
      .on("mouseover", function(){d3.select(this).style("fill", "orange");})
      .on("mouseout", function(){d3.select(this).style("fill", "purple");})
      .append("title").text(function (d) { return "Location: "+d.Type+ ". Total: "+d.Wifihotspots; });


});
