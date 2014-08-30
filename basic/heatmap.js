var margin = {top: 20, right: 90, bottom: 30, left: 50},
    gWidth = 960, gHeight = 500,  // svg width & height
    width = gWidth - margin.left - margin.right,
    height = gHeight - margin.top - margin.bottom;

var xScale = d3.time.scale().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);
var zScale = d3.scale.linear().range(["white", "steelblue"]);

var xStep = 864e5,
    yStep = 100;

var svg = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatDate = d3.time.format("%b %d");

d3.tsv("../data/heatmap.tsv", function(error, buckets) {
  buckets.forEach(function(d) {
    d.Date = parseDate(d.Date);
    d.Bucket = +d.Bucket;
    d.Count = +d.Count;
  });

  xScale.domain(d3.extent(buckets, function(d) { return d.Date; }));
  yScale.domain(d3.extent(buckets, function(d) { return d.Bucket; }));
  zScale.domain([0, d3.max(buckets, function(d) { return d.Count; })]);

  // Extend the xScale and yScale domain to fit the last bucket
  xScale.domain([xScale.domain()[0], +xScale.domain()[1] + xStep]);
  yScale.domain([yScale.domain()[0], +yScale.domain()[1] + yStep]);

  svg.selectAll(".tile")
    .data(buckets)
    .enter().append("rect")
    .attr("class", "tile")
    .attr("x", function(d) { return xScale(d.Date); })
    .attr("y", function(d) { return yScale(d.Bucket + yStep); })
    .attr("width", xScale(xStep) - xScale(0))
    .attr("height", yScale(0) - yScale(yStep))
    .style("fill", function(d) { return zScale(d.Count); });

  var legend = svg.selectAll(".legend")
    .data(zScale.ticks(6).slice(1).reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
      return "translate(" + (width + 20) + ", " + (20 + i * 20) + ")"; });
  legend.append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", zScale);
  legend.append("text")
    .attr("x", 26)
    .attr("y", 10)
    .attr("dy", ".35em")
    .text(String);

  svg.append("text")
    .attr("class", "label")
    .attr("x", width + 20)
    .attr("y", 10)
    .attr("dy", ".35em")
    .text("Count");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.svg.axis().scale(xScale).ticks(d3.time.days)
            .tickFormat(formatDate).orient("bottom"))
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .attr("text-anchor", "end")
    .text("Date");

  svg.append("g")
    .attr("class", "y axis")
    .call(d3.svg.axis().scale(yScale).orient("left"))
    .append("text")
    .attr("class", "label")
    .attr("y", 6)
    .attr("dy", ".71em")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Bucket");
});
