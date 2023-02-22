
import TableComponent from './components/SalesItemTable'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { uploadSalesItems } from '../../util/ApiUtil'
import { useState } from 'react'
import UploadMessage from '../../components/UploadMessage';
import '../../App.css'
import { Grid } from '@mui/material';
import MuiGridSpacer from '../../components/MuiGridSpacer';

export default function SalesItems() {
    const [file, setFile] = useState<File>()
    const [inUploadProgress, setInUploadProgress] = useState(false)
    const [searchVal, setSearchVal] = useState('')
    const [searchStr, setSearchStr] = useState('')

    const handleFileChange = (e:any): void => {
        const uploadedFile = e.target.files[0]
        setFile(uploadedFile)
    }

    const handleFileUpload = (): void => {
        if (!file) { return; }
        setInUploadProgress(true)
        const response = uploadSalesItems(file).then(
                result => setInUploadProgress(false)
        );
    }

    const handleSearchChange = (event:any) => {
        setSearchVal(event.target.value);
    };

    const handleSearch = () => {
        setSearchStr(searchVal);
    };

     return (
        <div style={{width:"100%"}}>
            <Grid container spacing={2} sx={{
                alignItems: 'center',
                marginTop: '1rem'
            }}>
                <MuiGridSpacer spacerSize={1}/>
                <Grid item xs={4}><TextField sx={{width:'100%'}} id="searchField" label="Search Items" variant="outlined" onChange={handleSearchChange}/></Grid>
                <MuiGridSpacer spacerSize={3}/>
                <Grid item xs={1}><Button variant="contained" onClick={handleSearch}>Search</Button></Grid>
                <Grid item xs={1}>
                    <Button variant="contained" component="label">
                        File
                        <input hidden type="file" onChange={handleFileChange}/>
                    </Button>
                </Grid>
                <Grid item xs={1}><Button onClick={handleFileUpload}>Upload</Button></Grid>
                <MuiGridSpacer spacerSize={1}/>
                <MuiGridSpacer spacerSize={5}/>
                <Grid item xs={2}>{inUploadProgress && UploadMessage("Upload in progress...")}</Grid>
                <MuiGridSpacer spacerSize={5}/>
            </Grid>
            <TableComponent searchStr={searchStr}/>
        </div>
    )
}