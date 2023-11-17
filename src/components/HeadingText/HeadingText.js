// material-ui
import { Typography } from '@mui/material';
import { Box } from '../../../node_modules/@mui/material/index';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const HeadingText = ({ heading }) => {
  return (
    <Box
      sx={{
        background: '#0F4D92',
        pl: '12px',
        borderRadius: '4px 4px 0 0',
        color: '#fff',
        py: '14px',
        width: '100%'
      }}
    >
      <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>{heading}</Typography>
    </Box>
  );
};

export default HeadingText;
