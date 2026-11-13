
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { Patient, Answers } from "../types/Booking";
import type { Slot } from "../types/Slot";

import { createBooking } from "../Services/apiService";
import type { Booking } from "../Services/apiService";

interface ConfirmationState {
  patient: Patient;
  answers: Answers;
  slot: Slot;
  slots: Slot[];
}

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as ConfirmationState | null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  if (!state) {
    return (
      <div className="container py-5 text-center">
        <h4>Appointment details not found.</h4>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  const { patient, answers, slot, slots } = state;

  const handleBooking = async () => {
    if (loading || booking) return;

    try {
      setLoading(true);
      setError("");

      const result = await createBooking(
        patient,
        answers,
        slot.id
      );

      setBooking(result);
    } catch (err: any) {
      console.error("Booking error:", err);

      if (err.response?.status === 409) {
        setError(
          "Sorry, this appointment has already been booked. Please select another slot."
        );
      } else if (err.response?.status === 404) {
        setError(
          "This appointment slot was not found. Please select another appointment."
        );
      } else {
        setError(
          "Unable to confirm your appointment. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: "650px" }}
      >
        <div className="card-body p-4 p-md-5">

          {booking ? (
            <div className="text-center">
              <div className="text-success display-3 mb-3">
                ✓
              </div>

              <h3 className="text-success">
                Appointment Confirmed!
              </h3>

              <p className="text-muted">
                Your appointment has been successfully booked.
              </p>

              <div className="alert alert-success mt-4">
                <strong>Booking ID:</strong>
                <div>{booking.id}</div>
              </div>

              <p>
                <strong>Patient:</strong>{" "}
                {patient.firstName} {patient.lastName}
              </p>

              <p>
                <strong>Appointment:</strong>{" "}
                {new Date(slot.start).toLocaleString()}
              </p>

              <button
                className="btn btn-primary mt-3"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-center mb-4">
                Confirm Your Appointment
              </h3>

              <h5>Patient Details</h5>

              <p>
                <strong>Name:</strong>{" "}
                {patient.firstName} {patient.lastName}
              </p>

              <p>
                <strong>Phone:</strong> {patient.phone}
              </p>

              <p>
                <strong>ZIP Code:</strong> {patient.zip}
              </p>

              <hr />

              <h5>Appointment Details</h5>

              <p>
                <strong>Doctor ID:</strong> {slot.doctorId}
              </p>

              <p>
                <strong>Date & Time:</strong>{" "}
                {new Date(slot.start).toLocaleString()}
              </p>

              <p>
                <strong>Appointment Reason:</strong>{" "}
                {answers.reason.replaceAll("_", " ")}
              </p>

              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}

              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleBooking}
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>

              <button
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={() =>
                  navigate("/recommendations", {
                    state: {
                      patient,
                      answers,
                      slots,
                    },
                  })
                }
                disabled={loading}
              >
                Back to Appointments
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Confirmation;
