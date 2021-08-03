import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Main from "./pages/Main";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  );
}

export default App;
