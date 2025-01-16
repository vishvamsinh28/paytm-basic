import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from "./components/Signup"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import SendMoney from "./components/SendMoney"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  )
}