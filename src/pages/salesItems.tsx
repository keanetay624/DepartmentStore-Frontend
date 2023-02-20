
import TableComponent from '../components/Table-Component'
import Fab from '@mui/material/Fab';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function SalesItems() {
    return (
        <div>
            <TableComponent />
            <Fab color="primary" aria-label="add">
                <AttachFileIcon />
            </Fab>
        </div>
    )
}