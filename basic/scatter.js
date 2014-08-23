var margin = {top: 20, right: 20, bottom: 30, left: 40},
    gWidth = 960, gHeight = 500,  // svg width & height
    width = gWidth - margin.left - margin.right,
    height = gHeight - margin.top - margin.bottom;

var xScale = d3.scale.linear().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);

var cScale = d3.scale.category10();

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left");

var svg = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.tsv("../data/iris.tsv", function(error, iris) {
  iris.forEach(function(d) {
    d.sepalLength = +d.sepalLength;
    d.sepalWidth = +d.sepalWidth;
    d.petalLength = +d.petalLength;
    d.petalWidth = +d.petalWidth;
  });

  xScale.domain(d3.extent(iris, function(d) { return d.sepalWidth; }));
  yScale.domain(d3.extent(iris, function(d) { return d.sepalLength; }));

  svg.append("g").attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Sepal Width (cm)");

  svg.append("g").attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Sepal Length (cm)");

  svg.selectAll("circle").data(iris)
    .enter().append("circle")
    .attr("cx", function(d) { return xScale(d.sepalWidth); })
    .attr("cy", function(d) { return yScale(d.sepalLength); })
    .attr("r", 3)
    .attr("fill", function(d) { return cScale(d.species); });

  var legend = svg.selectAll(".legend").data(cScale.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0, " + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", cScale);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
});
