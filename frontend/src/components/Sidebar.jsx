import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Plug, BatteryCharging, Zap, Thermometer, BatteryWarning, BatteryFull, Wifi, HelpCircle, PowerOff, LineChart, BarChart as BarIcon, ThermometerSun, Cpu } from 'lucide-react';
import { getPlugType, getBatteryStatus } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const Sidebar = ({ data }) => {
  const location = useLocation();

  const renderPlugIcon = (plugType) => {
    switch (plugType) {
      case 'AC':
      case 'USB':
        return <Plug className="w-5 h-5 text-primary" />;
      case 'Wireless':
        return <Wifi className="w-5 h-5 text-primary" />;
      case 'Unplugged':
        return <PowerOff className="w-5 h-5 text-muted-foreground" />;
      default:
        return <HelpCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const renderBatteryStatusIcon = (batteryStatus) => {
    switch (batteryStatus) {
      case 'Charging':
      case 'Wireless Charging':
        return <BatteryCharging className="w-5 h-5 text-success" />;
      case 'Discharging':
        return <BatteryWarning className="w-5 h-5 text-warning" />;
      case 'Full':
        return <BatteryFull className="w-5 h-5 text-success" />;
      case 'Not Charging':
          return <BatteryWarning className="w-5 h-5 text-muted-foreground" />;
      default:
        return <HelpCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const plugTypeString = data ? getPlugType(data.plug_type) : 'N/A';
  const batteryStatusString = data ? getBatteryStatus(data.battery_status) : 'N/A';

  const sidebarItems = [
    {
      id: 'plug_type',
      icon: renderPlugIcon(plugTypeString),
      label: 'Plug Type',
      value: plugTypeString,
    },
    {
      id: 'battery_status',
      icon: renderBatteryStatusIcon(batteryStatusString),
      label: 'Battery Status',
      value: batteryStatusString,
      colorClass: batteryStatusString === 'Charging' || batteryStatusString === 'Wireless Charging' || batteryStatusString === 'Full' ? 'text-success' : (batteryStatusString === 'Discharging' ? 'text-warning' : 'text-foreground'),
    },
    {
      id: 'voltage',
      icon: <Zap className="w-5 h-5 text-primary" />,
      label: 'Voltage',
      value: data ? `${data.voltage} mV` : 'N/A',
    },
    {
      id: 'inst_curr_sidebar', 
      icon: <Zap className="w-5 h-5 text-primary" />,
      label: 'Instant Current',
      value: data ? `${data.inst_curr} mAh` : 'N/A',
      colorClass: data && data.inst_curr > 0 ? 'text-success' : (data && data.inst_curr < 0 ? 'text-warning' : 'text-foreground'),
    },
    {
      id: 'temp_bat_sidebar', 
      icon: <Thermometer className="w-5 h-5 text-primary" />,
      label: 'Battery Temp',
      value: data ? `${(data.temp_bat / 1000).toFixed(1)} °C` : 'N/A',
    },
  ];

  const navLinks = [
    { to: "/instant-current", label: "Corrente Instantânea", icon: <LineChart className="w-5 h-5 mr-2" /> },
    { to: "/battery-level", label: "Nível de Bateria", icon: <BarIcon className="w-5 h-5 mr-2" /> },
    { to: "/battery-temp", label: "Temperatura da Bateria", icon: <ThermometerSun className="w-5 h-5 mr-2" /> },
    { to: "/cpu-temp", label: "Temperatura da CPU", icon: <Cpu className="w-5 h-5 mr-2" /> },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-72 bg-card text-card-foreground p-6 space-y-6 fixed top-0 left-0 h-full shadow-lg border-r flex flex-col"
    >
      <div>
        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
          </motion.div>
          <h1 className="text-2xl font-semibold text-primary">MOB4AI</h1>
        </div>
        <Separator className="my-6" />
        <div className="space-y-4">
          {sidebarItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + sidebarItems.indexOf(item) * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 bg-primary/10 rounded-md">{item.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className={`text-sm font-semibold ${item.colorClass || 'text-foreground'}`}>{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      <nav className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground px-2">Gráficos</p>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors",
              location.pathname === link.to ? "bg-primary/10 text-primary" : "text-foreground"
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        { !data && (
          <p className="text-xs text-muted-foreground text-center">Passe o mouse sobre um gráfico para ver os detalhes.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;