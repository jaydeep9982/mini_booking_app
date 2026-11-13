
import { useState } from "react";

function PatientDetails() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        zip: ""
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            firstName: "",
            lastName: "",
            phone: "",
            zip: ""
        };

        if (!/^[A-Za-z ]+$/.test(firstName.trim())) {
            newErrors.firstName = "Please enter a valid first name";
        }

        if (!/^[A-Za-z ]+$/.test(lastName.trim())) {
            newErrors.lastName = "Please enter a valid last name";
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            newErrors.phone = "Phone number must contain 10 digits";
        }

        if (!/^[0-9]{5}$/.test(zip)) {
            newErrors.zip = "ZIP code must contain 5 digits";
        }

        setErrors(newErrors);

        if (
            newErrors.firstName ||
            newErrors.lastName ||
            newErrors.phone ||
            newErrors.zip
        ) {
            return;
        }

        const patientData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone,
            zip
        };

        console.log(patientData);

        alert("Patient details added successfully!");

        // Clear all fields
        setFirstName("");
        setLastName("");
        setPhone("");
        setZip("");

        // Clear errors
        setErrors({
            firstName: "",
            lastName: "",
            phone: "",
            zip: ""
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <h2 className="mb-4">Patient Details</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <small className="text-danger">{errors.firstName}</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <small className="text-danger">{errors.lastName}</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                maxLength={10}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <small className="text-danger">{errors.phone}</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">ZIP Code</label>
                            <input
                                type="text"
                                className="form-control"
                                value={zip}
                                maxLength={5}
                                onChange={(e) => setZip(e.target.value)}
                            />
                            <small className="text-danger">{errors.zip}</small>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Continue
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default PatientDetails;
