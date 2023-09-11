import * as React from "react";
import { updateStatus } from "../api/post";
import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColDef,
  GridFooterContainer,
  GridPagination,
  GridSlotsComponentsProps,
  useGridApiContext,
  GridRow,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

interface OnHoldReq {
  requestNo: number;
  reportName: string;
  branch: string;
  dateFrom: number;
  dateTo: number;
  dateRequested: number;
  requestedBy: string;
}

function createData(
  requestNo: number,
  reportName: string,
  branch: string,
  dateFrom: number,
  dateTo: number,
  dateRequested: number,
  requestedBy: string
): OnHoldReq {
  return {
    requestNo,
    reportName,
    branch,
    dateFrom,
    dateTo,
    dateRequested,
    requestedBy,
  };
}

function createDataLoop(values: any) {
  if (values !== undefined) {
    let rows = new Array();
    const length = values.data.items.length;
    for (let i = 0; i < length; i++) {
      rows.push(
        createData(
          values.data.items[i].requestNo,
          values.data.items[i].reportName,
          values.data.items[i].branch,
          values.data.items[i].dateFrom,
          values.data.items[i].dateTo,
          values.data.items[i].dateRequested,
          values.data.items[i].requestedBy
        )
      );
    }
    return rows;
  } else {
    return new Array();
  }
}

const columns: GridColDef[] = [
  { field: "requestNo", headerName: "Request No.", width: 110 },
  { field: "reportName", headerName: "Report Name", width: 120 },
  { field: "branch", headerName: "Branch", width: 80 },
  { field: "dateFrom", headerName: "Date From", width: 100 },
  { field: "dateTo", headerName: "Date To", width: 90 },
  { field: "dateRequested", headerName: "Date Requested", width: 140 },
  { field: "requestedBy", headerName: "Requested By", width: 110 },
];

function unHold(data: any, setRows: any) {
  updateStatus(data);
  setRows(null);
}

function CustomFooterComponent(props: any) {
  const apiRef = useGridApiContext();
  const homeFormButton = "homeFormButton";
  let selectedSize = apiRef.current.getSelectedRows().size;

  return (
    <GridFooterContainer>
      <Button
        className={selectedSize !== 0 ? homeFormButton : ""}
        sx={{ marginLeft: "20px" }}
        onClick={() => {
          unHold(apiRef.current.getSelectedRows().keys(), { ...props });
        }}
        variant="outlined"
        disabled={selectedSize === 0}
      >
        Confirm
      </Button>
      <GridPagination sx={{ width: "50%" }} />
    </GridFooterContainer>
  );
}

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    setRows: Function;
  }
}
export default function OnHoldTable({ values, setRows }: any) {
  const rows = createDataLoop(values);

  return (
    <Box
      component="div"
      sx={{ height: "inherit", width: "auto", maxWidth: "100%" }}
    >
      <DataGrid
        className="reportTable"
        getRowId={(row: any) => row.requestNo}
        rows={rows}
        columns={columns}
        slots={{ footer: CustomFooterComponent }}
        slotProps={{
          footer: { setRows: setRows },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  );
}
