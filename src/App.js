//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Application entry point
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import store from "redux/store";
import { Provider } from "react-redux";
import EntryRoute from "navigations/EntryRoute";
import CustomAlert from "components/shared/commons/CustomAlert";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import * as Color from "constants/colors";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito", "sans-serif"].join(","),
    },
    palette: {
      primary: {
        main: Color.primary,
      },
      secondary: {
        main: Color.secondary,
      },
      success: {
        main: Color.success,
      },
      error: {
        main: Color.error,
      },
      warning: {
        main: Color.warning,
      },
      info: {
        main: Color.info,
      },
      accent1: {
        main: Color.accent1,
      },
    },
  });

  return (
    <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EntryRoute />
          <CustomAlert />
        </ThemeProvider>
      </Provider>
    </Box>
  );
};

export default App;
