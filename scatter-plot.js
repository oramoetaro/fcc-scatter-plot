(function () {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onload = () => {
    const dataset = JSON.parse(xhttp.responseText);

    const [w, h] = [800, 500];

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
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 25)
    .attr("fill", "purple");

    //$("#chart").text(JSON.stringify(json));
  }
})();

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