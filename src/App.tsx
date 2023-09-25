import "./App.css";
import Table from "./Test/Table";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}

export default App;
