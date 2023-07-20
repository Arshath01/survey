import { Home } from "./Pages/Home"
import {Greetings} from "./Pages/Greetings"
import { Route, Routes } from "react-router-dom"

function App (){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Greetings" element = {<Greetings/>}/>
      </Routes>
    </>
  )
}

export default App;