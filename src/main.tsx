import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./assets/style/reset.css";

import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";

import chakraTheme from "@chakra-ui/theme";
const { Button, NumberInput, Select } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    NumberInput,
    Select,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </React.StrictMode>
);
