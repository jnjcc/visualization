var margin = {top: 20, right: 20, bottom: 30, left: 40},
    gWidth = 960, gHeight = 500,  // svg width & height
    width = gWidth - margin.left - margin.right,
    height = gHeight - margin.top - margin.bottom;

// Bar plot with vertical bars
var vxScale = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var vyScale = d3.scale.linear().range([height, 0]);
var vxAxis = d3.svg.axis().scale(vxScale).orient("bottom");
var vyAxis = d3.svg.axis().scale(vyScale).orient("left").ticks(10, "%");

var vBar = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight)
  .attr("id", "vBar")
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Bar plot with horizontal bars
var hxScale = d3.scale.linear().range([0, width]);
var hyScale = d3.scale.ordinal().rangeRoundBands([0, height], .1);
var hxAxis = d3.svg.axis().scale(hxScale).orient("bottom").ticks(10, "%");
var hyAxis = d3.svg.axis().scale(hyScale).orient("left");

var hBar = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight)
  .attr("y", gHeight)
  .attr("id", "hBar")
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.tsv("../data/freq.tsv", type, function(error, dataset) {
  var sorted = dataset.slice(0).sort(function(a, b) {
    return b.Frequency - a.Frequency; });
  vxScale.domain(dataset.map(function(d) { return d.Letter; }));
  vyScale.domain([0, d3.max(dataset, function(d) { return d.Frequency; })]);

  hxScale.domain([0, d3.max(sorted, function(d) { return d.Frequency; })]);
  hyScale.domain(sorted.map(function(d) { return d.Letter; }));

  vBar.append("g")
    .attr("class", "vBar x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(vxAxis);
  vBar.append("g")
    .attr("class", "vBar y axis")
    .call(vyAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

  vBar.selectAll("rect")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return vxScale(d.Letter); })
    .attr("width", vxScale.rangeBand())
    .attr("y", function(d) { return vyScale(d.Frequency); })
    .attr("height", function(d) { return height - vyScale(d.Frequency); });

  hBar.append("g")
    .attr("class", "hBar x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(hxAxis)
    .append("text")
    .attr("x", hxScale.range()[1])
    .attr("dy", "-.71em")
    .style("text-anchor", "end")
    .text("Frequency");
  hBar.append("g")
    .attr("class", "hBar y axis")
    .call(hyAxis);

  hBar.selectAll("rect")
    .data(sorted)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("width", function(d) { return hxScale(d.Frequency); })
    .attr("y", function(d) { return hyScale(d.Letter); })
    .attr("height", hyScale.rangeBand());
});

var type = function(d) {
  d.Frequency = +d.Frequency;
  return d;
};
