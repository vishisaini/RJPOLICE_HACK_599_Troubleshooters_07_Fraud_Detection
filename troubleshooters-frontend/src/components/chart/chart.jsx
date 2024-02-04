import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  '30/12/2023',
  '12/01/2023',
  '14/01/2023',
  '14/01/2023',
  '15/01/2023',
  '15/01/2023',
  '16/01/2023',
];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: pData },
        // { data: uData },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}



// import React, { useEffect, useState } from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

// export default function RealTimeLineChart({ senderAccount }) {
//   const [transactionData, setTransactionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/api/transactions/${senderAccount}`);
//         const data = await response.json();
//         setTransactionData(data);
//       //  console.log(data);
//       } catch (error) {
//         console.error('Error fetching transaction data:', error);
//       }
//     };

//     const intervalId = setInterval(fetchData, 500000); 

//     return () => clearInterval(intervalId); 
//   }, [senderAccount]);

//   const xLabels = transactionData.map((transaction) => transaction.transaction_date);
//   const yData = transactionData.map((transaction) => transaction.amount);

//   return (
//     <LineChart
//       width={500}
//       height={300}
//       series={[{ data: yData }]}
//       xAxis={[{ scaleType: 'point', data: xLabels }]}
//       yAxis={[
//         {
//           scaleType: 'linear',
//           tickInterval: 10000, 
//         },
//       ]}
//     />
//   );
// }