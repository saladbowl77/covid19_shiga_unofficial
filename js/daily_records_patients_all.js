function patients_all_Array(str) {
  const csvData = [];
  const lines = str.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    var cells = lines[i].split(",");
    csvData.push(cells);
  }
  return csvData;
}
function patients_all_Chart(data) {
  const tmpLabels = [], tmpData1 = [], tmpData2 = [];
  for (var row in data) {
    tmpLabels.push(data[row][0])
    tmpData1.push(data[row][1])
  };
  const ctx = document.getElementById("patients_all").getContext("2d");
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tmpLabels,
      datasets: [
        { label: "感染者数", data: tmpData1, backgroundColor: "skyblue" },
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
             max: 140,
             stepSize: 20
             }
          }]
        }
      }
  });
}

function main() {
  const req = new XMLHttpRequest();
  const filePath = '../data/daily_records_patients_all.csv';
  req.open("GET", filePath, true);
  req.onload = function() {
    data = patients_all_Array(req.responseText);
    patients_all_Chart(data);
  }
  req.send(null);
}

main();
