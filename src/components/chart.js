import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut ,Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
function Chart(props) {
 const lab=[]
const amt=[]
 props.data.forEach(item => {amt.push(item[1].Amount);
lab.push(item[1].Category)})


 const data = {
  labels: lab,
  datasets: [
    {
      label: "₹",
      data: amt,
      backgroundColor: [
        'rgba(255, 99, 132, 3)',
        'rgba(54, 162, 235, 3)',
        'rgba(255, 206, 86, 3)',
        'rgba(75, 192, 192, 3)',
        'rgba(153, 102, 255,3)',
        'rgba(255, 159, 64, 3)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

  return <Doughnut data={data} />;
}
export default Chart;