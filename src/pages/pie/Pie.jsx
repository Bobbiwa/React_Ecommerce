import React from 'react'
import ReactECharts from 'echarts-for-react';

export default function Bar() {
  const getOption = () => {
    return {
      title: {
        text: 'Bar chart'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      series: [
        {
          name: '销量',
          type: 'pie',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
  }

  return (
    <ReactECharts option={getOption()} style={{height:"430px"}}/>
  )
}
