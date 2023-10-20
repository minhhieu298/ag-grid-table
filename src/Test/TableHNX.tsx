import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useEffect } from "react";
import { getDataSocket } from "./getApi";
import { ColumnDefinition, gridOptions } from "./config.table-ag-grid";
import { CustomHeader } from "./CustomTemplate";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchData, updateRealTime } from "../testSlice";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { Link } from "react-router-dom";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

export interface IData {
  RowID: string;
  Info: string[][];
}

export interface IRow {
  MaCK: string;
  TC: number;
  Tran: number;
  San: string;
  Mua: string;
  KL: string;
  Ban: number;
  TongKL: number;
  Open: number;
  Max: number;
  Min: number;
  Avg: number;
  NNMua: number;
  NNBan: number;
  RoomCL: number;
}

const TableHNX = () => {
  const containerStyle = useMemo(
    () => ({ width: "100%", minHeight: "100vh" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const { table, title } = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: false,
      sortable: true,
      suppressMenu: true,
      wrapHeaderText: true,
      flex: 1,
    };
  }, []);

  const components = useMemo<{
    [p: string]: any;
  }>(() => {
    return {
      agColumnHeader: CustomHeader,
    };
  }, []);

  // const handleClick = () => {
  //   setHSX(generateRandomData());
  // };
  useEffect(() => {
    const socketHNX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=1qGYNPN6ji3eiv5sb7XsLVU5hLsTEpBFcV%2BeheqkuUf7qRv%2BPG7YZUXasQV54K32Tb4jpoy7wpVasuJjR5cL%2BRdm0A%2FQ1SoAYk1Ehqig1nTdd09KMuvB5Gf5n%2FXnvfzT&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=9"
    );
    const socketHSX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=5hFxKbPD9sMDyrxPzQiPmS4KXj15fOOHBNrgoTc19Nfe56ieD0l3avS3xbciEXvpNzUu2qvVTeDSi8hsqwUTnYcHRI7EHriNFv5XNsskcK5xma13zpYe0bYY3Q5crgdb&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=4"
    );
    socketHSX.onopen = () => {
      // console.log("WebSocket connection established.");
    };
    socketHNX.onopen = () => {
      //console.log("WebSocket connection established.");
    };
    socketHSX.onmessage = (event) => {
      const hsx = getDataSocket(event);
      dispatch(updateRealTime({ realtime: hsx, table }));
    };

    socketHNX.onmessage = (event) => {
      const hnx = getDataSocket(event);
      dispatch(updateRealTime({ realtime: hnx, table }));
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
  }, [dispatch, table]);

  useEffect(() => {
    dispatch(fetchData("hnx"));
  }, [dispatch]);
  return (
    <>
      <div
        style={{ padding: "10px 20px", background: "pink", maxWidth: "100px" }}
      >
        <Link to="/">HSX</Link>
      </div>
      <div style={containerStyle}>
        <div
          id="grid-wrapper"
          style={{ height: "100vw", boxSizing: "border-box" }}
        >
          <div style={gridStyle} className="ag-theme-alpine-dark">
            <AgGridReact
              rowData={table}
              columnDefs={ColumnDefinition(title)}
              headerHeight={30}
              defaultColDef={defaultColDef}
              gridOptions={gridOptions}
              animateRows={true}
              components={components}
              rowHeight={30}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableHNX;
