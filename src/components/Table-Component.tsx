import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SalesItemData from '../assets/DataInterface'


function createData(
  InvoiceNo: string,
    StockCode: string,
    Description: string,
    Quantity: number,
    InvoiceDate: string,
    UnitPrice: number,
    CustomerId: number,
    Country: string
): SalesItemData {
  return {
    InvoiceNo,
    StockCode,
    Description,
    Quantity,
    InvoiceDate,
    UnitPrice,
    CustomerId,
    Country
  };
}

const rows = [
  createData('536365', '85123A', 'WHITE HANGING HEART T-LIGHT HOLDER', 67, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '71053', 'WHITE METAL LANTERN', 51, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '84406B', 'CREAM CUPID HEARTS COAT HANGER', 24, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '84029G', 'KNITTED UNION FLAG HOT WATER BOTTLE', 24, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '84029E', 'RED WOOLLY HOTTIE WHITE HEART.', 49, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '22752', 'SET 7 BABUSHKA NESTING BOXES', 87, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '21730', 'GLASS STAR FROSTED T-LIGHT HOLDER', 37, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '22633', 'HAND WARMER UNION JACK', 94, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '22632', 'HAND WARMER RED POLKA DOT', 65, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '84879', 'ASSORTED COLOUR BIRD ORNAMENT', 98, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '22745', "POPPY'S PLAYHOUSE BEDROOM ", 81, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '22748', "POPPY'S PLAYHOUSE KITCHEN ", 9, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
  createData('536365', '22749', 'FELTCRAFT PRINCESS CHARLOTTE DOLL', 63, '12/1/2010  8:26', 13.2, 15311, 'United Kingdom'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof SalesItemData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'InvoiceNo',
    numeric: false,
    disablePadding: true,
    label: 'InvoiceNo',
  },
  {
    id: 'StockCode',
    numeric: false,
    disablePadding: false,
    label: 'StockCode',
  },
  {
    id: 'Description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'Quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'InvoiceDate',
    numeric: false,
    disablePadding: false,
    label: 'InvoiceDate',
  },
  {
    id: 'UnitPrice',
    numeric: true,
    disablePadding: false,
    label: 'UnitPrice',
  },
  {
    id: 'CustomerId',
    numeric: true,
    disablePadding: false,
    label: 'CustomerId',
  },
  {
    id: 'Country',
    numeric: false,
    disablePadding: false,
    label: 'Country',
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof SalesItemData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof SalesItemData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Sales Items
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function TableComponent() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof SalesItemData>('InvoiceNo');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SalesItemData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.InvoiceNo);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
    <Box sx={{ width: '100vw'}}>
      <Paper sx={{ width: '100%'}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.InvoiceNo);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.InvoiceNo)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.InvoiceNo}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.InvoiceNo}
                      </TableCell>
                      <TableCell align="right">{row.StockCode}</TableCell>
                      <TableCell align="right">{row.Description}</TableCell>
                      <TableCell align="right">{row.Quantity}</TableCell>
                      <TableCell align="right">{row.InvoiceDate}</TableCell>
                      <TableCell align="right">&#36;{row.UnitPrice}</TableCell>
                      <TableCell align="right">{row.CustomerId}</TableCell>
                      <TableCell align="right">{row.Country}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </div>
    
  );
}