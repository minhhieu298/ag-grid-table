import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  ILoadingCellRendererParams,
  // IServerSideGetRowsRequest,
  // IServerSideDatasource,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useState, useCallback } from "react";
import { useQuery } from "react-query";
import { getDataApi } from "./getApi";
import { ColumnDefinition, gridOptions } from "./config.table-ag-grid";

const my_arr = {
  s: "quote",
  l: "All",
};

const fetchUserData = async (): Promise<IData[]> => {
  const response = await fetch(
    `https://eztrade.fpts.com.vn/hsx/data.ashx?s=${my_arr.s}&l=${my_arr.l}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export interface IData {
  RowID: string;
  Info: string[][];
}


const Table = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const { data } = useQuery<IData[], Error>("repoData", () =>
    fetchUserData()
  );

  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>(ColumnDefinition());

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: false,
      sortable: true,
      maxWidth: 1200,
      wrapHeaderText: true,

      headerComponentParams: {
        template: `
          <div class="ag-cell-label-container" role="presentation">
            <div ref="eLabel" class="ag-header-cell-label" role="presentation">
              <span ref="eSortOrder" class="ag-header-icon ag-sort-order ag-hidden"></span>
              <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon ag-hidden"><i class="fa fa-sort-asc" aria-hidden="true"></i></span>
              <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon ag-hidden"><i class="fa fa-sort-desc" aria-hidden="true"></i></span> 
              <span ref="eSortMixed" class="ag-header-icon ag-sort-mixed-icon ag-hidden"></span> 
              <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon ag-hidden"></span>
              <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>
              <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
            </div>
          </div>
        `,
      },
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ height: "100vw", boxSizing: "border-box" }}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={data !== undefined ? getDataApi(data) : []}
            columnDefs={columnDefs}
            headerHeight={45}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;

export function CustomLoadingCellRenderer(
  props: ILoadingCellRendererParams & { loadingMessage: string }
)  {
  return (
    <div
      className="ag-custom-loading-cell"
      style={{ paddingLeft: '10px', lineHeight: '25px' }}
    >
      <i className="fas fa-spinner fa-pulse"></i>{' '}
      <span> {props.loadingMessage}</span>
    </div>
  );
}
// const getServerSideDatasource: (server: any) => IServerSideDatasource = (
//   server: any
// ) => {
//   return {
//     getRows: (params) => {
//       // adding delay to simulate real server call
//       setTimeout(() => {
//         const response = server.getResponse(params.request);
//         if (response.success) {
//           // call the success callback
//           params.success({
//             rowData: getDataApi(response.rows),
//             rowCount: response.lastRow,
//           });
//         } else {
//           // inform the grid request failed
//           params.fail();
//         }
//       }, 2000);
//     },
//   };
// };

// const getFakeServer: (allData: any[]) => any = (allData: any[]) => {
//   return {
//     getResponse: (request: IServerSideGetRowsRequest) => {
//       console.log(
//         'asking for rows: ' + request.startRow + ' to ' + request.endRow
//       );
//       // take a slice of the total rows
//       const rowsThisPage = allData.slice(request.startRow, request.endRow);
//       // if on or after the last page, work out the last row.
//       const lastRow =
//         allData.length <= (request.endRow || 0) ? allData.length : -1;
//       return {
//         success: true,
//         rows: rowsThisPage,
//         lastRow: lastRow,
//       };
//     },
//   };
// };