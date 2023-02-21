
import TableComponent from '../components/SalesItemTable'
import Button from '@mui/material/Button';
import { uploadSalesItems } from '../util/ApiUtil'
import { useState } from 'react'
import UploadMessage from '../shared/UploadMessage';

export default function SalesItems() {
    const [file, setFile] = useState<File>()
    const [inUploadProgress, setInUploadProgress] = useState(false)

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
            {inUploadProgress && UploadMessage("Upload in progress...")}  
        </div>
    )
}