
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBookingById } from "../Services/apiService";
import type { Booking } from "../Services/apiService";

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      if (!id) {
        setError("Invalid booking ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await getBookingById(id);
        setBooking(data);
      } catch (err) {
        console.error("Booking details error:", err);
        setError("Unable to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading booking details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error || "Booking not found."}
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Booking Details</h2>
          <p className="text-muted mb-0">
            Complete information about this appointment.
          </p>
        </div>

        <span className="badge bg-success fs-6">
          Booked
        </span>
      </div>

      <div className="card border-0 shadow-sm mx-auto"
        style={{ maxWidth: "750px" }}>

        <div className="card-body p-4">

          <h5 className="fw-bold mb-3">
            Booking Information
          </h5>

          <p>
            <strong>Booking ID:</strong> {booking.id}
          </p>

          <p>
            <strong>Slot ID:</strong> {booking.slotId}
          </p>

          <p>
            <strong>Booking Created:</strong>{" "}
            {new Date(booking.createdAt).toLocaleString()}
          </p>

          <hr />

          <h5 className="fw-bold mb-3">
            Patient Information
          </h5>

          <p>
            <strong>Name:</strong>{" "}
            {booking.patient.firstName} {booking.patient.lastName}
          </p>

          <p>
            <strong>Phone:</strong> {booking.patient.phone}
          </p>

          <p>
            <strong>ZIP Code:</strong> {booking.patient.zip}
          </p>

          <hr />

          <h5 className="fw-bold mb-3">
            Appointment Preferences
          </h5>

          <p>
            <strong>Reason:</strong>{" "}
            {booking.answers.reason.replaceAll("_", " ")}
          </p>

          <p>
            <strong>Insurance:</strong>{" "}
            {booking.answers.insurance}
          </p>

          <p>
            <strong>Clinic Preference:</strong>{" "}
            {booking.answers.clinicId}
          </p>

          <p>
            <strong>Preferred Time:</strong>{" "}
            {booking.answers.timeOfDay}
          </p>

          <hr />

          <div className="text-end">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
