
import TableComponent from '../components/Table-Component'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadSalesItems } from '../hooks/ApiUtils'
import { useState } from 'react'

export default function SalesItems() {
    const [file, setFile] = useState<File>()
    const [inProgress, setInProgress] = useState(false)

    const handleFileChange = (e:any): void => {
        const uploadedFile = e.target.files[0]
        console.log("file:", uploadedFile)
        setFile(uploadedFile)
    }

    const handleFileUpload = (): void => {
        console.log('do upload here')
        if (!file) {
            return;
        }
        setInProgress(true)
        console.log('in progress...')
        const response = uploadSalesItems(file).then(
            result => {
                console.log(result)
                setInProgress(false)
                console.log('upload complete...')
            }
                
        );
        console.log('api called! file - ', file)
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
            {inProgress && <CircularProgress />}  
        </div>
    )
}