const ctx = document.getElementById('myChart');

const xLabels = [];
const yTemps = [];

async function getCSV() {
    await csvFetch();
    new Chart(ctx, {
        type: 'line',
        data: {
          labels: xLabels,
          datasets: [{
            label: 'Global Average Temperature',
            fill: false,
            data: yTemps,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
              y: {
                  ticks: {
                      callback: function(value, index, ticks) {
                          return value + '°' ;
                      }
                  }
              }
          }
        }
      });
    
}
getCSV()
 

  

    async function csvFetch() {
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();
    const table = data.split("\n").slice(1)

    //console.log(data)
    //console.log(rows)

    table.forEach(element => {
       
        const columns = element.split(',');
        const year = columns[0]
        const temp = columns[1]

        xLabels.push(year)
        yTemps.push(parseFloat(temp) + 14)
        console.log(year , temp)
    });
}

