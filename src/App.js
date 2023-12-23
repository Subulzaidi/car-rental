import { Route, Routes } from "react-router-dom";
import Home from "./System";
import Renter from "./System/Renter/index";
import History from "./System/Renter/History";
import BookNow from "./System/Renter/components/BookNow";
import Cardetail from "./System/Renter/components/Cardetail";

function App() {
  return (
    <Routes>
      <Route path="/" element=<Home /> />

      {/* renter */}
      <Route path="/user" element=<Renter /> />
      <Route path="/user/history" element=<History /> />
      {/* car details */}
      <Route path="/user/details/:id" element=<Cardetail /> />
    </Routes>
  );
}

export default App;
