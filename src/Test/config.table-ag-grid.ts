import { ColDef, ColGroupDef, GridOptions } from "ag-grid-community";
import { getColorText, valueGetter } from "./getApi";

const check = {
  MKL4: false,
  BKL4: false,
  Avg: false,
};

export const ColumnDefinition = (str: string): (ColDef | ColGroupDef)[] => {
  return [
    {
      headerName: "Mã",
      field: "Ma",
      colId: "1",
      suppressSizeToFit: true,
      width: 90,
      cellStyle: (params) => {
        return {
          color: getColorText(
            params.data.Gia,
            params.data.TC,
            params.data.Tran,
            params.data.San
          ),
          background: getColorText(
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
      suppressSizeToFit: true,
      maxWidth: 50,
      cellStyle: () => {
        return { color: "#fdff12" };
      },
    },
    {
      headerName: "Trần",
      field: "Tran",
      colId: "3",
      suppressSizeToFit: true,
      maxWidth: 50,
      cellStyle: () => {
        return { color: "#f23aff" };
      },
    },
    {
      headerName: "Sàn",
      field: "San",
      colId: "4",
      suppressSizeToFit: true,
      maxWidth: 50,
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
          hide: check.MKL4,
          valueGetter: (params) => valueGetter(Number(params.data.MKL4)),
        },
        {
          headerName: "G3",
          field: "MG3",
          colId: "26",
          suppressSizeToFit: true,
          maxWidth: 50,
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
            'highlight': (params) => params.data
          },
          valueGetter: (params) => valueGetter(Number(params.data.MG3)),
        },
        {
          headerName: "KL3",
          field: "MKL3",
          colId: "27",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 80,
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
          suppressSizeToFit: true,
          maxWidth: 50,
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
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
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
          suppressSizeToFit: true,
          maxWidth: 50,
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
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
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
          maxWidth: 50,
          suppressSizeToFit: true,
        },
        {
          headerName: "KL",
          field: "KL",
          colId: "15",
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 80,
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
          suppressSizeToFit: true,
          maxWidth: 60,
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
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
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
          suppressSizeToFit: true,
          maxWidth: 50,
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
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 70,
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
          suppressSizeToFit: true,
          maxWidth: 50,
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
          suppressSizeToFit: true,
          maxWidth: 100,
          width: 80,
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
          hide: check.BKL4,
          suppressSizeToFit: true,
          maxWidth: 35,
          width: 35,
          // cellStyle: (params) => {
          //   return { color: getColorText(params) };
          // },
          valueGetter: (params) => valueGetter(Number(params.data.BKL4)),
        },
      ],
    },
    {
      headerName: "Tổng KL",
      field: "TotalKL",
      colId: "8",
      suppressSizeToFit: true,
      maxWidth: 80,
      width: 80,
      valueGetter: (params) => valueGetter(Number(params.data.TotalKL)),
    },
    {
      headerName: "Mở cửa",
      field: "Open",
      colId: "9",
      hide: false,
      suppressSizeToFit: true,
      maxWidth: 50,
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
      hide: false,
      suppressSizeToFit: true,
      maxWidth: 50,
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
      hide: false,
      suppressSizeToFit: true,
      maxWidth: 50,
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
      hide: check.Avg,
      suppressSizeToFit: true,
      maxWidth: 50,
      // cellStyle: (params) => {
      //   return { color: getColorText(params) };
      // },
      valueGetter: (params) => valueGetter(Number(params.data.Avg)),
    },
    {
      headerName: "NN mua",
      field: "NNMua",
      colId: "11",
      hide: false,
      suppressSizeToFit: true,
      maxWidth: 60,
      valueGetter: (params) => valueGetter(Number(params.data.NNMua)),
    },
    {
      headerName: "NN bán",
      field: "NNBan",
      colId: "12",
      hide: false,
      suppressSizeToFit: true,
      maxWidth: 60,
      valueGetter: (params) => valueGetter(Number(params.data.MNNBan)),
    },
    {
      headerName: "Room còn lại",
      field: "Room",
      colId: "13",
      hide: false,
      suppressSizeToFit: true,
      maxWidth: 100,
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
};
