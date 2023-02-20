import * as React from 'react';
import { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SalesItemData from '../assets/DataInterface'
import SalesItemSampleData from '../assets/SalesItemSampleData'
import { getSalesItems } from '../hooks/ApiUtils'
import '../App.css'

export default function TableComponent() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = useState<SalesItemData[]>([])
  const [totalSearchResults, setTotalSearchResults] = useState(0)
  const [searchStr, setSearchStr] = useState('');

  const handleSearchChange = (event:any) => {
    setSearchStr(event.target.value);
  };

  useEffect(() => {
    const params = {
      searchStr: '',
      limit: pageSize,
      offset: page,
    }
    getSalesItems(params).then(
      res => {
        const salesItems = res.data
        let salesItemsArray: SalesItemData[] = []

        salesItems.results.map((item: any) => {
          const currentItem: SalesItemData = {
            id: item.id,
            InvoiceNo: item.invoiceNo,
            InvoiceDate: item.invoiceDate,
            StockCode: item.stockCode,
            Description: item.description,
            UnitPrice: item.unitPrice,
            CustomerId: item.customerId,
            Quantity: item.quantity,
            Country: item.country
          }
          salesItemsArray.push(currentItem)
        })
        setTotalSearchResults(res.data.totalSearchCount)
        setRows([])
        setRows([...salesItemsArray])
      })
  }, [page, pageSize])

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

  return (
    <Box className="salesItemTable">
      <TextField id="searchField" label="Search Items" variant="outlined" onChange={handleSearchChange}/>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowCount={totalSearchResults}
        autoHeight
      />
    </Box>
  );
}