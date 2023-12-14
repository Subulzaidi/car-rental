import { Route, Routes } from "react-router-dom";
import Home from "./System";
import Renter from "./System/Renter/index";
import History from "./System/Renter/History";
import BookNow from "./System/Renter/components/BookNow";

function App() {
  return (
    <Routes>
      <Route path="/" element=<Home /> />

      
      {/* renter */}
      <Route path="/user" element=<Renter /> />
      <Route path="/user/history" element=<History /> />

      {/* Renting a car */}
      <Route path="/user/rent" element=<BookNow/> />



      
    </Routes>
  );
}

export default App;
