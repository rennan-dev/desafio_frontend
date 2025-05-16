import React from 'react';
import { formatTimestamp } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card className="text-sm bg-background/90 backdrop-blur-sm">
        <CardContent className="p-3">
          <p className="font-semibold text-foreground">{`Data: ${formatTimestamp(data.timestamp)}`}</p>
          <p className="text-foreground">{`Corrente: ${data.inst_curr} mAh`}</p>
          <p className="text-foreground">{`Capacidade: ${data.battery_level}%`}</p>
          <p className="text-foreground">
            {`Temp. Bateria: ${data.batteryTempCelsius != null ? data.batteryTempCelsius + ' °C' : 'N/A'}`}
          </p>
          <p className="text-foreground">
            {`Temp. CPU:     ${data.cpuTempCelsius     != null ? data.cpuTempCelsius    + ' °C' : 'N/A'}`}
          </p>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export default CustomTooltip;