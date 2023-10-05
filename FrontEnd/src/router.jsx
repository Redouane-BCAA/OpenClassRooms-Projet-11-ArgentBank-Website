import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SignInPage from "./pages/SignIn"
import UserCountPage from "./pages/UserCount"
import Error from "./pages/Error"

import Header from "./components/Header"
import Footer from "./components/Footer"

import React from 'react'

export default function Router() {
  return (
    <div>
        <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signin" element={<SignInPage/>} />
                <Route path="/user" element={<UserCountPage/>} />
                <Route path="/*" element={<Error/>} />
            </Routes>
        <Footer />
    </div>
  )
}

