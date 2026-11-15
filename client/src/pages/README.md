
# ClearView Eye Care – Appointment Booking Application

A full-stack appointment booking application for ClearView Eye Care. Patients can enter their details, answer appointment preference questions, view recommended appointment slots, and book appointments. Users can also view all booked appointments and open individual booking details in read-only mode.

## 1. How to Run the Server and Client

### Prerequisites

- Java 21
- Node.js and npm
- Eclipse / Spring Tool Suite
- Git

### Run the Backend (Spring Boot)

1. Open the backend project in Eclipse or Spring Tool Suite.
2. Wait for Maven dependencies to download.
3. Locate the main Spring Boot application class.
4. Right-click and select **Run As → Spring Boot App**.

Backend URL:

```text
http://localhost:8080
```

API base URL:

```text
http://localhost:8080/api
```

Alternatively, if Maven is configured:

```bash
mvn spring-boot:run
```

### Run the Frontend (React + TypeScript)

Open a separate terminal in the client directory:

```bash
cd client
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Keep both backend and frontend running while using the application.

### CORS Configuration

The backend allows requests from:

```text
http://localhost:5173
```

If the frontend runs on another port, update the CORS configuration accordingly.

---

## 2. API Endpoints with Example Requests

Base URL:

```text
http://localhost:8080
```

### 1. Get All Clinics

**GET** `/api/clinics`

```http
GET http://localhost:8080/api/clinics
```

Returns the list of available clinics.

### 2. Get All Doctors

**GET** `/api/doctors`

```http
GET http://localhost:8080/api/doctors
```

Returns the list of doctors.

### 3. Get Available Slots

**GET** `/api/slots`

```http
GET http://localhost:8080/api/slots
```

Returns appointment slots that are currently available.

### 4. Get All Bookings

**GET** `/api/bookings`

```http
GET http://localhost:8080/api/bookings
```

Returns the list of booked appointments.

### 5. Get Booking Details by ID

**GET** `/api/bookings/{id}`

Example:

```http
GET http://localhost:8080/api/bookings/BOOK001
```

Returns the details of a specific booking.

### 6. Get Appointment Recommendations

**POST** `/api/recommendations`

Example request:

```json
{
  "patient": {
    "firstName": "John",
    "lastName": "Smith",
    "phone": "1234567890",
    "zip": "12345"
  },
  "answers": {
    "reason": "ROUTINE_EXAM",
    "insurance": "NONE",
    "clinicId": "ANY",
    "timeOfDay": "MORNING"
  }
}
```

Returns up to three recommended appointment slots.

### 7. Create a Booking

**POST** `/api/bookings`

Example request:

```json
{
  "patient": {
    "firstName": "John",
    "lastName": "Smith",
    "phone": "1234567890",
    "zip": "12345"
  },
  "answers": {
    "reason": "ROUTINE_EXAM",
    "insurance": "NONE",
    "clinicId": "ANY",
    "timeOfDay": "MORNING"
  },
  "slotId": "SLOT001"
}
```

Creates a new appointment booking.

**Note:** Use an actual available slot ID from the API response.

### Accepted Values

| Field | Values |
|---|---|
| Reason | `ROUTINE_EXAM`, `CONTACT_LENS`, `EYE_PROBLEM` |
| Insurance | `VISION`, `MEDICAL`, `NONE` |
| Clinic | `ANY`, `C1`, `C2`, `C3` |
| Time | `MORNING`, `AFTERNOON`, `ANY` |

### Booking Error Handling

| Scenario | HTTP Status |
|---|---|
| Unknown slot | 404 Not Found |
| Already booked slot | 409 Conflict |
| Successful booking | 2xx Success |

---

## 3. Application Screenshots

Screenshots of the application will be added in screenshots folder.


## 4. Assumptions Made

No additional assumptions were made beyond the requirements provided in the assignment.

The application follows the specified patient details, appointment questions, recommendation rules, booking validations, and read-only booking details workflow.

The sample names, IDs, and request values in this README are illustrative examples.

---

## 5. What I Would Improve With More Time

### Time-Related Improvements

- Add more unit and integration tests for all API endpoints.
- Improve error handling for unexpected API responses.
- Add additional edge-case testing for appointment recommendations.
- Improve validation for patient details and booking requests.
- Test simultaneous booking requests to ensure the same slot cannot be booked twice.

### UI/UX Improvements

- Further improve responsive design for mobile, tablet, and desktop.
- Improve the visual presentation of appointment recommendation cards.
- Add better loading indicators and error messages.
- Improve booking confirmation and booking details screens.
- Improve accessibility and keyboard navigation.
- Add sorting and filtering options to the booked appointments table.

---

**Project:** ClearView Eye Care – Mini Call Center Booking App

**Backend:** Java 21, Spring Boot, JSON File Storage

**Frontend:** React, TypeScript, Vite, Bootstrap CSS
