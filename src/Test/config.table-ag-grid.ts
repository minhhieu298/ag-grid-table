import { ColDef, ColGroupDef, GridOptions } from "ag-grid-community";
import { getColorText, valueGetter } from "./getApi";
import { CustomCellRenderInput, CustomHeader } from "./CustomTemplate";

const check = {
  MKL4: true,
  BKL4: true,
  Avg: true,
};

export const ColumnDefinition = (str: string): (ColDef | ColGroupDef)[] => {
  return [
    {
      headerName: "Mã",
      field: "Ma",
      width: 90,
      minWidth: 90,
      maxWidth: 90,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Gia,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
          fontSize: "10pt",
        };
      },
      cellRenderer: CustomCellRenderInput,
    },
    {
      headerName: "TC",
      field: "TC",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellStyle: () => {
        return { fontSize: "10pt", color: "#fdff12" };
      },
    },
    {
      headerName: "Trần",
      field: "Tran",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellStyle: () => {
        return { fontSize: "10pt", color: "#f23aff" };
      },
    },
    {
      headerName: "Sàn",
      field: "San",
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellStyle: () => {
        return { fontSize: "10pt", color: "#66ccff" };
      },
    },
    {
      headerName: "Mua",
      children: [
        {
          headerName: "KL4",
          field: "MKL4",
          hide: false,
          cellStyle: {
            fontSize: "10pt",
          },
          valueGetter: (params) => valueGetter(Number(params.data.MKL4)),
        },
        {
          headerName: "G3",
          field: "MG3",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MG3)),
        },
        {
          headerName: "KL3",
          field: "MKL3",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MKL3)),
        },
        {
          headerName: "G2",
          field: "MG2",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MG2)),
        },
        {
          headerName: "KL2",
          field: "MKL2",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MKL2)),
        },
        {
          headerName: "G1",
          field: "MG1",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MG1)),
        },
        {
          headerName: "KL1",
          field: "MKL1",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MKL1)),
        },
      ],
    },
    {
      headerName: "Khớp lệnh",
      children: [
        {
          headerName: "Giá",
          field: "Gia",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.Gia,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.Gia)),
        },
        {
          headerName: "KL",
          field: "KL",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.Gia,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
              backGround: "#444444",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.KL)),
        },
        {
          field: str,
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.Gia,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
              backGround: "#444444",
            };
          },
          valueGetter: (params) => {
            if (str === "PD") return valueGetter(Number(params.data.PD));
            else {
              return Number(params.data.Gia) > 0
                ? Number(params.data.Percent) + "%"
                : "";
            }
          },
          headerComponent: CustomHeader,
        },
      ],
    },
    {
      headerName: "Bán",
      children: [
        {
          headerName: "G1",
          field: "BG1",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BG1)),
        },
        {
          headerName: "KL1",
          field: "BKL1",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BKL1)),
        },
        {
          headerName: "G2",
          field: "BG2",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BG2)),
        },
        {
          headerName: "KL2",
          field: "BKL2",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BKL2)),
        },
        {
          headerName: "G3",
          field: "BG3",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BG3)),
        },
        {
          headerName: "KL3",
          field: "BKL3",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
              fontSize: "10pt",
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BKL3)),
        },
        {
          headerName: "KL4",
          field: "BKL4",
          hide: false,
          cellStyle: {
            fontSize: "10pt",
          },
          valueGetter: (params) => valueGetter(Number(params.data.BKL4)),
        },
      ],
    },
    {
      headerName: "Tổng KL",
      field: "TotalKL",
      width: 100,
      maxWidth: 100,
      minWidth: 100,
      valueGetter: (params) => valueGetter(Number(params.data.TotalKL)),
      cellStyle: {
        fontSize: "10pt",
        fontWeight: "400",
      },
    },
    {
      headerName: "Mở cửa",
      // autoSize: true,
      field: "Open",
      hide: false,
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Open,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
          fontSize: "10pt",
        };
      },
      valueGetter: (params) => valueGetter(Number(params.data.Open)),
    },
    {
      headerName: "Cao nhất",
      field: "Max",
      hide: false,
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Max,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
          fontSize: "10pt",
        };
      },
      valueGetter: (params) => valueGetter(Number(params.data.Max)),
    },
    {
      headerName: "Thấp nhất",
      field: "Min",
      hide: false,
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Min,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
          fontSize: "10pt",
        };
      },
      valueGetter: (params) => valueGetter(Number(params.data.Min)),
    },
    {
      headerName: "Trung bình",
      field: "Avg",
      hide: check.Avg,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Avg,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
          fontSize: "10pt",
        };
      },
      valueGetter: (params) => valueGetter(Number(params.data.Avg)),
    },
    {
      headerName: "NN mua",
      field: "NNMua",
      hide: false,
      valueGetter: (params) => valueGetter(Number(params.data.NNMua)),
      cellStyle: {
        fontSize: "10pt",
      },
    },
    {
      headerName: "NN bán",
      field: "NNBan",
      hide: false,
      valueGetter: (params) => valueGetter(Number(params.data.NNBan)),
      cellStyle: {
        fontSize: "10pt",
        fontWeight: "400",
      },
    },
    {
      headerName: "Room còn lại",
      field: "Room",
      hide: false,
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      valueGetter: (params) => valueGetter(Number(params.data.Room)),
      cellStyle: {
        fontSize: "10pt",
        fontWeight: "400",
      },
    },
  ];
};

export const gridOptions: GridOptions = {
  getRowId: (params) => {
    return params.data.RowID;
  },
  rowBuffer: 0,
  suppressContextMenu: true,
  enableCellChangeFlash: true,
  rowDragManaged: true,
  rowDragEntireRow: true,
  animateRows: true,
};
