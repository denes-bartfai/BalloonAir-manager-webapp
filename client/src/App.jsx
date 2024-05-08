import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home/";
import Navbar from "./Components/Navbar/Navbar";
import Sales from "./Components/Sales/Sales";
import Statistic from "./Components/Statistic/Statistic";
import Contacts from "./Components/Contacts/Contacts"
import Calendar from "./Components/Calendar/Calendar";
import Links from "./Components/Links/Links";

import "./App.css"

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route
            path="/"
            element={<Home/>}
        />

        <Route
            path="/sales"
            element={<Sales/>}
        />

        <Route
          path="/statistic"
          element={<Statistic />}
        />

        <Route
          path="/contacts"
          element={<Contacts />}
        />

        <Route
          path="/calendar"
          element={<Calendar />}
        />

        <Route
          path="/links"
          element={<Links />}
        />

      </Routes>
    </Router>
    </>
  )
}

export default App
