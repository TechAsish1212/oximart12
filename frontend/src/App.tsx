// import React from 'react'

import { Button, ThemeProvider } from "@mui/material"
import customeTheme from "./Theme/customerTheme"
import Home from "./customer/pages/Home/Home"

const App = () => {
  return (
    <ThemeProvider theme={customeTheme}>
      <Home />
    </ThemeProvider>
  )
}

export default App
