import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import { Toaster } from '@/components/ui/toaster';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, BarChart, Line, Bar } from 'recharts';

const chartDefinitions = [
  {
    path: '/instant-current',
    title: 'Corrente Instantânea (mAh)',
    dataKey: 'inst_curr',
    ChartComponent: LineChart,
    SeriesComponent: Line,
    stroke: 'hsl(var(--primary))',
    fill: 'hsl(var(--primary))',
  },
  {
    path: '/battery-level',
    title: 'Nível de Bateria (%)',
    dataKey: 'battery_level',
    ChartComponent: BarChart,
    SeriesComponent: Bar,
    stroke: 'hsl(var(--success))',
    fill: 'hsl(var(--success))',
  },
  {
    path: '/battery-temp',
    title: 'Temperatura da Bateria (°C)',
    dataKey: 'batteryTempCelsius',
    ChartComponent: LineChart,
    SeriesComponent: Line,
    stroke: 'hsl(var(--warning))',
    fill: 'hsl(var(--warning))',
  },
  {
    path: '/cpu-temp',
    title: 'Temperatura da CPU (°C)',
    dataKey: 'cpuTempCelsius',
    ChartComponent: LineChart,
    SeriesComponent: Line,
    stroke: 'hsl(var(--destructive))',
    fill: 'hsl(var(--destructive))',
  },
];

function App() {
  const [data, setData] = useState([]);
  const [hoveredData, setHoveredData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    //const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    async function fetchAndMerge() {
      try {
        const [tempRes, battRes] = await Promise.all([
          fetch('/battery'),
          fetch('/temperature')
        ]);
        const tempData = await tempRes.json();
        const battData = await battRes.json();

        //mescla por timestamp
        const map = new Map();
        tempData.forEach(d => {
          map.set(d.timestamp, { ...d });
        });
        battData.forEach(d => {
          const existing = map.get(d.timestamp);
          if(existing) {
            map.set(d.timestamp, { ...existing, ...d });
          }else {
            map.set(d.timestamp, { ...d });
          }
        });

        //ordena e converte pra array
        const merged = Array.from(map.values())
          .sort((a, b) => a.timestamp - b.timestamp)
          .filter(d => d.temp_bat != null && d.temp_cpu != null);

        setData(merged);

        if(merged.length > 0) {
          setHoveredData(merged[merged.length - 1]);
        }
      }catch(err) {
        console.error('Erro ao buscar dados da API', err);
      }
    }

    fetchAndMerge();
  }, []);

  const handleChartHover = (dataPoint) => {
    if(dataPoint) {
      setHoveredData(dataPoint);
    }
  };

  if(data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          Carregando dados...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar data={hoveredData} />
      <main className="flex-1 ml-72">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/instant-current" replace />} />
            {chartDefinitions.map((chartConfig) => (
              <Route
                key={chartConfig.path}
                path={chartConfig.path}
                element={
                  <motion.div
                    key={chartConfig.path + '-motion'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard
                      data={data}
                      onHover={handleChartHover}
                      chartConfig={chartConfig}
                    />
                  </motion.div>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </main>
      <Toaster />
    </div>
  );
}

export default App;