import { Snackbar, Alert } from "@mui/material"

function alert(status: number, message: string) {
    if(status === 200) {
        return (<Alert severity="success" sx={{ width: '100%' }}>{message}</Alert>);
    }else {
        return (<Alert severity="error" sx={{ width: '100%' }}>{message}</Alert>);

    }
}

export default function SuccessAlert({status, alertOpen, setAlertOpen, message}: any) {
    return (
        <Snackbar onClose={() => setAlertOpen(false)} open={alertOpen} autoHideDuration={5000}>

            {alert(status, message)}

        </Snackbar>
    )
}