var CampaignProfitAfterModel = Backbone.Model.extend({
  defaults:{
    active: false,
    svg: null
  },
  setSvg: function(el){
    debugger
    var width = 500,
    height = 500,
    margin = 50;

    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var x=d3.scale.linear().domain([-40,25]).range([margin,width-margin]);
    var y=d3.scale.linear().domain([-0.05,0.35]).range([height-margin,margin]);
    var r=d3.scale.linear().domain([0,50]).range([0,20]);
    var o=d3.scale.linear().domain([3,100]).range([.5,1]);
    var c=d3.scale.category10().domain(["Africa","America","Asia","Europe","Oceania"]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - margin) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "axis")
       .attr("transform", "translate(" + margin + ",0)")
      .call(yAxis);
    //horizontal bars

    svg.selectAll(".h").data(d3.range(-0.05,0.35,0.05)).enter()
      .append("line").classed("h",1)
      .attr("x1",margin).attr("x2",height-margin)
      .attr("y1",y).attr("y2",y).text("hello")
    //vertical bars
    svg.selectAll(".v").data(d3.range(-40,30,10)).enter()
      .append("line").classed("v",1)
      .attr("y1",margin).attr("y2",width-margin)
      .attr("x1",x).attr("x2",x)


    d3.csv("BillsWork3/data1_revised.csv",function(csv) {
      // we first sort the data
      // csv.sort(function(a,b) {return b.population-a.population;});
      // then we create the marks, which we put in an initial position
      
      var color = d3.scale.linear()
        .domain([-40,-10,20])
        .range(["red", "purple", "#0066CC"]);
      
      var tooltip = d3.select("body")
        .append("div")
        .style("visibility", "hidden")
        .text("simple tooltip");

      svg.selectAll("circle").data(csv).enter()
        .append("circle")
        .attr("cx",function(d) {return x(0);})
        .attr("cy",function(d) {return y(0);})
        .attr("r",function(d) {return r(0);})
        .text("hello")
          .append("title")
          .text(function(d) {return d.Keyword;})
        // .style("fill",function(d) {return c(d.continent);})
        // .style("opacity",function(d) {return o(+d.GDPcap);})

      d3.select("svg")
        .append("rect")
        .attr("width",110)
        .attr("height", 110)
        .style("fill", "none")
        .style("stroke", "red")
        .style("visibility", "hidden")
        
      svg.selectAll("rect").transition().duration(1500)
        .attr("x", 310)
        .attr("y", 60)
        .style("visibility", "visible")
      // now we initiate - moving the marks to their position

      svg.selectAll("circle").transition().duration(1000)
        .attr("cx",function(d) {return x(+d.AvgProfitUser*1);})
        .attr("cy",function(d) {return y(+d.PaidUser*1);})
        .attr("r",function(d) {
          return r((d.Cost*1)/8);
        })
        .attr("fill", function(d) {
        return color(d.AvgProfitUser);
        })
        .attr('opacity', .6)
        .style("stroke", "steelblue")
        .style("stroke-width", 2)
        
        

    })
        
    this.set('svg', svg);
  }
});