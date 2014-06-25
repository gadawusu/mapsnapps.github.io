//M.Gamrat, June 2013. Using D3. Licensed under BSD Licence. max@mapsnapps.com

var w = 650,
    h = 500;

var projection = d3.geo.azimuthal()
    .mode("equidistant")
    .origin([-0.0858295, 51.523])
    .scale(180000*9);

var path = d3.geo.path()
    .projection(projection);
    
var svg = d3.select("body").insert("svg")
    .attr("width", w)
    .attr("height", h)

var g = svg.append("g");

// Executing the data to be added to map from an existing JSON file. Data source: geofabrik.de

d3.json("EC1Buildings.json", function(json) {

     g.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path).style("fill", "gray")   
      .on("mouseover", function(e){d3.select(this).style("fill", "orange")})
      .on("mouseout", function(e){d3.select(this).style("fill", "gray")}) 
      .append("title").text(function (d) { return "Name: "+d.properties.name+". Land use: "+d.properties.type; })
      
     d3.csv("EC1BTHOTSPOTS.csv", function(error, data) {
   
     g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
              return projection ([d.Longitude, d.Latitude]) [0];      
      })
      .attr("cy", function(d) {
              return projection ([d.Longitude, d.Latitude]) [1];      
      })
      .attr("r", 5)
      .style("fill", "purple")
      .style("opacity", 0.65)
      .on("mouseover", function(){d3.select(this).style("fill", "orange").attr("r", 30).append("title").text(function (d) { return   "Location: "+d.Street+". Infrastructure: "+d.Wifitype;}) ;})
      .on("mouseout", function(){d3.select(this).style("fill", "purple").attr("r", 15);})
      .transition()
      .delay(100)
      .duration(1000)    
      .attr("r", 15)   
      }
   );     
    });
