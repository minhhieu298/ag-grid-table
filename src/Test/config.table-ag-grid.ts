import { ColDef, ColGroupDef, GridOptions } from "ag-grid-community";

const check = {
    MKL4: false,
    BKL4: false,
    Avg: false,
};

export const ColumnDefinition = (): (ColDef | ColGroupDef)[] => { 
  return [
    {
      headerName: "Mã",
      field: "Ma",
      colId: "1",
      suppressSizeToFit: true,
      width: 90,
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
          suppressSizeToFit: true,
          maxWidth: 60,
          headerComponentParams: {
            template: `
              <div class="ag-cell-label-container" role="presentation">
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
  ];
};

export const gridOptions: GridOptions = {
  // domLayout: "autoHeight",
  getRowId: (data) => {
    return data.data.id;
  },
  rowBuffer:0,
  suppressContextMenu:true
};
