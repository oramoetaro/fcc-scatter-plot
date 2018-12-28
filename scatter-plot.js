(function () {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onload = () => {
    const dataset = JSON.parse(xhttp.responseText);
    
    const [w, h] = [800, 500];
    const xPadding = 10;
    const yPadding = 20;
    const radio = 10;

    const xScale = d3.scaleLinear()
    .domain([
      d3.min(dataset, (d) => d.Year),
      d3.max(dataset, (d) => d.Year)
    ]).range([xPadding, w - xPadding]);

    const yScale = d3.scaleTime()
    .domain([
      d3.min(dataset, (d) => (
        new Date(0,0,0,0,...d.Time.split(":"))
      )),
      d3.max(dataset, (d) => (
        new Date(0,0,0,0,...d.Time.split(":"))
      ))
    ]).range([yPadding, h - yPadding]);

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
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(
      new Date(0,0,0,0,...d.Time.split(":"))
    ))
    .attr("r", radio)
    .attr("fill", "purple");

    //$("#chart").text(JSON.stringify(json));
  }
})();

function format(str) {
  return new Date(0,0,0,0,...str.split(":"));
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