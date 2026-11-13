import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container-fluid mt-5 text-center">
            <h1>ClearView Eye Care</h1>
            <p>Your vision, our priority.</p>

            <button
                className="btn btn-primary"
                onClick={() => navigate("/patient-details")}
            >
                Book Appointment
            </button>
        </div>
    );
}

export default Home;