
import TableComponent from '../components/Table-Component'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadSalesItems } from '../hooks/ApiUtils'
import { useState } from 'react'

export default function SalesItems() {
    const [file, setFile] = useState<File>()
    const [inUploadProgress, setInUploadProgress] = useState(false)
    const uploadMessage = () => {
        return (
        <div>
            <CircularProgress />
            <span >Uploading in progress...</span>
        </div>
        )
    }

    const handleFileChange = (e:any): void => {
        const uploadedFile = e.target.files[0]
        console.log("file:", uploadedFile)
        setFile(uploadedFile)
    }

    const handleFileUpload = (): void => {
        console.log('do upload here')
        if (!file) { return; }
        setInUploadProgress(true)
        const response = uploadSalesItems(file).then(
                result => setInUploadProgress(false)
        );
    }
     return (
        <div style={{width:"100%"}}>
            <TableComponent />
            <Button variant="contained" component="label">
                Choose File
                <input hidden type="file" onChange={handleFileChange}/>
            </Button>
            <Button onClick={handleFileUpload}>
                Upload
            </Button>
            {inUploadProgress && uploadMessage()}  
        </div>
    )
}