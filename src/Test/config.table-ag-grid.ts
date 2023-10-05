import { ColDef, ColGroupDef, GridOptions } from "ag-grid-community";
import { getColorText, valueGetter } from "./getApi";
import { CustomHeader, CustomToolTip } from "./CustomTemplate";
import { INDEX } from "./Table";

export const ColumnDefinition = (str: string): (ColDef | ColGroupDef)[] => {
  return [
    {
      headerName: "Mã",
      field: "Ma",
      colId: "1",
      tooltipField: "Ma",
      maxWidth: 90,
      minWidth: 90,
      width: 90,
      suppressColumnsToolPanel: true,
      tooltipComponentParams: { color: "red" },
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Gia,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
        };
      },
      rowDrag: true,
    },
    {
      headerName: "TC",
      field: "TC",
      colId: "2",
      maxWidth: 50,
      minWidth: 50,
      width: 50,
      cellStyle: () => {
        return { color: "#fdff12" };
      },
    },
    {
      headerName: "Trần",
      field: "Tran",
      colId: "3",
      maxWidth: 50,
      minWidth: 50,
      width: 50,
      cellStyle: () => {
        return { color: "#f23aff" };
      },
    },
    {
      headerName: "Sàn",
      field: "San",
      colId: "4",
      maxWidth: 50,
      minWidth: 50,
      width: 50,
      cellStyle: () => {
        return { color: "#66ccff" };
      },
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
          hide: INDEX.MKL4,
          valueGetter: (params) => valueGetter(Number(params.data.MKL4)),
        },
        {
          headerName: "G3",
          field: "MG3",
          colId: "26",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          cellClassRules: {
            highlight: (params) => params.data,
          },
          valueGetter: (params) => valueGetter(Number(params.data.MG3)),
        },
        {
          headerName: "KL3",
          field: "MKL3",
          colId: "27",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MKL3)),
        },
        {
          headerName: "G2",
          field: "MG2",
          colId: "28",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MG2)),
        },
        {
          headerName: "KL2",
          field: "MKL2",
          colId: "28",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MKL2)),
        },
        {
          headerName: "G1",
          field: "MG1",
          colId: "29",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MG1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MG1)),
        },
        {
          headerName: "KL1",
          field: "MKL1",
          colId: "30",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.MKL1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.MKL1)),
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
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.Gia,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.Gia)),
        },
        {
          headerName: "KL",
          field: "KL",
          colId: "15",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.Gia,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.KL)),
        },
        {
          colId: "16",
          field: str,
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.Gia,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
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
      colId: "7",
      children: [
        {
          headerName: "G1",
          field: "BG1",
          colId: "17",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BG1)),
        },
        {
          headerName: "KL1",
          field: "BKL1",
          colId: "18",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG1,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BKL1)),
        },
        {
          headerName: "G2",
          field: "BG2",
          colId: "19",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BG2)),
        },
        {
          headerName: "KL2",
          field: "BKL2",
          colId: "20",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG2,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BKL2)),
        },
        {
          headerName: "G3",
          field: "BG3",
          colId: "21",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BG3)),
        },
        {
          headerName: "KL3",
          field: "BKL3",
          colId: "22",
          cellStyle: (params) => {
            return {
              color: getColorText(
                params.data.BG3,
                params.data.TC,
                params.data.Tran,
                params.data.San
              ),
            };
          },
          valueGetter: (params) => valueGetter(Number(params.data.BKL3)),
        },
        {
          headerName: "KL4",
          field: "BKL4",
          colId: "25",
          hide: INDEX.BKL4,
          valueGetter: (params) => valueGetter(Number(params.data.BKL4)),
        },
      ],
    },
    {
      headerName: "Tổng KL",
      field: "TotalKL",
      colId: "8",
      width: 80,
      minWidth: 90,
      maxWidth: 120,
      valueGetter: (params) => valueGetter(Number(params.data.TotalKL)),
    },
    {
      headerName: "Mở cửa",
      field: "Open",
      colId: "9",
      hide: INDEX.Open,
      // suppressSizeToFit: true,
      maxWidth: 60,
      minWidth: 60,
      width: 60,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Open,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
        };
      },
      valueGetter: (params) => valueGetter(Number(params.data.Open)),
    },
    {
      headerName: "Cao nhất",
      field: "Max",
      colId: "10",
      hide: INDEX.Max,
      // suppressSizeToFit: true,
      maxWidth: 60,
      minWidth: 60,
      width: 60,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Max,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
        };
      },
      valueGetter: (params) => valueGetter(Number(params.data.Max)),
    },
    {
      headerName: "Thấp nhất",
      field: "Min",
      colId: "23",
      hide: INDEX.Min,
      // suppressSizeToFit: true,
      maxWidth: 60,
      minWidth: 60,
      width: 60,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Min,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
        };
      },
      valueGetter: (params) => valueGetter(Number(params.data.Min)),
    },
    {
      headerName: "Trung bình",
      field: "Avg",
      colId: "24",
      hide: INDEX.Avg,
      // suppressSizeToFit: true,
      // maxWidth: 50,
      // cellStyle: (params) => {
      //   return { color: getColorText(params) };
      // },
      valueGetter: (params) => valueGetter(Number(params.data.Avg)),
    },
    {
      headerName: "NN mua",
      field: "NNMua",
      colId: "11",
      hide: INDEX.NNMua,
      // suppressSizeToFit: true,
      valueGetter: (params) => valueGetter(Number(params.data.NNMua)),
    },
    {
      headerName: "NN bán",
      field: "NNBan",
      colId: "12",
      hide: INDEX.NNBan,
      // suppressSizeToFit: true,
      valueGetter: (params) => valueGetter(Number(params.data.NNBan)),
    },
    {
      headerName: "Room còn lại",
      field: "Room",
      colId: "13",
      hide: INDEX.Room,
      width: 120,
      maxWidth: 120,
      minWidth: 120,
      // suppressSizeToFit: true,
      valueGetter: (params) => valueGetter(Number(params.data.Room)),
    },
  ];
};

export const gridOptions: GridOptions = {
  getRowId: (params) => {
    return params.data.id;
  },
  rowBuffer: 0,
  suppressContextMenu: true,
  enableCellChangeFlash: true,
};
