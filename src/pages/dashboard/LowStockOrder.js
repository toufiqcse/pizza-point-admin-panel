import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import { TablePagination } from '../../../node_modules/@mui/material/index';
import LowStockSearch from './LowStockSearch';

function createData(trackingNo, name, price, qty) {
  return { trackingNo, name, price, qty };
}

const rows = [
  createData(10021, 'Pizza', 500, 2),
  createData(10021, 'Pizza', 500, 5),
  createData(10021, 'Pizza', 500, 10),
  createData(10021, 'Pizza', 500, 14),
  createData(10021, 'Pizza', 500, 1),
  createData(10021, 'Pizza', 500, 3),
  createData(10021, 'Pizza', 500, 5),
  createData(10021, 'Pizza', 500, 2),
  createData(10021, 'Pizza', 500, 1),
  createData(10021, 'Pizza', 500, 3),
  createData(10021, 'Pizza', 500, 7),
  createData(10021, 'Pizza', 500, 6),
  createData(10021, 'Pizza', 500, 5),
  createData(10021, 'Pizza', 500, 1),
  createData(10021, 'Pizza', 500, 3),
  createData(10021, 'Pizza', 500, 4)
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
    label: 'Code'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Product Name'
  },

  {
    id: 'price',
    align: 'left',
    disablePadding: false,
    label: ' Price'
  },
  {
    id: 'qty',
    align: 'left',
    disablePadding: false,
    label: ' Qty'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ color: '', fontSize: '1rem', fontWeight: 600 }}
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

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('trackingNo');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [selected] = useState([]);

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
    <Box sx={{ height: '483px' }}>
      <Box sx={{ py: '8px' }}>
        {/* stock search function */}
        <LowStockSearch />
      </Box>
      <TableContainer
        sx={{
          borderRadius: '0px 0px 4px 4px',
          overflow: 'hidden',
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          backgroundColor: '#E87070',
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
                const isLowStock = row.qty < 5;

                return (
                  <TableRow
                    role="checkbox"
                    sx={{ fontSize: '1rem', fontWeight: 600, color: isLowStock ? 'red' : 'inherit' }}
                    style={{ cursor: 'pointer' }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.trackingNo}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      <Link sx={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }} component={RouterLink} to="">
                        {row.trackingNo}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }} align="left">
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }} align="left">
                      <NumberFormat value={row.price} displayType="text" thousandSeparator prefix="$" />
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }} align="center">
                      <NumberFormat value={row.qty} displayType="text" thousandSeparator />
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
