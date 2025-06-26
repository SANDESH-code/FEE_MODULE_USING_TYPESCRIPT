import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const UserStats = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        fill: true,
        label: 'Total Users',
        data: [2200, 2300, 2400, 2600, 2750, 2847],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
        <div className="flex gap-8">
          <div>
            <div className="text-2xl font-bold mb-1">2,847</div>
            <div className="text-sm text-gray-500">Students</div>
            <div className="text-xs text-green-600 mt-1">+12.5% from last month</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">164</div>
            <div className="text-sm text-gray-500">Faculty</div>
            <div className="text-xs text-red-600 mt-1">-4.2% from last month</div>
          </div>
        </div>
      </div>
      <div className="h-[200px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default UserStats;
