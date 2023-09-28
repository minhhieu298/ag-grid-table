import {
  ColDef,
  GridReadyEvent,
  ILoadingCellRendererParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useState, useCallback, useEffect } from "react";
import {
  Data,
  generateRandomData,
  getDataApi,
  getDataSocket,
  updateImmutableObject,
} from "./getApi";
import { ColumnDefinition, gridOptions } from "./config.table-ag-grid";
import { CustomHeader } from "./CustomTemplate";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchData } from "../testSlice";

export interface IData {
  RowID: string;
  Info: string[][];
}

const Table = () => {
  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [isDOMReady, setIsDOMReady] = useState(false);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const name = useAppSelector((state) => state.title);
  const [rowData, setRowData] = useState<any[]>([]);
  const { table } = useAppSelector((state) => state);
  const dipatch = useAppDispatch();
  const [hsx, setHSX] = useState<any>([]);

  // const rowData = useMemo(() => {
  //   if (Object.keys(hsx).length !== 0) {
  //     const result = table.map((item1: any) => {
  //       const item2 = hsx.find((item2: any) => item2.row === item1.row);

  //       if (item2) {
  //         // Tìm thấy phần tử tương ứng trong arr_2
  //         // Trả về một đối tượng mới kết hợp giá trị từ cả hai arr_1 và arr_2
  //         return {
  //           row: item1.row,
  //           infor: item2.infor,
  //         };
  //       } else {
  //         // Không tìm thấy phần tử tương ứng trong arr_2
  //         // Trả về một đối tượng mới sử dụng giá trị từ arr_1
  //         return {
  //           row: item1.row,
  //           infor: item1.infor,
  //         };
  //       }
  //     });
  //     return result;
  //   }
  //   return table;
  // }, [table, hsx]);
  // console.log(rowData);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: false,
      sortable: true,
      maxWidth: 1200,
      wrapHeaderText: true,
      // headerComponentParams: {
      //   template: `
      //     <div class="ag-cell-label-container" role="presentation">
      //       <div ref="eLabel" class="ag-header-cell-label" role="presentation">
      //         <span ref="eSortOrder" class="ag-header-icon ag-sort-order ag-hidden"></span>
      //         <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon ag-hidden"><i class="fa fa-sort-asc" aria-hidden="true"></i></span>
      //         <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon ag-hidden"><i class="fa fa-sort-desc" aria-hidden="true"></i></span>
      //         <span ref="eSortMixed" class="ag-header-icon ag-sort-mixed-icon ag-hidden"></span>
      //         <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon ag-hidden"></span>
      //         <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>
      //         <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
      //       </div>
      //     </div>
      //   `,
      // },
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    params.api.setPinnedTopRowData([]);
  }, []);

  const arr = useMemo(() => {
    const data = updateImmutableObject(table, hsx);
    if (Object.keys(data).length !== 0) {
      return getDataApi(data);
    }
    return getDataApi(table);
    // return getDataApi(data)
  }, [hsx, table]);

  const components = useMemo<{
    [p: string]: any;
  }>(() => {
    return {
      agColumnHeader: CustomHeader,
    };
  }, []);

  const handleClick = () => {
    setHSX(generateRandomData());
  };

  const onCellValueChanged = (params) => {
    console.log(params);

    if (params.oldValue !== params.newValue) {
      const column = params.column.colDef.field;
      params.column.colDef.cellStyle = { "background-color": "cyan" };
      params.api.refreshCells({
        force: true,
        columns: [column],
        rowNodes: [params.node],
      });
    }
    params.api.refreshCells();
  };

  useEffect(() => {
    if (isDOMReady) {
      const gridDiv = document.querySelector(
        ".ag-theme-alpine-dark"
      ) as HTMLElement;
      if (gridDiv) {
        const gridBody = gridDiv.querySelector(".ag-body") as HTMLElement;
        const floatingTop = gridDiv.querySelector(
          ".ag-floating-top"
        ) as HTMLElement;
        if (gridBody) {
          // const verticalScroll = gridDiv.querySelector(
          //   ".ag-virtual-list-viewport"
          // ) as HTMLElement;
          gridBody.style.width = "calc(100% + 17px)";
          floatingTop.style.overflowY = "auto";
          floatingTop.style.borderRight = "1px solid #858585";
        }
      } else {
        console.error("Không tìm thấy phần tử có class .ag-theme-alpine.");
      }
    } else {
      setIsDOMReady(true);
    }
  }, [isDOMReady]);

  useEffect(() => {
    dipatch(fetchData());
  }, [dipatch]);

  useEffect(() => {
    const socketHNX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=zxtyXf2on60NxmgkqXHs56VQIOumV9FP%2BwlWRYS%2F5LvTXRuK3hc7Fx0uRIb6fbaq3vMA3BGIFgDbF2bLmCix7YfJ%2BZATQAc%2FmyeiwY1oR%2FTEltDUc519u5ZG0%2FY37NZn&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=0"
    );
    const socketHSX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=f5fMSZasQBFqFc6d65ck%2BYiWiz%2Fj8YA%2FMJwuVDiVjZ6UQPav5JHJgfiQpRKRNadRIglSRmDx%2FS2qXhzZpcWtX2dWSlexPeh%2FfetcIqtAPopkyJ6EqYXbOFk%2BcmyQKsfF&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=3"
    );
    socketHSX.onopen = () => {
      // console.log("WebSocket connection established.");
    };
    socketHNX.onopen = () => {
      //console.log("WebSocket connection established.");
    };
    socketHSX.onmessage = (event) => {
      // setHSX(getDataSocket(event));
    };

    socketHNX.onmessage = (event) => {
      getDataSocket(event);
    };
    socketHSX.onclose = () => {
      //console.log("WebSocket connection closed.");
    };
    socketHNX.onclose = () => {
      // console.log("WebSocket connection closed.");
    };
    return () => {
      socketHSX.close();
      socketHNX.close();
    };
  }, []);

  useEffect(() => {
    setRowData(table);
  }, [table]);
  return (
    <div style={{ height: "100vw", boxSizing: "border-box" }}>
      <button onClick={() => handleClick()}>click</button>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={arr}
          columnDefs={ColumnDefinition(name)}
          headerHeight={40}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          animateRows={true}
          // pinnedTopRowData={pinnedTopRowData}
          rowMultiSelectWithClick={true}
          rowSelection={"multiple"}
          components={components}
          rowDragManaged={true}
          rowDragMultiRow={true}
          onCellValueChanged={onCellValueChanged}
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
