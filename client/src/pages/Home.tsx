
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllBookings } from "../Services/apiService";
import type { Booking } from "../Services/apiService";

function Home() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (err) {
        console.error("Error loading bookings:", err);
        setError("Unable to load booked appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="container-fluid px-0">


{/* Hero Section */}
<section className="bg-light py-5">
  <div className="container-fluid py-5">
    <div className="row justify-content-center text-center">

      <div className="col-12 col-lg-10">

        <span className="badge bg-primary px-4 py-2 mb-4">
          ClearView Eye Care
        </span>

        <h1 className="display-2 fw-bold mb-4">
          Your Vision, Our Priority.
        </h1>

        <p className="lead text-muted mx-auto mb-4"
           style={{ maxWidth: "850px" }}>
          Find the right eye care specialist and schedule
          your appointment at one of our three clinics.
        </p>

        <button
          className="btn btn-primary btn-lg px-5 py-3"
          onClick={() => navigate("/patient-details")}
        >
          Book Appointment
        </button>

      </div>

    </div>
  </div>
</section>


      {/* Bookings Section */}
      <section className="container py-5">

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              Booked Appointments
            </h2>
            <p className="text-muted mb-0">
              View all previously booked appointments.
            </p>
          </div>

          <span className="badge bg-primary fs-6">
            Total: {bookings.length}
          </span>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">Loading appointments...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="alert alert-info">
            No appointments have been booked yet.
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">
                    <tr>
                      <th className="p-3">Patient Name</th>
                      <th className="p-3">Slot</th>
                      <th className="p-3">Clinic</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>

                        <td className="p-3 fw-semibold">
                          {booking.patient.firstName}{" "}
                          {booking.patient.lastName}
                        </td>

                        <td className="p-3">
                          {booking.slotId}
                        </td>

                        <td className="p-3">
                          {booking.answers.clinicId}
                        </td>

                        <td className="p-3">
                          {new Date(
                            booking.createdAt
                          ).toLocaleString()}
                        </td>

                        <td className="p-3">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(`/bookings/${booking.id}`)
                            }
                          >
                            View Details
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          </div>
        )}

      </section>

    </div>
  );
}

export default Home;
