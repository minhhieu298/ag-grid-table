export const CustomHeaderComponent = () => {
    return `
        <div class="ag-cell-label-container" role="presentation">
            <span class="icon-right" style="font-size: 12pt; position: relative;cursor: pointer"><i class="fa fa-caret-right" aria-hidden="true"></i></span>
            <div ref="eLabel" class="ag-header-cell-label" role="presentation" style="position: relative">
                <span style="font-size: 10pt; position: relative; top: -1px">+/-</span>
                <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon ag-hidden" style="bottom: -6px"><i class="fa fa-sort-asc" aria-hidden="true"></i></span>
                <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon ag-hidden" style="bottom: 0"><i class="fa fa-sort-desc" aria-hidden="true"></i></span>
            </div>
            <span class="icon-left" style="font-size: 12pt; position: relative; cursor: pointer"><i class="fa fa-caret-left" aria-hidden="true"></i></span>
        </div>
    `
//   return (
//     <div className="ag-cell-label-container" role="presentation">
//       <span
//         className="icon-right"
//         style={{fontSize: '12pt', position: 'relative',cursor: 'pointer'}}
//       >
//         <i className="fa fa-caret-right" aria-hidden="true"></i>
//       </span>
//       <div
//         ref="eLabel"
//         className="ag-header-cell-label"
//         role="presentation"
//         style={{position: "relative"}}
//       >
//         <span style={{fontSize: "10pt", position: "relative", top: "-1px"}}>+/-</span>
//         <span
//           ref="eSortAsc"
//           className="ag-header-icon ag-sort-ascending-icon ag-hidden"
//           style={{bottom: "-6px"}}
//         >
//           <i className="fa fa-sort-asc" aria-hidden="true"></i>
//         </span>
//         <span
//           ref="eSortDesc"
//           className="ag-header-icon ag-sort-descending-icon ag-hidden"
//           style={{bottom: "0"}}
//         >
//           <i className="fa fa-sort-desc" aria-hidden="true"></i>
//         </span>
//       </div>
//       <span
//         className="icon-left"
//         style={{fontSize: "12pt", position: "relative", cursor: "pointer"}}
//       >
//         <i className="fa fa-caret-left" aria-hidden="true"></i>
//       </span>
//     </div>
//   );
};
