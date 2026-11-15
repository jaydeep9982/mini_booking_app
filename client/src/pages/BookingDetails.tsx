
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
      try {
        if (!id) {
          setError("Invalid booking ID.");
          return;
        }

        const data = await getBookingById(id);
        setBooking(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id]);

  const Detail = ({ label, value }: {
    label: string;
    value: string;
  }) => (
    <div className="col-md-6 mb-3">
      <div className="text-muted small mb-1">{label}</div>
      <div className="fw-semibold">{value || "Not available"}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading booking details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          {error || "Booking not found."}
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="text-center mb-4">
        <h2 className="fw-bold">Booking Details</h2>
        <p className="text-muted">
          Complete information about your appointment.
        </p>
        <span className="badge bg-success px-3 py-2">
          Booked
        </span>
      </div>

      <div className="card border-0 shadow-sm mx-auto"
        style={{ maxWidth: "850px" }}>

        <div className="card-body p-4 p-md-5">

          <h5 className="fw-bold mb-4">Booking Information</h5>

          <div className="row">
            <Detail label="Booking ID" value={booking.id} />
            <Detail label="Slot ID" value={booking.slotId} />
            <Detail
              label="Booking Created"
              value={new Date(booking.createdAt).toLocaleString()}
            />
          </div>

          <hr className="my-4" />

          <h5 className="fw-bold mb-4">Patient Information</h5>

          <div className="row">
            <Detail
              label="Patient Name"
              value={`${booking.patient.firstName} ${booking.patient.lastName}`}
            />
            <Detail label="Phone Number" value={booking.patient.phone} />
            <Detail label="ZIP Code" value={booking.patient.zip} />
          </div>

          <hr className="my-4" />

          <h5 className="fw-bold mb-4">Appointment Preferences</h5>

          <div className="row">
            <Detail
              label="Reason"
              value={booking.answers.reason.replaceAll("_", " ")}
            />
            <Detail
              label="Insurance"
              value={booking.answers.insurance}
            />
            <Detail
              label="Clinic Preference"
              value={booking.answers.clinicId}
            />
            <Detail
              label="Preferred Time"
              value={booking.answers.timeOfDay}
            />
          </div>

          <hr className="my-4" />

          <div className="text-end">
            <button
              className="btn btn-outline-primary px-4"
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
