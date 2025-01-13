import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import api from '../../api/api';

export default function DashboardChart() {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0], // 초기 값 설정
    labels: ['전체 할 일', '오늘 할 일', '작업'], // 초기 레이블 설정
  });
  const [chartKey, setChartKey] = useState(0); // 강제 리렌더링을 위한 키

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/dashboard/summary');
        const { completionRate, categories } = response.data;

        // 데이터 설정
        setChartData({
          series: [
            Math.round(completionRate || 0),
            Math.round(categories.today.completionRate || 0),
            Math.round(categories.work.completionRate || 0),
          ],
          labels: ['전체 할 일', '오늘 할 일', '작업'],
        });

        // 강제로 차트 리렌더링
        setChartKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchSummary();
  }, []);

  const options = {
    chart: {
      type: 'radialBar',
      height: 390,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
            fontSize: '16px',
            formatter: function (val) {
              return `${Math.round(val)}%`;
            },
          },
          total: {
            show: true,
            label: '총 완료율',
            formatter: function (w) {
              return `${Math.round(
                w.globals.seriesTotals.reduce((a, b) => a + b, 0) /
                  w.globals.series.length,
              )}%`;
            },
          },
        },
      },
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E'],
    labels: chartData.labels,
    tooltip: {
      enabled: true,
      formatter: function (val, opts) {
        return `${opts.series[opts.seriesIndex]}%`;
      },
    },
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 70,
      offsetY: 10,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}%`;
      },
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart
        key={chartKey} // 강제 리렌더링을 위한 키
        options={options}
        series={chartData.series}
        type='radialBar'
        height={400}
      />
    </div>
  );
}
