import { IData } from "./Table";
export interface Data {
  id: string;
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
  rowPinned: boolean;
  U29: string;
  U30: string;
  U31: string;
}

export interface ISocket {
  M: string;
  H: string;
  A: Array<{
    Channel: string;
    ProcessTime: string;
    Time: string;
    Change: string;
  }>;
}
export interface ISocketData {
  C: string;
  M: ISocket[];
  S?: string;
}

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
      Percent: Number(
        (
          ((Number(item.Info[11][1]) - Number(item.Info[1][1])) /
            Number(item.Info[1][1])) *
          100
        ).toFixed(1)
      ), //percent,
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
      U29: item.Info[29][1],
      U30: item.Info[30][1],
      U31: item.Info[31][1],
      rowPinned: false,
    };
  });

  return arr;
}

export function getColorText(
  price: string,
  tc: string,
  tran: string,
  san: string
): string {
  if (Number(price) === 0) {
    return "#dfe1e3";
  } else if (Number(price) === Number(san)) {
    return "#66ccff";
  } else if (Number(price) === Number(tran)) {
    return "#f23aff";
  } else if (Number(price) === Number(tc)) {
    return "#fdff12";
  } else if (Number(price) > Number(tc)) {
    return "#0bdf39";
  } else if (Number(price) < Number(tc) && Number(price) > Number(san)) {
    return "#ff0017";
  }
  return "#000";
}

export function formatNumber(num: string): string {
  const Regex = /\./;
  if (Regex.test(num)) {
    return num;
  } else {
    return Number(num).toLocaleString().replaceAll(".", ",");
  }
}

export function valueGetter(num: number): string | number {
  return num !== 0 ? formatNumber(num.toString()) : "";
}
export function getDataSocket(event: MessageEvent) {
  const jsonData: ISocketData = JSON.parse(event.data);
  if (Object.keys(jsonData).length !== 0) {
    if (jsonData.M.length !== 0) {
      const data = jsonData.M[0].A;
      const value = convertJsonData(data);
      return value;
    }
  }
  return {};
}

export function convertJsonData(
  data: Array<{
    Channel: string;
    ProcessTime: string;
    Time: string;
    Change: string;
  }>
): { RowID: string; Infor: number[][] }[] {
  const result = JSON.parse(data[0].Change);
  if (Array.isArray(result)) {
    // // Nếu dữ liệu là một mảng, kiểm tra dữ liệu đầu tiên để xác định kiểu
    if (Array.isArray(result[0])) {
      // Trường hợp mảng con
      return [];
    } else if (typeof result[0] === "object") {
      // Trường hợp mảng các đối tượng
      return result;
    }
  }
  return [];
}

export function updateImmutableObject(original: any, newValues: any) {
  if (Object.keys(newValues).length !== 0) {
    const map_2 = new Map(newValues.map((item: any) => [item.RowID, item]));

    // // Tạo mảng result bằng cách cập nhật giá trị từ arr_2 vào arr_1
    const result = original.map((item1: any) => {
      const item2: any = map_2.get(item1.RowID);
      if (item2) {
        // Tìm thấy phần tử tương ứng trong arr_2
        // Tạo một đối tượng mới kết hợp giá trị từ cả hai mảng arr_1 và arr_2
        return {
          RowID: item1.RowID,
          Info: item1.Info.map(([key, value]: any) => {
            const matchingItem = item2.Info.find(([key2]: any) => key2 === key);
            return matchingItem ? [key, matchingItem[1]] : [key, value];
          }),
        };
      } else {
        // Không tìm thấy phần tử tương ứng trong arr_2
        // Trả về một đối tượng mới sử dụng giá trị từ arr_1
        return {
          RowID: item1.RowID,
          Info: item1.Info,
        };
      }
    });
    return result;
  }
  return {};
}

export function generateRandomData() {
  const data = [];
  const rowID = "21";
  const numInfoItems = 1 + Math.floor(Math.random() * 10); // Số phần tử ngẫu nhiên từ 1 đến 10
  const info = [];

  for (let j = 0; j < numInfoItems; j++) {
    const key = (Math.floor(Math.random() * (31 - 1 + 1)) + 1).toString();
    const value = Math.floor(Math.random() * 100).toString();
    info.push([key, value]);
  }

  data.push({
    RowID: rowID,
    Info: info,
  });

  return data;
}
