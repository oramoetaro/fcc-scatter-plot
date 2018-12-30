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

    // Dot style constants
    const fillColor = "#82b74b";
    const fillColor2 = "#c1946a"
    const strokeColor = "#3e4444";

    const xScale = d3.scaleLinear()
      .domain([1993, 2015])
      .range([xPadding, w - xPadding]);

    const yScale = d3.scaleTime()
      .domain([
        new Date(0, 0, 0, 0, 36, 30),
        new Date(0, 0, 0, 0, 40, 0)
      ]).range([yPadding, h - yPadding]);

    const xAxis = d3.axisBottom(xScale)
      .tickValues([
        1994,
        1997,
        2000,
        2003,
        2006,
        2009,
        2012,
        2015
      ])
      .tickFormat(d3.format("d"));

    const yAxis = d3.axisLeft(yScale)
      .tickValues([
        new Date(0, 0, 0, 0, 36, 30),
        new Date(0, 0, 0, 0, 37, 0),
        new Date(0, 0, 0, 0, 37, 30),
        new Date(0, 0, 0, 0, 38, 0),
        new Date(0, 0, 0, 0, 38, 30),
        new Date(0, 0, 0, 0, 39, 0),
        new Date(0, 0, 0, 0, 39, 30),
        new Date(0, 0, 0, 0, 40, 0)
      ]).tickFormat(
        d3.timeFormat("%M:%S")
      );

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
      .attr("data-yvalue", (d) => {
        return new Date(0, 0, 0, 0, ...d.Time.split(":"))
      })
      .attr("data-name", (d) => d.Name)
      .attr("data-nation", (d) => d.Nationality)
      .attr("data-place", (d) => d.Place)
      .attr("data-doping", (d) => d.Doping)
      .attr("cx", (d) => xScale(d.Year))
      .attr("cy", (d) => yScale(
        new Date(0, 0, 0, 0, ...d.Time.split(":"))
      ))
      .attr("r", radio)
      .attr("fill", (d) => {
        return d.Doping ? fillColor : fillColor2
      })
      .attr("stroke", strokeColor)
      .attr("onmouseover", "tooltip(this)")
      .attr("onmouseout", "$('#tooltip').hide()");

    plot.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0 ,${h-yPadding})`)
      .call(xAxis);

    plot.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${xPadding}, 0)`)
      .call(yAxis);

    // We added the legend elemente
    const legend = d3
      .select("#legend")
      .append("svg")
      .attr("width", w * 1 / 6)
      .attr("height", 50)

    legend.append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", radio)
      .attr("fill", fillColor)
      .attr("stroke", strokeColor);

    legend.append("circle")
      .attr("cx", 10)
      .attr("cy", 40)
      .attr("r", radio)
      .attr("fill", fillColor2)
      .attr("stroke", strokeColor)

    legend.append("text")
      .attr("x", 30)
      .attr("y", 10 + radio / 2)
      .text("Alegated")

    legend.append("text")
      .attr("x", 30)
      .attr("y", 40 + radio / 2)
      .text("No alegated")

    // Setting the legend position
    $("#legend").css({
      left: w * 0.73,
      top: h * 0.3
    })

  }
})();

// The tooltip function
function tooltip(circle) {
  const dot = $(circle);
  const left = parseInt(dot.attr("cx")) + 10;

  $("#tooltip").show()
    .css("top", `${dot.attr("cy")}px`)
    .css("left", `${left}px`)
    .attr("data-year", dot.attr("data-xvalue"));

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