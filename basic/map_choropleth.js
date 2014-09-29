var gWidth = 960, gHeight = 500;

var projection = d3.geo.albersUsa();
var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight);

d3.json("../data/us-states.json", function(error, json) {
  svg.selectAll(".bound")
    .data(json.features)
    .enter()
    .append("path")
    .attr("class", "bound")
    .attr("d", path)
    .style("fill", "steelblue");

  d3.csv("../data/us-cities.csv", function(error, cities) {
    svg.selectAll(".city")
      .data(cities)
      .enter()
      .append("circle")
      .attr("class", "city")
      .attr("cx", function(d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr("cy", function(d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr("r", 3)
      .style("fill", "yellow");
  });
});
