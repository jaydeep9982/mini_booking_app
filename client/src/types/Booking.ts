
export interface Patient {
    firstName: string;
    lastName: string;
    phone: string;
    zip: string;
}

export interface Answers {
    reason: "ROUTINE_EXAM" | "CONTACT_LENS" | "EYE_PROBLEM";
    insurance: "VISION" | "MEDICAL" | "NONE";
    clinicId: "ANY" | "C1" | "C2" | "C3";
    timeOfDay: "MORNING" | "AFTERNOON" | "ANY";
}
