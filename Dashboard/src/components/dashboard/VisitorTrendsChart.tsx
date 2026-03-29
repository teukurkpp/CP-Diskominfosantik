import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";

export default function VisitorTrendsChart() {
  const options: ApexOptions = {
    legend: {
      show: false, // Hide legend
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"], // Define line colors
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: "smooth", // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: "#fff", // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true, // Enable tooltip
      x: {
        format: "dd MMM yyyy", // Format for x-axis tooltip
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", // Adjust font size for y-axis labels
          colors: ["#6B7280"], // Color of the labels
        },
      },
      title: {
        text: "", // Remove y-axis title
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Pengunjung",
      data: [1800, 1900, 1700, 1600, 1750, 1650, 1700, 2050, 2300, 2100, 2400, 2350],
    },
    {
      name: "Halaman Dilihat",
      data: [2800, 2600, 2900, 2400, 2500, 2300, 2700, 3100, 3300, 3200, 3500, 3400],
    },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Statistik Tren Pengunjung
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Perbandingan jumlah pengunjung tiap bulan
            </p>
          </div>
          <div className="flex-shrink-0">
            <ChartTab />
          </div>
        </div>

        <div className="h-[320px]"> {/* Fixed height container */}
          <Chart 
            options={options} 
            series={series} 
            type="area" 
            height={320}
          />
        </div>
      </div>
    </div>
  );
}