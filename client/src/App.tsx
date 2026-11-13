import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PatientDetails from "./pages/PatientDetails";

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />

                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/patient-details" element={<PatientDetails />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;