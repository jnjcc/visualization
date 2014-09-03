var margin = {top: 20, right: 20, bottom: 10, left: 115},
    gWidth = 960, gHeight = 960,  // svg width & height
    width = gWidth - margin.left - margin.right,
    height = gHeight - margin.top - margin.bottom;

var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var yScale = d3.scale.ordinal().rangeRoundBands([0, height], .1);
var zScale = d3.scale.linear().range(["white", "steelblue"]);

var svg = d3.select("body").append("svg")
  .attr("width", gWidth)
  .attr("height", gHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.tsv("../data/nba.tsv", function(error, nba) {
  var attributes = [];
  for (var attr in nba[0]) {
    if (attr !== "Name" && nba[0].hasOwnProperty(attr)) {
      attributes.push(attr);
    }
  }

  var nbaMelted = [];
  // we don't have melt() in JS...
  nba.forEach(function(player) {
    attributes.forEach(function(attr) {
      var record = {"Name": player.Name};
      record.attrName = attr;
      player[attr] = +player[attr];
      record[attr] = player[attr];
      nbaMelted.push(record);
    })
  });

  // Player Attributes
  xScale.domain(attributes);
  yScale.domain(nba.map(function(d) { return d.Name; }));

  svg.selectAll(".tile")
    .data(nbaMelted)
    .enter().append("rect")
    .attr("class", "tile")
    .attr("x", function(d) { return xScale(d.attrName); })
    .attr("y", function(d) { return yScale(d.Name); })
    .attr("width", xScale.rangeBand())
    .attr("height", yScale.rangeBand())
    .style("fill", function(player) {
      // FIXME: we should have pre-calculated zScale for each attribute
      zScale.domain([0, d3.max(nba, function(d) {
        return d[player.attrName];
      })]);
      return zScale(player[player.attrName]);
    });

  svg.append("g")
    .attr("class", "x axis")
    .call(d3.svg.axis().scale(xScale).orient("top"));

  svg.append("g")
    .attr("class", "y axis")
    .call(d3.svg.axis().scale(yScale).orient("left"));
});
