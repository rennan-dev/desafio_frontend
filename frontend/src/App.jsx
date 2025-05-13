import BarChartExample from './components/BarChartExample';
import LineChartExample from './components/LineChartExample';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <BarChartExample />
      <LineChartExample />
    </div>
  );
}