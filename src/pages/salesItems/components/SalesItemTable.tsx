import * as React from 'react';
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import SalesItemData from '../../../assets/DataInterface'
import { getSalesItems } from '../../../util/ApiUtil'
import columns from './SalesItemTableColumns'
import '../../../App.css'
import getSalesItemsArray from './getSalesItemsArray';

export default function TableComponent(props:any) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = useState<SalesItemData[]>([])
  const [totalSearchResults, setTotalSearchResults] = useState(0)
  const [prevSearchStr, setPrevSearchStr] = React.useState('');
  const searchStr = props.searchStr

  useEffect(() => {
    if (searchStr !== prevSearchStr) setPage(0)
    const requestParams = {
      searchStr: searchStr,
      limit: pageSize,
      offset: page,
    }
    getSalesItems(requestParams).then(
      res => {
        let salesItemsArray: SalesItemData[] = getSalesItemsArray(res.data)
        setTotalSearchResults(res.data.totalSearchCount)
        setRows(salesItemsArray)
      })
    setPrevSearchStr(searchStr)
  }, [page, pageSize, searchStr]) 

  return (
    <Box className="salesItemTable">
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
        page={page}
      />
    </Box>
  );
}