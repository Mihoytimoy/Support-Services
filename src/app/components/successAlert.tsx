import { Snackbar, Alert } from "@mui/material";
import "../css/alerts.css"

function alert(status: number, message: string) {
  if (status === 200) {
    return (
      <Alert className="alertSuccess" variant="filled" severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    );
  } else {
    return (
      <Alert className="alertWarning" variant="filled" severity="error">
        {message}
      </Alert>
    );
  }
}

export default function SuccessAlert({
  status,
  alertOpen,
  setAlertOpen,
  message,
}: any) {
  return (
    <Snackbar
      sx={{position: "absolute"}}
      onClose={() => setAlertOpen(false)}
      open={alertOpen}
      autoHideDuration={5000000}
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
    >
      {alert(status, message)}
    </Snackbar>
  );
}
