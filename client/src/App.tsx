import React from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom"
import ASTCreationPage from "./pages/ASTCreation"
import { Toaster } from "react-hot-toast"
import EvaluateRulePage from "./pages/EvaluateRule"
import AvailableRulesPage from "./pages/AvailableRules"
import CombineRulesPage from "./pages/CombineRules"
import HomePage from "./pages/Home"

const App = (): React.JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row h-full w-[100vw]">
        <Sidebar />
        <main className="p-3 w-full overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<ASTCreationPage />} />
            <Route path="/combine" element={<CombineRulesPage />} />
            <Route path="/evaluate" element={<EvaluateRulePage />} />
            <Route path="/available-rules" element={<AvailableRulesPage />} />
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  )
}

export default App
