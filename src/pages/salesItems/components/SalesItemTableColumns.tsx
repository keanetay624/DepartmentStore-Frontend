import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
{ field: 'id', headerName: 'ID', width: 90 },
{
    field: 'InvoiceNo',
    headerName: 'InvoiceNo',
    width: 150,
    editable: false,
},
{
    field: 'StockCode',
    headerName: 'StockCode',
    width: 150,
    editable: false,
},
{
    field: 'Description',
    headerName: 'Description',
    width: 400,
    editable: false,
},
{
    field: 'Quantity',
    headerName: 'Quantity',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
},
{
    field: 'InvoiceDate',
    headerName: 'InvoiceDate',
    width: 150,
    editable: false,
},
{
    field: 'UnitPrice',
    headerName: 'UnitPrice',
    width: 150,
    editable: false,
},
{
    field: 'CustomerId',
    headerName: 'CustomerId',
    width: 150,
    editable: false,
},
{
    field: 'Country',
    headerName: 'Country',
    width: 150,
    editable: false,
},
];

export default columns