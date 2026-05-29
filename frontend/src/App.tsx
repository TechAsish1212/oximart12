// import React from 'react'

import { Button, ThemeProvider } from "@mui/material"
import customeTheme from "./Theme/customerTheme"
import Home from "./customer/pages/Home/Home"
import Products from "./customer/pages/Product/Products"

const App = () => {
  return (
    <ThemeProvider theme={customeTheme}>
      {/* <Home /> */}
      <Products/>
    </ThemeProvider>
  )
}

export default App
