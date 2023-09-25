import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ColSpanParams,
  GridReadyEvent,
  FirstDataRenderedEvent,
  ColumnApi,
  GridApi,
} from "ag-grid-community";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";

import "ag-grid-community/styles/ag-theme-alpine.css";

import React, { useMemo, useRef, useState, useCallback } from "react";

import { useQuery } from "react-query";
import { getDataApi } from "./getApi";

interface IOlympicData {
  Ma: string;
  TC: string;
  Tran: string;
  San: string;
}

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
const my_arr = {
  s: "quote",
  l: "All",
};

const check = {
  MKL4: false,
  BKL4: false,
  Avg: false,
};
const Table = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData, setRowData] = useState<any>([]);
  const gridRef = useRef(null);

  const { isLoading, error, data } = useQuery<IData[], Error>("repoData", () =>
    fetchUserData()
  );

  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Mã",
      field: "Ma",
      colId: "1",
      suppressSizeToFit: true,
      width: 80,
    },
    {
      headerName: "TC",
      field: "TC",
      colId: "2",
      suppressSizeToFit: true,
      maxWidth: 50,
    },
    {
      headerName: "Trần",
      field: "Tran",
      colId: "3",
      suppressSizeToFit: true,
      maxWidth: 50,
    },
    {
      headerName: "Sàn",
      field: "San",
      colId: "4",
      suppressSizeToFit: true,
      maxWidth: 50,
    },
    {
      headerName: "Mua",
      resizable: false,
      colId: "5",
      children: [
        {
          headerName: "KL4",
          field: "MKL4",
          colId: "25",
          hide: check.MKL4,
        },
        {
          headerName: "G3",
          field: "MG3",
          colId: "26",
          suppressSizeToFit: true,
          maxWidth: 50,
        },
        {
          headerName: "KL3",
          field: "MKL3",
          colId: "27",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 80,
        },
        {
          headerName: "G2",
          field: "MG2",
          colId: "28",
          suppressSizeToFit: true,
          maxWidth: 50,
        },
        {
          headerName: "KL2",
          field: "MKL2",
          colId: "28",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
        },
        {
          headerName: "G1",
          field: "MG1",
          colId: "29",
          suppressSizeToFit: true,
          maxWidth: 50,
        },
        {
          headerName: "KL1",
          field: "MKL1",
          colId: "30",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
        },
      ],
    },
    {
      headerName: "Khớp lệnh",
      colId: "6",
      children: [
        {
          headerName: "Giá",
          field: "Gia",
          colId: "14",
        },
        {
          headerName: "KL",
          field: "KL",
          colId: "15",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 80,
        },
        {
          colId: "16",
          field: "PD",
          headerComponentParams: {
            template: `
                <div class="ag-cell-label-container" role="presentation">
                  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" aria-hidden="true"></span>
                  <span class="icon-right" style="font-size: 12pt; position: relative;cursor: pointer"><i class="fa fa-caret-right" aria-hidden="true"></i></span>
                  <div ref="eLabel" class="ag-header-cell-label" role="presentation" style="position: relative">
                    <span style="font-size: 10pt; position: relative; top: -1px">+/-</span>
                    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon ag-hidden" style="bottom: -6px"><i class="fa fa-sort-asc" aria-hidden="true"></i></span>
                    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon ag-hidden" style="bottom: 0"><i class="fa fa-sort-desc" aria-hidden="true"></i></span>
                  </div>
                  <span class="icon-left" style="font-size: 12pt; position: relative; cursor: pointer"><i class="fa fa-caret-left" aria-hidden="true"></i></span>
                </div>
                `,
          },
        },
      ],
    },

    {
      headerName: "Bán",
      colId: "7",
      children: [
        {
          headerName: "G1",
          field: "BG1",
          colId: "17",
          suppressSizeToFit: true,
          maxWidth: 50,
        },
        {
          headerName: "KL1",
          field: "BKL1",
          colId: "18",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
        },
        {
          headerName: "G2",
          field: "BG2",
          colId: "19",
          suppressSizeToFit: true,
          maxWidth: 50,
        },
        {
          headerName: "KL2",
          field: "BKL2",
          colId: "20",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
        },
        {
          headerName: "G3",
          field: "BG3",
          colId: "21",
          suppressSizeToFit: true,
          maxWidth: 50,
        },
        {
          headerName: "KL3",
          field: "BKL3",
          colId: "22",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 80,
        },
        {
          headerName: "KL4",
          field: "BKL4",
          colId: "25",
          hide: check.BKL4,
          suppressSizeToFit: true,
          maxWidth: 35,
          width: 35,
        },
      ],
    },
    {
      headerName: "Tổng KL",
      field: "TotalKL",
      colId: "8",
      suppressSizeToFit: true,
      maxWidth: 100,
      width: 100,
    },
    {
      headerName: "Mở cửa",
      field: "Open",
      colId: "9",
      hide: false,
    },
    {
      headerName: "Cao nhất",
      field: "Max",
      colId: "10",
      hide: false,
    },
    {
      headerName: "Thấp nhất",
      field: "Min",
      colId: "23",
      hide: false,
    },
    {
      headerName: "Trung bình",
      field: "Avg",
      colId: "24",
      hide: check.Avg,
    },
    {
      headerName: "NN mua",
      field: "NNMua",
      colId: "11",
      hide: false,
    },
    {
      headerName: "NN bán",
      field: "NNBan",
      colId: "12",
      hide: false,
    },
    {
      headerName: "Room còn lại",
      field: "Room",
      minWidth: 100,
      colId: "13",
      hide: false,
    },
  ]);

  const onGridReady = useCallback(() => {
    gridRef.current!.api.sizeColumnsToFit({
      // defaultMinWidth: 60,
      // columnLimits: [{ key: "13", minWidth: 500 }],
    });
  }, []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: false,
      sortable: true,
      maxWidth: 1200,
      wrapHeaderText: true,

      headerComponentParams: {
        menuIcon: "fa-bars",

        template: `<div class="ag-cell-label-container" role="presentation">
  
                        <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
  
                        <div ref="eLabel" class="ag-header-cell-label" role="presentation">
  
                            <span ref="eSortOrder" class="ag-header-icon ag-sort-order ag-hidden"></span>
  
                            <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon ag-hidden"><i class="fa fa-sort-asc" aria-hidden="true"></i></span>
  
                            <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon ag-hidden"><i class="fa fa-sort-desc" aria-hidden="true"></i></span>
  
                            <span ref="eSortMixed" class="ag-header-icon ag-sort-mixed-icon ag-hidden"></span>
  
                            <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon ag-hidden"></span>
  
                            <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>
  
                            <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
  
                        </div>
  
                    </div>`,
      },
    };
  }, []);

  const gridOptions: GridOptions = {
    // onRowClicked: handleRowClick,
    // onCellClicked: handleCellClick,
    rowSelection: "multiple",
    // rowBuffer: 10,
    domLayout: "autoHeight",
    getRowId: (data) => {
      return data.data.id;
    },
  };

  React.useEffect(() => {
    if (data) setRowData(getDataApi(data));
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={{ height: "100vw", boxSizing: "border-box" }}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            headerHeight={45}
            defaultColDef={defaultColDef}
            loadingCellRenderer={isLoading}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;

export function CellRender(props: any) {
  return <div>{props.data}</div>;
}
