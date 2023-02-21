
import TableComponent from './components/SalesItemTable'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { uploadSalesItems } from '../../util/ApiUtil'
import { useState } from 'react'
import UploadMessage from '../../components/UploadMessage';
import Container from '@mui/system/Container';

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
            <Container>
                <TextField id="searchField" label="Search Items" variant="outlined" onChange={handleSearchChange}/>
                <Button variant="contained" onClick={handleSearch}>Search</Button>
                <Button variant="contained" component="label">
                    Choose File
                    <input hidden type="file" onChange={handleFileChange}/>
                </Button>
                <Button onClick={handleFileUpload}>Upload</Button>
                {inUploadProgress && UploadMessage("Upload in progress...")}  
            </Container>
            <TableComponent searchStr={searchStr}/>
        </div>
    )
}