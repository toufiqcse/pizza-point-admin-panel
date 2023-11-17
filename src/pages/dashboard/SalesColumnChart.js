import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { Box, MenuItem, TextField } from '@mui/material';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: '10px 10px 0 0'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 6,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 5
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 20,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 10,
      vertical: 0
    }
  },
  responsive: [
    {
      breakpoint: 320,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([
    {
      name: 'Orders',
      data: [180, 90, 135, 114, 120, 145, 90]
    },
    {
      name: 'Sales',
      data: [120, 45, 78, 150, 168, 99, 70]
    }
  ]);

  const [value, setValue] = useState('today');
  const [options, setOptions] = useState(columnChartOptions);
  const status = [
    {
      value: 'today',
      label: 'Today'
    },
    {
      value: 'yesterday',
      label: 'Yesterday'
    },
    {
      value: 'month',
      label: 'This Month'
    },
    {
      value: 'prevMonth',
      label: 'Prev Month'
    },
    {
      value: 'year',
      label: 'This Year'
    }
  ];

  useEffect(() => {
    // Function to get dynamic data based on the selected status
    const getDataForStatus = (status) => {
      switch (status) {
        case 'today':
          return {
            Orders: [180, 90, 135, 114, 120, 145, 90],
            Sales: [120, 45, 78, 150, 168, 99, 70]
          };
        case 'yesterday':
          return {
            Orders: [150, 80, 120, 100, 110, 130, 80],
            Sales: [110, 30, 60, 130, 150, 80, 50]
          };
        case 'month':
          return {
            Orders: [200, 100, 150, 130, 140, 160, 120],
            Sales: [140, 60, 90, 180, 200, 120, 90]
          };
        case 'prevMonth':
          return {
            Orders: [180, 90, 135, 114, 120, 145, 90],
            Sales: [120, 45, 78, 150, 168, 99, 70]
          };
        case 'year':
          return {
            Orders: [1200, 600, 900, 780, 840, 960, 720],
            Sales: [840, 360, 540, 1080, 1200, 720, 540]
          };
        default:
          return {
            Orders: [],
            Sales: []
          };
      }
    };

    const data = getDataForStatus(value);

    // Set dynamic data based on the selected status
    setSeries([
      {
        name: 'Orders',
        data: data.Orders
      },
      {
        name: 'Sales',
        data: data.Sales
      }
    ]);

    // Update chart options
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [value, primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      <Box>
        <TextField
          id="standard-select-currency"
          size="small"
          select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
        >
          {status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  );
};

export default SalesColumnChart;
