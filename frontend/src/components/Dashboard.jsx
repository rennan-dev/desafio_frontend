import React, { useState, useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTooltip from '@/components/charts/CustomTooltip';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = ({ data, onHover, chartConfig }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const processedData = useMemo(() => data.map(d => ({
    ...d,
    batteryTempCelsius: parseFloat((d.temp_bat / 1000).toFixed(1)),
    cpuTempCelsius: parseFloat((d.temp_cpu / 1000).toFixed(1)),
    date: new Date(d.timestamp).toLocaleDateString('pt-BR'),
  })), [data]);

  const availableDates = useMemo(() => {
    const dates = [...new Set(processedData.map(d => d.date))];
    dates.sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('/');
      const [dayB, monthB, yearB] = b.split('/');
      return new Date(`${yearA}-${monthA}-${dayA}`) - new Date(`${yearB}-${monthB}-${dayB}`);
    });
    return dates;
  }, [processedData]);

  useState(() => {
    if(availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[availableDates.length - 1]);
    }
  }, [availableDates, selectedDate]);
  

  const chartDataForSelectedDate = useMemo(() => {
    if(!selectedDate) return [];
    return processedData.filter(d => d.date === selectedDate);
  }, [processedData, selectedDate]);


  const commonChartProps = {
    onMouseMove: (e) => {
      if (e && e.activePayload && e.activePayload.length > 0) {
        onHover(e.activePayload[0].payload);
      }
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const getXTicks = (dataForDay) => {
    if(!dataForDay || dataForDay.length === 0) return [];
    const ticks = [];
    const firstTimestamp = dataForDay[0].timestamp;
    
    let currentTick = new Date(firstTimestamp);
    currentTick.setHours(0,0,0,0); 

    for(let i=0; i<=24; i+=3) {
        const tickTime = new Date(currentTick);
        tickTime.setHours(i);
        ticks.push(tickTime.getTime());
    }
    return ticks;
  };
  
  const ChartRenderer = chartConfig.ChartComponent;
  const SeriesRenderer = chartConfig.SeriesComponent;

  const handleDateChange = (direction) => {
    const currentIndex = availableDates.indexOf(selectedDate);
    let newIndex = currentIndex + direction;
    if(newIndex < 0) newIndex = availableDates.length - 1;
    if(newIndex >= availableDates.length) newIndex = 0;
    setSelectedDate(availableDates[newIndex]);
  };

  if(!selectedDate || chartDataForSelectedDate.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground mb-4">
          {selectedDate ? `Não há dados para ${selectedDate}.` : "Selecionando data..."}
        </p>
        {availableDates.length > 0 && (
            <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => handleDateChange(-1)} disabled={availableDates.length <=1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-28 text-center">{selectedDate || "N/A"}</span>
            <Button variant="outline" size="icon" onClick={() => handleDateChange(1)} disabled={availableDates.length <=1}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div 
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-foreground">{chartConfig.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => handleDateChange(-1)} disabled={availableDates.length <=1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-28 text-center">{selectedDate}</span>
              <Button variant="outline" size="icon" onClick={() => handleDateChange(1)} disabled={availableDates.length <=1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ChartRenderer data={chartDataForSelectedDate} {...commonChartProps}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="timestamp" 
                  ticks={getXTicks(chartDataForSelectedDate)}
                  tickFormatter={(ts) => new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  stroke="hsl(var(--foreground))"
                  tick={{ fontSize: 12 }}
                  domain={[new Date(selectedDate + " 00:00:00").getTime(), new Date(selectedDate + " 23:59:59").getTime()]}
                  type="number"
                  scale="time"
                />
                <YAxis 
                  stroke="hsl(var(--foreground))"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--primary), 0.1)' }} />
                <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                <SeriesRenderer 
                  type="monotone" 
                  dataKey={chartConfig.dataKey} 
                  name={chartConfig.title.substring(0, chartConfig.title.indexOf('(') !== -1 ? chartConfig.title.indexOf('(') -1 : undefined)} 
                  stroke={chartConfig.stroke} 
                  fill={chartConfig.fill} 
                  dot={chartDataForSelectedDate.length < 100 ? { r: 3, strokeWidth: 2 } : false}
                  activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2 }} 
                />
              </ChartRenderer>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;