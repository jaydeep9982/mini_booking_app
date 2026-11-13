
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Patient, Answers } from "../types/Booking";
import { getRecommendations } from "../Services/apiService";

function Questions() {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = (location.state as { patient?: Patient } | null)?.patient;

  const [step, setStep] = useState(0);

  const [reason, setReason] = useState<Answers["reason"] | "">("");
  const [insurance, setInsurance] = useState<Answers["insurance"] | "">("");
  const [clinicId, setClinicId] = useState<Answers["clinicId"] | "">("");
  const [timeOfDay, setTimeOfDay] = useState<Answers["timeOfDay"] | "">("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nextStep = () => {
    setError("");

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    setError("");

    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step !== 3 || loading) return;

    if (!patient) {
      navigate("/patient-details");
      return;
    }

    if (!reason || !insurance || !clinicId || !timeOfDay) {
      setError("Please answer all questions.");
      return;
    }

    const answers: Answers = {
      reason,
      insurance,
      clinicId,
      timeOfDay,
    };

    try {
      setLoading(true);
      setError("");

      const slots = await getRecommendations(patient, answers);

      navigate("/recommendations", {
        state: {
          patient,
          answers,
          slots,
        },
      });
    } catch (err) {
      console.error("Recommendation API error:", err);
      setError(
        "Unable to load appointments. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!patient) {
    return (
      <div className="container py-5 text-center">
        <h4>Patient details not found</h4>
        <p>Please enter your details first.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/patient-details")}
        >
          Enter Patient Details
        </button>
      </div>
    );
  }

  const progress = ((step + 1) / 4) * 100;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h3 className="text-center mb-2">
                Appointment Preferences
              </h3>

              <p className="text-center text-muted mb-4">
                Answer a few questions to find the best appointment.
              </p>

              <div className="d-flex justify-content-between mb-2">
                <span className="fw-semibold">Your Progress</span>
                <span className="text-muted">Step {step + 1} of 4</span>
              </div>

              <div
                className="progress mb-4"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                {step === 0 && (
                  <div>
                    <h5 className="mb-3">
                      1. What is the reason for your visit?
                    </h5>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="reason"
                        id="routine"
                        value="ROUTINE_EXAM"
                        checked={reason === "ROUTINE_EXAM"}
                        onChange={() => setReason("ROUTINE_EXAM")}
                      />
                      <label className="form-check-label" htmlFor="routine">
                        Routine Eye Exam
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="reason"
                        id="contact"
                        value="CONTACT_LENS"
                        checked={reason === "CONTACT_LENS"}
                        onChange={() => setReason("CONTACT_LENS")}
                      />
                      <label className="form-check-label" htmlFor="contact">
                        Contact Lens Consultation
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="reason"
                        id="problem"
                        value="EYE_PROBLEM"
                        checked={reason === "EYE_PROBLEM"}
                        onChange={() => setReason("EYE_PROBLEM")}
                      />
                      <label className="form-check-label" htmlFor="problem">
                        Eye Problem
                      </label>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h5 className="mb-3">
                      2. What type of insurance do you have?
                    </h5>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="insurance"
                        id="vision"
                        checked={insurance === "VISION"}
                        onChange={() => setInsurance("VISION")}
                      />
                      <label className="form-check-label" htmlFor="vision">
                        Vision Insurance
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="insurance"
                        id="medical"
                        checked={insurance === "MEDICAL"}
                        onChange={() => setInsurance("MEDICAL")}
                      />
                      <label className="form-check-label" htmlFor="medical">
                        Medical Insurance
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="insurance"
                        id="none"
                        checked={insurance === "NONE"}
                        onChange={() => setInsurance("NONE")}
                      />
                      <label className="form-check-label" htmlFor="none">
                        No Insurance (Self-Pay)
                      </label>
                    </div>

                    {insurance === "NONE" && (
                      <div className="alert alert-info mt-3">
                        <h6>Self-Pay Prices</h6>
                        <p className="mb-1">Routine Exam: $69</p>
                        <p className="mb-1">Contact Lens: $129</p>
                        <p className="mb-0">Eye Problem: $236</p>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h5 className="mb-3">
                      3. Which clinic do you prefer?
                    </h5>

                    {[
                      { id: "ANY", label: "Any Clinic" },
                      { id: "C1", label: "Clinic 1" },
                      { id: "C2", label: "Clinic 2" },
                      { id: "C3", label: "Clinic 3" },
                    ].map((clinic) => (
                      <div className="form-check mb-3" key={clinic.id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="clinic"
                          id={clinic.id}
                          checked={clinicId === clinic.id}
                          onChange={() =>
                            setClinicId(
                              clinic.id as Answers["clinicId"]
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={clinic.id}
                        >
                          {clinic.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h5 className="mb-3">
                      4. What time of day works best for you?
                    </h5>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="time"
                        id="morning"
                        checked={timeOfDay === "MORNING"}
                        onChange={() => setTimeOfDay("MORNING")}
                      />
                      <label className="form-check-label" htmlFor="morning">
                        Morning (Before 12 PM)
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="time"
                        id="afternoon"
                        checked={timeOfDay === "AFTERNOON"}
                        onChange={() => setTimeOfDay("AFTERNOON")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="afternoon"
                      >
                        Afternoon (12 PM or later)
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="time"
                        id="anytime"
                        checked={timeOfDay === "ANY"}
                        onChange={() => setTimeOfDay("ANY")}
                      />
                      <label className="form-check-label" htmlFor="anytime">
                        Any Time
                      </label>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger mt-3">
                    {error}
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={previousStep}
                    disabled={step === 0 || loading}
                  >
                    Back
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                      disabled={
                        (step === 0 && !reason) ||
                        (step === 1 && !insurance) ||
                        (step === 2 && !clinicId)
                      }
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading || !timeOfDay}
                    >
                      {loading ? "Finding Appointments..." : "Find Appointments"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
