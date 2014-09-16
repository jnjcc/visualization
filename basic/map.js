var gWidth = 960, gHeight = 500;

var path = d3.geo.path();

var svg = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight);

d3.json("../data/us-states.json", function(error, json) {
  svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "steelblue");
});
