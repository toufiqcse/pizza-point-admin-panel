import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// third-party
import NumberFormat from 'react-number-format';
// project import
import Dot from 'components/@extended/Dot';
import { MenuItem, TablePagination, TextField } from '../../../node_modules/@mui/material/index';

function createData(trackingNo, name, cName, order, price, payment, status, action) {
  return { trackingNo, name, cName, order, price, payment, status, action };
}

const rows = [
  createData(1, 'Pizza ', 'Nandini', 9, 900, 'cash', 1),
  createData(2, 'Pizza ', 'Nandini', 9, 900, 'cash', 1),
  createData(3, 'Pizza Indian', 'Toufiq', 2, 250, 'Bank', 2),
  createData(4, 'Pizza Salad', 'Shariar', 5, 550, 'Bkash', 0),
  createData(5, 'Pizza Salad', 'Shariar', 5, 550, 'Bkash', 0),
  createData(6, 'Pizza Salad', 'Shariar', 5, 550, 'Bkash', 0),
  createData(7, 'Pizza Salad', 'Shariar', 5, 550, 'Bkash', 0),
  createData(8, 'Pizza Salad', 'Shariar', 5, 550, 'Bkash', 0)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'ID No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Product Name'
  },
  {
    id: 'cName',
    align: 'left',
    disablePadding: true,
    label: 'Customer Name'
  },
  {
    id: 'order',
    align: 'left',
    disablePadding: false,
    label: ' Order'
  },
  {
    id: 'price',
    align: 'left',
    disablePadding: false,
    label: ' Price'
  },
  {
    id: 'payment',
    align: 'left',
    disablePadding: false,
    label: ' Payment'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  }
];
const status = [
  {
    value: 'processing',
    label: 'Processing'
  },
  {
    value: 'pending',
    label: 'Pending'
  },
  {
    value: 'shipping',
    label: 'Shipping '
  },
  {
    value: 'delivered',
    label: 'Delivered'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('trackingNo');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected] = useState([]);
  const [value, setValue] = useState('processing');
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 100));
    setPage(0); // Reset page when changing rows per page
  };

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            },
            '& .MuiTableHead-root:first-of-type': {
              backgroundColor: '#e0e0e0'
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.trackingNo);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{ cursor: 'pointer' }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.trackingNo}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      <Link color="secondary" component={RouterLink} to="">
                        {row.trackingNo}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.cName}</TableCell>
                    <TableCell align="left">
                      <NumberFormat value={row.order} displayType="text" thousandSeparator />
                    </TableCell>
                    <TableCell align="left">
                      <NumberFormat value={row.price} displayType="text" thousandSeparator prefix="$" />
                    </TableCell>
                    <TableCell align="left">
                      <TableCell align="left">{row.payment}</TableCell>
                    </TableCell>
                    <TableCell align="left">
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
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '16px',
            color: '#1890FF',
            backgroundColor: '#F0F0F0',
            fontSize: '1rem'
          }}
        />
      )}
    </Box>
  );
}
