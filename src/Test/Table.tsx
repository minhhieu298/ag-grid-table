import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  ILoadingCellRendererParams,
  // IServerSideGetRowsRequest,
  // IServerSideDatasource,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { Data, getDataApi } from "./getApi";
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
  const [isDOMReady, setIsDOMReady] = useState(false);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<Data[]>([]);
  const [pin, setPin] = useState<any>([]);

  const { data } = useQuery<IData[], Error>("repoData", () => fetchUserData());

  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>(ColumnDefinition());

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

  const pinnedTopRowData = useMemo<any[]>(() => {
    return [];
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    params.api.setPinnedTopRowData([]);
  }, []);

  useEffect(() => {
    if (isDOMReady) {
      const gridDiv = document.querySelector(
        ".ag-theme-alpine-dark"
      ) as HTMLElement;
      if (gridDiv) {
        const gridBody = gridDiv.querySelector(".ag-body") as HTMLElement;
        if (gridBody) {
          // const verticalScroll = gridDiv.querySelector(
          //   ".ag-virtual-list-viewport"
          // ) as HTMLElement;
          gridBody.style.width = "calc(100% + 17px)";
        }

        // const gridBody = gridDiv.querySelector(".ag-body") as HTMLElement;

        // gridBody.style.height = "calc(100% - 17px)"; // Điều chỉnh độ cao của bảng
        // verticalScroll.style.height = "100%";
      } else {
        console.error("Không tìm thấy phần tử có class .ag-theme-alpine.");
      }
    } else {
      setIsDOMReady(true);
    }
  }, [isDOMReady]);

  useEffect(() => {
    if (data) setRowData(getDataApi(data));
  }, [data]);

  return (
    <div style={{ height: "100vw", boxSizing: "border-box" }}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          headerHeight={45}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          animateRows={true}
          pinnedTopRowData={pinnedTopRowData}
          rowMultiSelectWithClick={true}
          rowSelection={"multiple"}
        />
      </div>
    </div>
  );
};

export default Table;

export function CustomLoadingCellRenderer(
  props: ILoadingCellRendererParams & { loadingMessage: string }
) {
  return (
    <div
      className="ag-custom-loading-cell"
      style={{ paddingLeft: "10px", lineHeight: "25px" }}
    >
      <i className="fas fa-spinner fa-pulse"></i>{" "}
      <span> {props.loadingMessage}</span>
    </div>
  );
}
