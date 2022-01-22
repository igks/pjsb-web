//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Application entry point
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import store from "./redux/store";
import { Provider } from "react-redux";
import EntryRoute from "./navigations/EntryRoute";
import CustomAlert from "./components/shared/commons/CustomAlert";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito", "sans-serif"].join(","),
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <EntryRoute />
        <CustomAlert />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
