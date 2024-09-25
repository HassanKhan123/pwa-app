import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import "./index.css";

const LineChart = ({ chartData, currency = 'USD' }: any) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  const firstElements = chartData.map((subArray: any) => subArray[0]);
  const secondElements = chartData.map((subArray: any) => subArray[1] + 'a');
 
  // const convertDate = firstElements.map((ele: number) => new Date(ele).getDate() + '/' + monthNames[new Date(ele).getMonth()] )
  const chartOptions = useMemo(
    () => ({
      chart: {
        id: "basic-line-chart",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false
        },
      },

      colors: ["#12fda0"],

      xaxis: {
        decimalsInFloat: 0,
        tooltip: {
          enabled: false,
        },

        axisTicks: {
          show: false, // Hide the x-axis ticks
        },
        axisBorder: {
          show: false, // Hide the x-axis border line
        },

        categories: firstElements,
        labels: {
          show: true,
          style: {
            colors: "#fff",
            fontSize: "13px",
          },
        },
      },
      yaxis: {
        // min: 0,
        decimalsInFloat: 0,
        labels: {
          offsetY: -15,
          offsetX: -15,
          formatter: function (value: any) {
            return `${currency} ${value}`;
          },
          // rotate: -90,
          style: {
            colors: "#fff",
            fontSize: "15px",
          },
        },
      },

      grid: {
        show: false,
        padding: {
          left: 30,
          right: 30,
        },
      },

      // responsive: [
      //   {
      //     breakpoint: 1000,
      //     options: {
      //       xaxis: {
      //         labels: {
      //           show: true, // Show x-axis labels on small screens
      //           style: {

      //             fontSize: "10px", // Adjust label size for smaller screens
      //           },
      //         },
      //       },
      //       yaxis: {
      //         labels: {
      //           show: true, // Show x-axis labels on small screens
      //           style: {
      //             fontSize: "10px", // Adjust label size for smaller screens
      //           },
      //         },
      //       },
      //       plotOptions: {
      //         bar: {
      //           horizontal: false,
      //         },
      //       },
      //       legend: {
      //         position: "bottom",
      //       },
      //     },
      //   },
      // ],

      // responsive: [
      //   {
      //     breakpoint: 1000,
      //     options: {
      //       xaxis: {
      //         labels: {
      //           show: true, // Show x-axis labels on small screens
      //           style: {
      //             fontSize: '10px', // Adjust label size for smaller screens
      //           },
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 600,
      //     options: {
      //       chart: {
      //         width: '100%', // Adjust the chart width
      //       },
      //       xaxis: {
      //         labels: {
      //           show: true, // Show x-axis labels on small screens
      //           style: {
      //             fontSize: '8px', // Adjust label size for smaller screens
      //           },
      //         },
      //       },
      //     },
      //   },
      // ],

      tooltip: {
        enabled: true, // Enable tooltips
        theme: "dark",
        x: {
          show: true, // Show the x-axis value in the tooltip
        },
        y: {
          title: {
            formatter: (seriesName: any) => "Sales: ", // Custom text before the y-axis value
          },
        },
        custom: function ({ series, seriesIndex, dataPointIndex }: any) {
          return (
            '<div class="custom-tooltip">' +
            "<span>" +
            series[seriesIndex][dataPointIndex].toFixed(8) +
            "</span>" +
            "</div>"
          );
        },
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "red",
        opacity: 0.35,
      },
    }),
    []
  );

  const chartSeries = useMemo(
    () => [
      {
        name: "Sales",
        // data: [30, 40, 30, 50, 40, 60, 70, 41, 125, 140, 150, 160],
        data: secondElements,
        colors: [
          "#B7A0E0",
          "#EC99C2",
          "#FEBF89",
          "#FFE083",
          "#C4F9CA",
          "#A3C4F3",
          "#98F5E1",
          "#FDE4CF",
        ],
        stroke: "red",
      },
    ],
    []
  );
  return (
    <div className="line-chart">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        // height="450"
        maxHight="450"
        // width="600"
      />
    </div>
  );
};

export default LineChart;
