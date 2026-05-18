import { CandidateNote, CandidateRecord } from "./types";

export const mockNotesByRecordId: Record<string, CandidateNote[]> = {
  "53f2bbdc-4ea0-4b34-b076-4f8e7c2736ac": [
    {
      id: "dbb20683-26c4-4d30-8a25-0f85e496927a",
      record_id: "53f2bbdc-4ea0-4b34-b076-4f8e7c2736ac",
      content: "Experiencia algo corta pero la formacion es solida.",
      created_at: "2026-03-25T20:04:32.114Z",
    },
  ],
};

export const mockRecords: CandidateRecord[] = [
  {
    id: "53f2bbdc-4ea0-4b34-b076-4f8e7c2736ac",
    full_name: "Michael Smith",
    email: "michael.smith@gmail.com",
    phone: "+1 423-828-6619",
    position: "Jefa/e de Gabinete",
    linkedin_url: "https://linkedin.com/in/michael-smith",
    cv_url: "https://storage.example.com/cv/michael-smith.pdf",
    status: "in_progress",
    stage: "review",
    experience_years: 6,
    applied_at: "2026-02-28T20:04:32.114Z",
    updated_at: "2026-03-27T20:04:32.114Z",
    notes: mockNotesByRecordId["53f2bbdc-4ea0-4b34-b076-4f8e7c2736ac"],
  },
  {
    id: "09ea7dde-a5dc-4492-9212-3850c8f858ad",
    full_name: "Lucia Romero",
    email: "lucia.romero@correo.com",
    phone: "+34 611 222 333",
    position: "Recruiter Senior",
    linkedin_url: "https://linkedin.com/in/lucia-romero",
    cv_url: "https://storage.example.com/cv/lucia-romero.pdf",
    status: "applied",
    stage: "applied",
    experience_years: 4,
    applied_at: "2026-04-10T09:14:21.000Z",
    updated_at: "2026-04-10T09:14:21.000Z",
    notes: [],
  },
];
