import { IData } from "./Table";

export function getDataApi(data: IData[]) {
  const arr = data.map((item) => {
    return {
      id: item.RowID,

      Ma: item.Info[0][1],

      TC: item.Info[1][1],

      Tran: item.Info[2][1],

      San: item.Info[3][1],

      MKL4: item.Info[4][1],

      MG3: item.Info[5][1],

      MKL3: item.Info[6][1],

      MG2: item.Info[7][1],

      MKL2: item.Info[8][1],

      MG1: item.Info[9][1],

      MKL1: item.Info[10][1],

      Gia: item.Info[11][1],

      KL: item.Info[12][1],

      PD: item.Info[13][1], //price difference

      Percent: (
        ((Number(item.Info[11][1]) - Number(item.Info[1][1])) /
          Number(item.Info[1][1])) *
        100
      ).toFixed(1), //percent,

      BG1: item.Info[14][1],

      BKL1: item.Info[15][1],

      BG2: item.Info[16][1],

      BKL2: item.Info[17][1],

      BG3: item.Info[18][1],

      BKL3: item.Info[19][1],

      BKL4: item.Info[20][1],

      TotalKL: item.Info[21][1],

      Open: item.Info[22][1],

      Max: item.Info[23][1],

      Min: item.Info[24][1],

      Avg: item.Info[25][1],

      NNMua: item.Info[26][1],

      NNBan: item.Info[27][1],

      Room: item.Info[28][1],
      rowPinned: top,
    };
  });

  return arr;
}
