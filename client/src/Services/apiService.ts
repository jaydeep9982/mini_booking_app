
import axios from "axios";

import type { Patient, Answers } from "../types/Booking";
import type { Slot } from "../types/Slot";

// Common Axios configuration
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Types
export interface Clinic {
    id: string;
    name: string;
    zip: string;
}

export interface Doctor {
    id: string;
    name: string;
    type: string;
    clinicId: string;
}

export interface Booking {
    id: string;
    patient: Patient;
    answers: Answers;
    slotId: string;
    createdAt: string;
}

// 1. Get all clinics
export const getClinics = async (): Promise<Clinic[]> => {
    const response = await api.get<Clinic[]>("/clinics");
    return response.data;
};

// 2. Get all doctors
export const getDoctors = async (): Promise<Doctor[]> => {
    const response = await api.get<Doctor[]>("/doctors");
    return response.data;
};

// 3. Get available slots
export const getAvailableSlots = async (): Promise<Slot[]> => {
    const response = await api.get<Slot[]>("/slots");
    return response.data;
};

// 4. Get all bookings
export const getAllBookings = async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>("/bookings");
    return response.data;
};

// 5. Get booking by ID
export const getBookingById = async (id: string): Promise<Booking> => {
    const response = await api.get<Booking>(`/bookings/${id}`);
    return response.data;
};

// 6. Get appointment recommendations
export const getRecommendations = async (
    patient: Patient,
    answers: Answers
): Promise<Slot[]> => {
    const response = await api.post<Slot[]>("/recommendations", {
        patient,
        answers
    });

    return response.data;
};

// 7. Create booking
export const createBooking = async (
    patient: Patient,
    answers: Answers,
    slotId: string
): Promise<Booking> => {

    const response = await api.post<Booking>("/bookings", {
        patient,
        answers,
        slotId
    });

    return response.data;
};
