(function () {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onload = () => {
    const dataset = JSON.parse(xhttp.responseText);
    
    // Setting size of plot
    const [w, h] = [800, 350];
    const xPadding = 50;
    const yPadding = 20;
    const radio = 7;

    const xScale = d3.scaleLinear()
    .domain([1993, 2015])
    .range([xPadding, w - xPadding]);

    const yScale = d3.scaleTime()
    .domain([
        new Date(0,0,0,0,36,50),
        new Date(0,0,0,0,40,0)
    ]).range([yPadding, h - yPadding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    yAxis.tickFormat(d3.timeFormat("%M:%S"));

    const plot = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    plot.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => d.Time)
    .attr("data-name", (d) => d.Name)
    .attr("data-nation", (d) => d.Nationality)
    .attr("data-place", (d) => d.Place)
    .attr("data-doping", (d) => d.Doping)
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(
      new Date(0,0,0,0,...d.Time.split(":"))
    ))
    .attr("r", radio)
    .attr("fill", "#6b5b95")
    .attr("onmouseover", "tooltip(this)")
    .attr("onmouseout", "$('#tooltip').hide()");

    plot.append("g")
    .attr("transform", `translate(0 ,${h-yPadding})`)
    .call(xAxis);

    plot.append("g")
    .attr("transform", `translate(${xPadding}, 0)`)
    .call(yAxis);

    // $("#chart").text(JSON.stringify(dataset));
  }
})();

function tooltip(circle) {
  const dot = $(circle);
  const left = parseInt(dot.attr("cx")) + 10;

  $("#tooltip").show()
  .css ("top", `${dot.attr("cy")}px`)
  .css("left", `${left}px`);
  
  $("#name").text(dot.attr("data-name"));
  $("#nation").text(dot.attr("data-nation"));
  $("#place").text(dot.attr("data-place"));
  $("#year").text(dot.attr("data-xvalue"));
  $("#time").text(dot.attr("data-yvalue"));
  $("#doping").text(dot.attr("data-doping"));

}

const obj = {
  "Time": "36:50",
  "Place": 1,
  "Seconds": 2210,
  "Name": "Marco Pantani",
  "Year": 1995,
  "Nationality": "ITA",
  "Doping": "Alleged drug use during 1995 due to high hematocrit levels",
  "URL": "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use"
}