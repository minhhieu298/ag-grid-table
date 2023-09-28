import { IHeaderParams } from "ag-grid-community";
import { formatNumber, getColorText } from "./getApi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store";
import { change } from "../testSlice";

export const CellRenderTemplate = (props: any) => {
  return (
    <div className={getColorText(props)}>
      {isNaN(props.value) ? (
        <>
          <input
            type="checkbox"
            checked={props.data.rowPinned}
            onChange={() => {}}
          />{" "}
          <span>{props.value}</span>
        </>
      ) : props.value === 0 ? (
        ""
      ) : (
        formatNumber(props.value)
      )}
    </div>
  );
};

export const CellRenderPercent = (props: any) => {
  return (
    <div className={getColorText(props)}>
      {props.data.PD === 0 ? "" : formatNumber(props.value) + "%"}
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

export interface ICustomHeaderParams extends IHeaderParams {
  menuIcon: string;
}

export const CustomHeader = (props: ICustomHeaderParams) => {
  const dispatch = useAppDispatch();
  const [ascSort, setAscSort] = useState("inactive");
  const [descSort, setDescSort] = useState("inactive");
  const [name, setName] = useState("");

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? "active" : "inactive");
    setDescSort(props.column.isSortDescending() ? "active" : "inactive");
  };

  const onSortRequested = (order: "asc" | "desc" | null, event: any) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener("sortChanged", onSortChanged);
    onSortChanged();
  }, []);

  // let menu = null;
  // if (props.enableMenu) {
  //   menu = (
  //     <div
  //       ref={refButton}
  //       className="customHeaderMenuButton"
  //       onClick={() => onMenuClicked()}
  //     >
  //       <i className={`fa ${props.menuIcon}`}></i>
  //     </div>
  //   );
  // }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div
        className="custom-header-icon"
        onClick={(event) => {
          if (name === "asc") onSortRequested(name, event);
          else onSortRequested("desc", event);
        }}
      >
        <div className={`icon-${ascSort}`}>
          <i className="fa fa-caret-up" aria-hidden="true"></i>
        </div>
        <div className={`icon-${descSort}`}>
          <i className="fa fa-caret-down" aria-hidden="true"></i>
        </div>
      </div>
    );
  }

  return (
    <>
      {props.displayName === "PD" || props.displayName === "Percent" ? (
        <div className="custom-header">
          {/* {menu} */}
          <div className="custom-header-label">
            <div className="custom">
              <div
                onClick={() => {
                  dispatch(change("PD"));
                  if (name !== "") setName("");
                }}
              >
                <i className="fa fa-caret-left" aria-hidden="true"></i>
              </div>
              <span
                onClick={() => {
                  setName("asc");
                  if (name === "asc") setName("desc");
                }}
              >
                +/-
                {sort}
              </span>
              <div
                onClick={() => {
                  dispatch(change("Percent"));
                  if (name !== "") setName("");
                }}
              >
                <i className="fa fa-caret-right" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="custom-header"
          onClick={() => {
            setName("asc");
            if (name === "asc") setName("desc");
          }}
        >
          {/* {menu} */}
          <div className="custom-header-label">{props.displayName}</div>
          {sort}
        </div>
      )}
    </>
  );
};
