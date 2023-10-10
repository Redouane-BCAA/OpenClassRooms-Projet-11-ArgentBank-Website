import {Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import SignInPage from "./pages/SignIn"
import UserCountPage from "./pages/UserCount"
import Error from "./pages/Error"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useSelector } from "react-redux"

import React from 'react'

export default function Router() {
  const isConnected = useSelector ((state) => state.authentification.isConnected)
  return (
    <div>
        <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signin" element={<SignInPage/>} />
                {/* Renvoyé l'utilisateur sur la page signin s'il n'est pas connecté */}
                <Route path="/user" element={isConnected ? <UserCountPage/> : <Navigate to="/signin"/>} />
                <Route path="/*" element={<Error/>} />
            </Routes>
        <Footer />
    </div>
  )
}

