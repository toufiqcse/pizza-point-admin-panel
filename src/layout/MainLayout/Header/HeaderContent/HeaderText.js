// material-ui
import { Box } from '@mui/material';

// assets

import { Typography } from '../../../../../node_modules/@mui/material/index';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

function formatDate(date) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short'
  };
  return date.toLocaleDateString('en-US', options);
}
const currentDate = new Date();
const formattedDate = formatDate(currentDate);

const HeaderText = () => (
  <Box sx={{ width: { xs: '100%', md: '50%' }, ml: { xs: 2, md: 2 }, mt: { xs: 1.5, md: 1.5 } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <Typography variant="h4" color="primary" sx={{ lineHeight: '0' }}>
        Welcome to <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>Nandini Nila</span>
      </Typography>
      <Typography color="secondary" sx={{ fontSize: '0.8rem', marginTop: '7px' }}>
        {formattedDate}
      </Typography>
    </Box>
  </Box>
);

export default HeaderText;
