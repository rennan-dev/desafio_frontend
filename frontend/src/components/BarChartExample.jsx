import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export default function BarChartExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/battery")
      .then((res) => res.json())
      .then((battery) => {
        const parsedData = [
          {
            name: new Date(battery.timestamp).toLocaleTimeString(),
            battery_level: battery.battery_level
          }
        ];
        setData(parsedData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da bateria:", error);
      });
  }, []);

  return (
    <Card className="w-full p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Nível da Bateria</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="battery_level" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}