var margin = {top: 20, right: 20, bottom: 30, left: 40},
    gWidth = 960, gHeight = 500,  // svg width & height
    width = gWidth - margin.left - margin.right,
    height = gHeight - margin.top - margin.bottom;

var xScale = d3.time.scale().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left");

var line = d3.svg.line()
  .x(function(d) { return xScale(d.Date); })
  .y(function(d) { return yScale(d.Close); });

var svg = d3.select("body").append("svg")
    .attr("width", gWidth)
    .attr("height", gHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var parseDate = d3.time.format("%d-%b-%y").parse;

d3.tsv("../data/stock.tsv", function(error, stock) {
  stock.forEach(function(d) {
    d.Date = parseDate(d.Date);
    d.Close = +d.Close;
  });

  xScale.domain(d3.extent(stock, function(d) { return d.Date; }));
  yScale.domain(d3.extent(stock, function(d) { return d.Close; }));

  svg.append("g").attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);

  svg.append("g").attr("class", "y axis")
    .call(yAxis);

  svg.append("path").datum(stock).attr("class", "line").attr("d", line);
});
