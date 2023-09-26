import { formatNumber, getColorText } from "./getApi";

export const CellRenderTemplate = (props: any) => {
  return (
    <div className={getColorText(props)}>
      {isNaN(props.value)
        ? <><input type="checkbox" /> {props.value}</>
        : props.value === 0
        ? ""
        : formatNumber(props.value)}
    </div>
  );
};

export const CellRenderDefault = (props: any) => {
  return (
    <div className="ag-cell-text-white">
      {props.value === 0 ? "" : formatNumber(props.value)}
    </div>
  );
};

export const CellRenderTC = (props: any) => {
  return <div className="ag-cell-text-yellow">{props.value}</div>;
};

export const CellRenderTran = (props: any) => {
  return <div className="ag-cell-text-violet">{props.value}</div>;
};

export const CellRenderSan = (props: any) => {
  return <div className="ag-cell-text-blue">{props.value}</div>;
};
