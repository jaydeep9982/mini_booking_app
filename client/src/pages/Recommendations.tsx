
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { Patient, Answers } from "../types/Booking";
import type { Slot } from "../types/Slot";

import {
  getDoctors,
  getClinics,
} from "../Services/apiService";

import type {
  Doctor,
  Clinic,
} from "../Services/apiService";

interface RecommendationState {
  patient: Patient;
  answers: Answers;
  slots: Slot[];
}

function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as RecommendationState | null;

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const [doctorData, clinicData] = await Promise.all([
          getDoctors(),
          getClinics(),
        ]);

        setDoctors(doctorData);
        setClinics(clinicData);
      } catch (err) {
        console.error(err);
        setError("Unable to load doctor and clinic details.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, []);

  if (!state) {
    return (
      <div className="container py-5 text-center">
        <h4>Appointment recommendations not found.</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  const { patient, answers, slots } = state;

  const handleSelectAppointment = (slot: Slot) => {
    navigate("/confirmation", {
      state: {
        patient,
        answers,
        slot,
        slots,
      },
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-2">
        Recommended Appointments
      </h2>

      <p className="text-center text-muted mb-4">
        Hello {patient.firstName}, choose your preferred appointment.
      </p>

      {slots.length === 0 ? (
        <div className="alert alert-warning text-center">
          No appointments are currently available.
        </div>
      ) : (
        <div className="row justify-content-center">
          {slots.map((slot, index) => {
            const doctor = doctors.find(
              (item) => item.id === slot.doctorId
            );

            const clinic = clinics.find(
              (item) => item.id === doctor?.clinicId
            );

            return (
              <div className="col-lg-8 mb-3" key={slot.id}>
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">
                        Appointment Option {index + 1}
                      </h5>

                      <span className="badge bg-primary">
                        Recommended
                      </span>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <small className="text-muted">
                          Doctor Name
                        </small>
                        <h6>
                          {doctor?.name || "Doctor details unavailable"}
                        </h6>
                      </div>

                      <div className="col-md-6 mb-3">
                        <small className="text-muted">
                          Specialization
                        </small>
                        <h6>
                          {doctor?.type || "Not available"}
                        </h6>
                      </div>

                      <div className="col-md-6 mb-3">
                        <small className="text-muted">
                          Clinic
                        </small>
                        <h6>
                          {clinic?.name || "Clinic details unavailable"}
                        </h6>
                      </div>

                      <div className="col-md-6 mb-3">
                        <small className="text-muted">
                          Appointment Date & Time
                        </small>
                        <h6>
                          {new Date(slot.start).toLocaleString()}
                        </h6>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary w-100 mt-2"
                      onClick={() => handleSelectAppointment(slot)}
                    >
                      Select Appointment
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
