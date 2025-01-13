import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function DashboardChart({ completionRate, categories }) {
  // 초기값 설정
  const [chartData, setChartData] = useState({
    series: [0, 0, 0], // 초기 값: 애니메이션이 시작될 기본 상태
    labels: ['전체 할 일', '오늘 할 일', '작업'], // 초기 레이블 설정
  });
  const [chartKey, setChartKey] = useState(0); // 강제 리렌더링을 위한 키

  // 부모 컴포넌트에서 받은 데이터를 업데이트
  useEffect(() => {
    setChartData({
      series: [
        Math.round(completionRate || 0),
        Math.round(categories?.today?.completionRate || 0),
        Math.round(categories?.work?.completionRate || 0),
      ],
      labels: ['전체 할 일', '오늘 할 일', '작업'], // 레이블 유지
    });

    // 차트의 애니메이션을 위해 강제 리렌더링
    setChartKey((prevKey) => prevKey + 1);
  }, [completionRate, categories]);

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
          name: { show: true },
          value: {
            show: true,
            fontSize: '16px',
            formatter: (val) => `${Math.round(val)}%`,
          },
          total: {
            show: true,
            label: '총 완료율',
            formatter: (w) => {
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
    labels: chartData.labels, // 초기 레이블과 업데이트된 레이블 사용
    tooltip: {
      enabled: true,
      formatter: (val, opts) => `${opts.series[opts.seriesIndex]}%`,
    },
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 70,
      offsetY: 10,
      labels: { useSeriesColors: true },
      markers: { size: 0 },
      formatter: (seriesName, opts) =>
        `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}%`,
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart
        key={chartKey} // 강제 리렌더링을 위한 키
        options={options}
        series={chartData.series} // 초기값 포함
        type='radialBar'
        height={400}
      />
    </div>
  );
}
