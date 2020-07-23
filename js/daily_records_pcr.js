function records_pcr_Array(str) {
  const csvData = [];
  const lines = str.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    var cells = lines[i].split(",");
    csvData.push(cells);
  }
  return csvData;
}
function records_pcr_Chart(data) {
  const tmpLabels = [], tmpData1 = [], tmpData2 = [];
  for (var row in data) {
    tmpLabels.push(data[row][0])
    tmpData1.push(data[row][1])
  };
  const ctx = document.getElementById("pcr_daily").getContext("2d");
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tmpLabels,
      datasets: [
        { label: "PCR検査数", data: tmpData1, backgroundColor: "skyblue" },
      ]
    },
    options: {
        responsive: true, //trueにすると画面の幅に合わせて作図してしまう
        maintainAspectRatio: false,
        legend: {
            display: false
         },
        scales: {
          xAxes: [{
            display: true,
            stacked: false,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              drawBorder: true
            },
            ticks: {
             fontColor: "rgb(0, 0, 0, 0)",
             min: 0,
             max: 150,
             stepSize: 30
             }
          }]
        }
      }
  });
}

function main() {
  const req = new XMLHttpRequest();
  const filePath = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1665332061&single=true&output=csv';
  req.open("GET", filePath, true);
  req.onload = function() {
    data = records_pcr_Array(req.responseText);
    records_pcr_Chart(data);
  }
  req.send(null);
}

main();
