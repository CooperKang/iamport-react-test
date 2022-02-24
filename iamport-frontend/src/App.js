import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import DragDrop from "./routes/DragDrop.js";
import UploadProvider from "components/utils/UploadProvider";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "components/themes";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UploadProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/drapDrop">sendEmailTest</Link>
                </li>
              </ul>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drapDrop" element={<DragDrop />} />
            </Routes>
          </Router>
        </UploadProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
