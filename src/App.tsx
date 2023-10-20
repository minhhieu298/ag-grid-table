import "./App.css";
import Table from "./Test/Table";
import { Route, Routes } from "react-router-dom";

// import { QueryClient, QueryClientProvider } from "react-query";
import TableHNX from "./Test/TableHNX";

// const queryClient = new QueryClient();
function App() {
  return (
    <Routes>
      {/* <QueryClientProvider client={queryClient}> */}
      <Route index element={<Table />} />
      <Route path="/hnx" element={<TableHNX />} />
      {/* </QueryClientProvider> */}
    </Routes>
  );
}

export default App;
