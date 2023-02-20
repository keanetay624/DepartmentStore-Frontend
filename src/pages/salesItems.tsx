
import TableComponent from '../components/Table-Component'
import Button from '@mui/material/Button';
import { uploadSalesItems } from '../hooks/ApiUtils'
import { useState } from 'react'

export default function SalesItems() {
    const [file, setFile] = useState<File>()

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
        const response = uploadSalesItems(file);
        console.log('api called! file - ', file)
    }
     return (
        <div>
            <TableComponent />
            <Button variant="contained" component="label">
                Choose File
                <input hidden type="file" onChange={handleFileChange}/>
            </Button>
            <Button onClick={handleFileUpload}>
                Upload
            </Button>
        </div>
    )
}