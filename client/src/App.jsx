import { Provider as ReduxProvider } from "react-redux";

import store from "./store";
import AppRouter from "./routers/AppRouter";

const App = () => (
  <ReduxProvider store={store}>
    <AppRouter />
  </ReduxProvider>
);

export default App;
