// material-ui
import {
  Avatar,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MonthlyBarChart from './MonthlyBarChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

// import IncomeAreaChart from './IncomeAreaChart';
import HeadingText from 'components/HeadingText/HeadingText';
import CustomPaginationActionsTable from './LowStockOrder';

// import PaginationControlled from './PaginationControlled';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      {/* Total Order */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce bgColor="#FF9F43" hoverBg={'#f78418'} title="Total Order" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      {/* all Product */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce bgColor="#28C76F" hoverBg={'#1ece6b'} title="All Product" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      {/* all Customers */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          bgColor="#1B2850"
          hoverBg={'#172242'}
          title="Total Customer"
          count="18,800"
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      {/* Total sales */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          bgColor="#b74bf2"
          hoverBg={'#9320d6'}
          title="Total Sales"
          count={'9599'}
          percentage={27.4}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/*------------- row 2---------- */}
      <Grid item xs={12} md={6} lg={7}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/*============ Sales Report ===========*/}
          <Grid item width="100%" sx={{}}>
            <HeadingText heading="Sales Report" />
          </Grid>
        </Grid>
        <MainCard sx={{ borderRadius: '0 0 4px 4px' }}>
          <Stack>
            <SalesColumnChart />
          </Stack>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={6} lg={5}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item width="100%">
            <HeadingText heading="Low Stock Alert" />
          </Grid>
          {/* low stock order show */}
          <Grid item />
        </Grid>
        <MainCard sx={{ borderRadius: '0px 0px 4px 4px' }} content={false}>
          <CustomPaginationActionsTable />
        </MainCard>
      </Grid>

      {/*-------------- row 3----------- */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* =================Recent Orders=============== */}
          <Grid item width="100%">
            <HeadingText heading={'Recent Order'} />
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ borderRadius: '0px 0px 4px 4px' }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/*============== income overview =====*/}
          <Grid item width="100%" sx={{}}>
            <HeadingText heading={'Income Overview'} />
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ borderRadius: '0 0 4px 4px' }} content={false}>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item width="100%">
            <HeadingText heading={'Transaction History'} />
          </Grid>
        </Grid>
        <MainCard sx={{ borderRadius: '0 0 4px 4px' }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter'
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'error.main',
                    bgcolor: 'error.lighter'
                  }}
                >
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5"></Typography>
          </Grid>
          <Grid item />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
