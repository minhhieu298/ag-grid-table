import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  GridSizeChangedEvent,
  ILoadingCellRendererParams,
  SideBarDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import {
  Data,
  generateRandomData,
  getDataApi,
  getDataSocket,
  updateImmutableObject,
} from "./getApi";
import { ColumnDefinition, gridOptions } from "./config.table-ag-grid";
import { CustomHeader, CustomToolTip } from "./CustomTemplate";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchCate, fetchData } from "../testSlice";

export interface IData {
  RowID: string;
  Info: string[][];
}

export interface IColumns {
  Ma: string;
  TC: string;
  Tran: string;
  San: string;
  MKL4: string;
  MG3: string;
  MKL3: string;
  MG2: string;
  MKL2: string;
  MG1: string;
  MKL1: string;
  Gia: string;
  KL: string;
  PD: string; //price difference
  Percent: number; //percent,
  BG1: string;
  BKL1: string;
  BG2: string;
  BKL2: string;
  BG3: string;
  BKL3: string;
  BKL4: string;
  TotalKL: string;
  Open: string;
  Max: string;
  Min: string;
  Avg: string;
  NNMua: string;
  NNBan: string;
  Room: string;
}

export const INDEX = {
  MKL4: false,
  BKL4: false,
  Open: false,
  Max: false,
  Min: false,
  Avg: false,
  NNMua: false,
  NNBan: false,
  Room: false,
};


const Table = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridRef = useRef<AgGridReact<IColumns>>(null);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const name = useAppSelector((state) => state.title);
  const [rowData, setRowData] = useState<any[]>([]);
  const { table, category } = useAppSelector((state) => state);
  const dipatch = useAppDispatch();
  const [hsx, setHSX] = useState<any>([]);
  const [input, setInput] = useState(INDEX);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: false,
      sortable: true,
      wrapHeaderText: true,
      minWidth: 50,
      editable: true,
      tooltipComponent: CustomToolTip,
      suppressAutoSize: true,
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
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

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
  }, []);

  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
  }, []);

  const handleChange = (e: any) => {
    const { name, checked } = e.target;
    setInput({ ...input, [name]: checked });
  };
  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          toolPanelParams: {
            // tool panel columns won't move when columns are reordered in the grid
            suppressSyncLayoutWithGrid: true,
            // prevents columns being reordered from the columns tool panel
            suppressColumnMove: true,
          },
        },
      ],
      defaultToolPanel: "columns",
    };
  }, []);

  useEffect(() => {
    dipatch(fetchData());
    dipatch(fetchCate());
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
    socketHSX.onmessage = () => {
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
    <div style={containerStyle}>
      <div
        id="grid-wrapper"
        style={{ height: "100vw", boxSizing: "border-box" }}
      >
        <button onClick={() => handleClick()}>click</button>
        <div style={{ display: "flex", fontSize: "20px" }}>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.MKL4}
            name="MKL4"
          />
          MKL4
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.BKL4}
            name="BKL4"
          />
          BKL4
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.Max}
            name="Max"
          />
          Max
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.Min}
            name="Min"
          />
          Min
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.Open}
            name="Open"
          />
          Open
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.NNBan}
            name="NNBan"
          />
          NNBan
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.NNMua}
            name="NNMua"
          />
          NNMua
          <input
            type="checkbox"
            onChange={handleChange}
            checked={input.Room}
            name="Room"
          />
          Room
        </div>
        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            rowData={arr}
            columnDefs={ColumnDefinition(name)}
            headerHeight={40}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
            animateRows={true}
            // onFirstDataRendered={onFirstDataRendered}
            // onGridSizeChanged={onGridSizeChanged}
            rowMultiSelectWithClick={true}
            rowSelection={"multiple"}
            components={components}
            rowDragManaged={true}
            tooltipShowDelay={0}
            rowDragMultiRow={true}
            sideBar={sideBar}
          />
        </div>
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
