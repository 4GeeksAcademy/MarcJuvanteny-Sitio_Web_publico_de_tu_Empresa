export type CandidateStatus = "applied" | "in_progress" | "hired" | "rejected";

export type CandidateStage =
  | "applied"
  | "review"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface CandidateNote {
  id: string;
  record_id: string;
  content: string;
  created_at: string;
}

export interface CandidateRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string;
  cv_url: string;
  status: CandidateStatus;
  stage: CandidateStage;
  experience_years: number;
  applied_at: string;
  updated_at: string;
  notes?: CandidateNote[];
}

export interface CandidatePayload {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string;
  cv_url: string;
  status: CandidateStatus;
  stage: CandidateStage;
  experience_years: number;
}
