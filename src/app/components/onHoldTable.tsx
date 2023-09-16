import * as React from "react";
import { updateStatus } from "../api/post";
import { getOnHold } from "../api/get";
import {
  DataGrid,
  GridColDef,
  GridFooterContainer,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Box, Button, TablePaginationProps } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";

interface OnHoldReq {
  requestNo: number;
  reportName: string;
  branch: string;
  dateFrom: string;
  dateTo: string;
  dateRequested: string;
  requestedBy: string;
}

function createData(
  requestNo: number,
  reportName: string,
  branch: string,
  dateFrom: string,
  dateTo: string,
  dateRequested: string,
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
          new Date(values.data.items[i].dateFrom).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}),
          new Date(values.data.items[i].dateTo).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}),
          new Date(values.data.items[i].dateRequested).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}),
          values.data.items[i].requestedBy,
        )
      );
    }
    return rows;
  } else {
    return new Array();
  }
}

const columns: GridColDef[] = [
  { field: "requestNo", headerName: "Request No.",  headerClassName: "colHeader", width: 130 },
  { field: "reportName", headerName: "Report Name", headerClassName: "colHeader", width: 140 },
  { field: "branch", headerName: "Branch", headerClassName: "colHeader", width: 100 },
  { field: "dateFrom", headerName: "Date From", headerClassName: "colHeader", width: 150 },
  { field: "dateTo", headerName: "Date To", headerClassName: "colHeader", width: 150 },
  { field: "dateRequested", headerName: "Date Requested", headerClassName: "colHeader", width: 160 },
  { field: "requestedBy", headerName: "Requested By", headerClassName: "colHeader", width: 130 },
];

function unHold(
  data: any,
  { setRows, firstResult, maxResult }: any,
  selectedSize: number
) {
  updateStatus(data, firstResult, (maxResult - selectedSize), { setRows });
}

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function CustomFooterComponent(props: any) {
  const apiRef = useGridApiContext();
  const tableButton = "tableButton";
  let selectedSize = apiRef.current.getSelectedRows().size;

  return (
    <GridFooterContainer>
      <Button
        className={selectedSize !== 0 ? tableButton : ""}
        sx={{ marginLeft: "20px" }}
        onClick={() => {
          unHold(
            apiRef.current.getSelectedRows().keys(),
            { ...props },
            selectedSize
          );
        }}
        variant="outlined"
        disabled={selectedSize === 0}
      >
        Confirm
      </Button>
      <CustomPagination sx={{ width: "75%" }} />
    </GridFooterContainer>
  );
}

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    setRows: Function;
    firstResult: string;
    maxResult: string;
  }
}

export default function OnHoldTable({
  values,
  setRows,
  firstResult,
  maxResult,
}: any) {
  const [tableData, setTableData] = React.useState(Array());

  React.useEffect(() => {
    setTableData(createDataLoop(values));
  }, [values]);

  return (
    <Box
      component="div"
      sx={{ height: "inherit", width: "inherit", maxWidth: "100%" }}
    >
      <DataGrid
        className="reportTable"
        getRowId={(row: any) => row.requestNo}
        rows={tableData}
        columns={columns}
        slots={{ footer: CustomFooterComponent, toolbar: GridToolbar}}
        slotProps={{
          footer: {
            setRows: setRows(),
            firstResult: firstResult,
            maxResult: maxResult,
          },
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          }
        }}
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
      />
    </Box>
  );
}
