import * as React from 'react';
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SalesItemData from '../../../assets/DataInterface'
import { getSalesItems } from '../../../util/ApiUtil'
import columns from './SalesItemTableColumns'
import '../../../App.css'
import getSalesItemsArray from './getSalesItemsArray';

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
    const requestParams = {
      searchStr: '',
      limit: pageSize,
      offset: page,
    }
    getSalesItems(requestParams).then(
      res => {
        let salesItemsArray: SalesItemData[] = getSalesItemsArray(res.data)
        setTotalSearchResults(res.data.totalSearchCount)
        setRows(salesItemsArray)
      }) 
  }, [page, pageSize]) 

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