import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 500,
    toolbar: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        }
      }
    },
    axisTicks: {
      show: false
    }
  },
  grid: {
    show: true
  }
};

const MonthlyBarChart = () => {
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [value] = useState('today'); // Default value for the select
  const [options, setOptions] = useState(barChartOptions);
  const [totalIncome, setTotalIncome] = useState(0);
  const [series, setSeries] = useState([
    {
      name: 'Pizza',
      data: [180, 90, 135, 114, 120, 145, 90]
    }
  ]);
  // const status = [
  //   {
  //     value: 'thisWeek',
  //     label: 'This Week'
  //   },
  //   {
  //     value: 'today',
  //     label: 'Today'
  //   },
  //   {
  //     value: 'yesterday',
  //     label: 'Yesterday'
  //   },
  //   {
  //     value: 'thisMonth',
  //     label: 'This Month'
  //   },
  //   {
  //     value: 'prevMonth',
  //     label: 'Prev Month'
  //   },
  //   {
  //     value: 'thisYear',
  //     label: 'This Year'
  //   }
  // ];

  useEffect(() => {
    // Calculate total income from the series data based on the selected status
    const selectedStatus = value;
    let incomeArray = [];

    switch (selectedStatus) {
      case 'thisWeek':
        incomeArray = [200, 120, 155, 134, 140, 165, 110];
        break;
      case 'thisMonth':
        incomeArray = [800, 400, 600, 500, 700, 650, 450];
        break;
      case 'thisYear':
        incomeArray = [5000, 3000, 4000, 3500, 4800, 5200, 4200];
        break;
      case 'yesterday':
        incomeArray = [500, 344, 245, 64, 67, 332, 976];
        break;
      case 'prevMonth':
        incomeArray = [500, 200, 100, 500, 300, 700, 100];
        break;
      default:
        incomeArray = [180, 90, 135, 114, 120, 145, 90];
    }

    // calculate total Income
    setTotalIncome(
      incomeArray
        .reduce((total, income) => total + income, 0)
        .toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
    );

    // Update chart series data
    setSeries([
      {
        name: 'Pizza',
        data: incomeArray
      }
    ]);

    // Update chart options
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
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
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, info, secondary]);

  return (
    <Box component="div" id="chart">
      <Box>
        {/* filtering */}
        <Box sx={{ p: 3, pb: 0 }}>
          <Box width="200px">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </Box>
        </Box>
        {/* Total Income */}
        <Typography sx={{ mt: -3.5, pr: 1, pb: 0, display: 'flex', justifyContent: 'right' }} variant="h3">
          {`${totalIncome} TK`}
        </Typography>
      </Box>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </Box>
  );
};

export default MonthlyBarChart;
