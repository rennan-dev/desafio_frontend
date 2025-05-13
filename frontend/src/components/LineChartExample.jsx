import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: 'Seg', visitas: 120 },
  { name: 'Ter', visitas: 200 },
  { name: 'Qua', visitas: 150 },
  { name: 'Qui', visitas: 220 },
  { name: 'Sex', visitas: 180 },
];

export default function LineChartExample() {
  return (
    <Card className="w-full p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Visitas por Dia</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visitas" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}