import "./App.scss";
import Filters from "./components/shared/Filters";
import { CategoryFilters } from "./constants/filters";

function App() {
  return <Filters filters={CategoryFilters} />;
}

export default App;
