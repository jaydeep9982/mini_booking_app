
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PatientDetails from "./pages/PatientDetails";
import Questions from "./pages/Questions";
import Recommendations from "./pages/Recommendations";
import Confirmation from "./pages/Confirmation";
import BookingDetails from "./pages/BookingDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/patient-details"
              element={<PatientDetails />}
            />

            <Route path="/questions" element={<Questions />} />

            <Route
              path="/recommendations"
              element={<Recommendations />}
            />

            <Route
              path="/confirmation"
              element={<Confirmation />}
            />
            <Route path="/bookings/:id" element={<BookingDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
