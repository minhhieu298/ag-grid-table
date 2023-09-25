const handleRowClick = (event) => {
  const selectedRows = event.api.getSelectedNodes();
  if (selectedRows.length > 0) {
    const selectedRow = selectedRows[0].data;
    if (data) {
      const updatedRowData = getDataApi(data).map((row) =>
        row.id === selectedRow.id ? { ...row, rowPinned: "top" } : row
      );
    }
  }
};
