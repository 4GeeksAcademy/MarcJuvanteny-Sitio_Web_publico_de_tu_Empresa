import { CandidateNote, CandidatePayload, CandidateRecord } from "./types";
import { mockNotesByRecordId, mockRecords } from "./mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: "no-store",
    });
  } catch {
    throw new ApiError(`No se pudo conectar con la API en ${API_BASE_URL}.`, 0);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ApiError(
      errorBody || "No se pudo completar la solicitud.",
      response.status,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function asArrayResponse<T>(value: T[] | { data: T[] }): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return value.data;
}

export async function getRecords(): Promise<CandidateRecord[]> {
  try {
    const response = await request<CandidateRecord[] | { data: CandidateRecord[] }>(
      "/records",
    );
    return asArrayResponse(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return mockRecords;
    }

    throw error;
  }
}

export async function getRecordById(id: string): Promise<CandidateRecord> {
  try {
    return await request<CandidateRecord>(`/records/${id}`);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const found = mockRecords.find((record) => record.id === id);
      if (found) {
        return found;
      }
    }

    throw error;
  }
}

export async function patchRecord(
  id: string,
  payload: Partial<Pick<CandidateRecord, "status" | "stage">>,
): Promise<CandidateRecord> {
  return await request<CandidateRecord>(`/records/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function createRecord(
  payload: CandidatePayload,
): Promise<CandidateRecord> {
  return await request<CandidateRecord>("/records", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateRecord(
  id: string,
  payload: CandidatePayload,
): Promise<CandidateRecord> {
  return await request<CandidateRecord>(`/records/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function getRecordNotes(id: string): Promise<CandidateNote[]> {
  try {
    const response = await request<CandidateNote[] | { data: CandidateNote[] }>(
      `/records/${id}/notes`,
    );
    return asArrayResponse(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      return mockNotesByRecordId[id] ?? [];
    }

    throw error;
  }
}

export async function createRecordNote(
  id: string,
  content: string,
): Promise<CandidateNote> {
  return await request<CandidateNote>(`/records/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function deleteRecordNote(
  id: string,
  noteId: string,
): Promise<void> {
  await request<void>(`/records/${id}/notes/${noteId}`, {
    method: "DELETE",
  });
}
