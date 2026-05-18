"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  createRecordNote,
  deleteRecordNote,
  getRecordById,
  getRecordNotes,
  patchRecord,
} from "../../lib/api";
import { CandidateNote, CandidateRecord, CandidateStage, CandidateStatus } from "../../lib/types";
import { LoadingSpinner } from "./LoadingSpinner";

const STATUS_OPTIONS: CandidateStatus[] = ["applied", "in_progress", "hired", "rejected"];
const STAGE_OPTIONS: CandidateStage[] = [
  "applied",
  "review",
  "interview",
  "offer",
  "hired",
  "rejected",
];

export function CandidateDetailPage({ id }: { id: string }) {
  const [candidate, setCandidate] = useState<CandidateRecord | null>(null);
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusDraft, setStatusDraft] = useState<CandidateStatus>("applied");
  const [stageDraft, setStageDraft] = useState<CandidateStage>("applied");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingStage, setUpdatingStage] = useState(false);

  const [newNote, setNewNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [record, recordNotes] = await Promise.all([
          getRecordById(id),
          getRecordNotes(id),
        ]);

        setCandidate(record);
        setNotes(recordNotes);
        setStatusDraft(record.status);
        setStageDraft(record.stage);
      } catch {
        setError("No pudimos cargar el detalle de la candidatura.");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!candidate) {
      return;
    }

    try {
      setUpdatingStatus(true);
      const updated = await patchRecord(candidate.id, { status: statusDraft });
      setCandidate(updated);
    } catch {
      setError("No se pudo actualizar el estado.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleStageUpdate = async () => {
    if (!candidate) {
      return;
    }

    try {
      setUpdatingStage(true);
      const updated = await patchRecord(candidate.id, { stage: stageDraft });
      setCandidate(updated);
    } catch {
      setError("No se pudo actualizar la etapa.");
    } finally {
      setUpdatingStage(false);
    }
  };

  const handleAddNote = async () => {
    if (!candidate || !newNote.trim()) {
      return;
    }

    try {
      setNoteLoading(true);
      setNoteError(null);
      const created = await createRecordNote(candidate.id, newNote.trim());
      setNotes((previous) => [created, ...previous]);
      setNewNote("");
    } catch {
      setNoteError("No se pudo guardar la nota.");
    } finally {
      setNoteLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!candidate) {
      return;
    }

    try {
      setNoteLoading(true);
      setNoteError(null);
      await deleteRecordNote(candidate.id, noteId);
      setNotes((previous) => previous.filter((note) => note.id !== noteId));
    } catch {
      setNoteError("No se pudo eliminar la nota.");
    } finally {
      setNoteLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <LoadingSpinner label="Cargando detalle de candidatura..." />
      </main>
    );
  }

  if (error && !candidate) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      </main>
    );
  }

  if (!candidate) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <p className="text-sm text-slate-600">No se encontró la candidatura.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#003049]">{candidate.full_name}</h1>
          <p className="text-sm text-slate-600">{candidate.position}</p>
        </div>

        <div className="flex gap-2">
          <Link href="/" className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium">
            Volver
          </Link>
          <Link
            href={`/candidates/${candidate.id}/edit`}
            className="rounded-md bg-[#003049] px-3 py-2 text-sm font-medium text-white"
          >
            Editar candidatura
          </Link>
        </div>
      </header>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 sm:grid-cols-2">
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Teléfono:</strong> {candidate.phone}</p>
        <p><strong>Puesto:</strong> {candidate.position}</p>
        <p><strong>Años de experiencia:</strong> {candidate.experience_years}</p>
        <p><strong>Estado:</strong> {candidate.status}</p>
        <p><strong>Etapa:</strong> {candidate.stage}</p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#003049] underline">
            {candidate.linkedin_url}
          </a>
        </p>
        <p>
          <strong>CV:</strong>{" "}
          <a href={candidate.cv_url} target="_blank" rel="noopener noreferrer" className="text-[#003049] underline">
            Ver CV
          </a>
        </p>
        <p>
          <strong>Fecha de aplicación:</strong>{" "}
          {new Date(candidate.applied_at).toLocaleString("es-ES")}
        </p>
      </section>

      <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-slate-700">
            Actualizar estado
          </label>
          <select
            id="status"
            value={statusDraft}
            onChange={(event) => setStatusDraft(event.target.value as CandidateStatus)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleStatusUpdate}
            disabled={updatingStatus}
            className="rounded-md bg-[#e8640c] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {updatingStatus ? "Guardando..." : "Guardar estado"}
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="stage" className="block text-sm font-medium text-slate-700">
            Actualizar etapa
          </label>
          <select
            id="stage"
            value={stageDraft}
            onChange={(event) => setStageDraft(event.target.value as CandidateStage)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {STAGE_OPTIONS.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleStageUpdate}
            disabled={updatingStage}
            className="rounded-md bg-[#e8640c] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {updatingStage ? "Guardando..." : "Guardar etapa"}
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-medium text-[#003049]">Notas</h2>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
            placeholder="Añadir una nota"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleAddNote}
            disabled={noteLoading || !newNote.trim()}
            className="rounded-md bg-[#003049] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {noteLoading ? "Guardando..." : "Añadir nota"}
          </button>
        </div>

        {noteError && (
          <p className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{noteError}</p>
        )}

        <ul className="mt-4 space-y-2">
          {notes.length === 0 && <li className="text-sm text-slate-600">No hay notas para esta candidatura.</li>}

          {notes.map((note) => (
            <li key={note.id} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm text-slate-700">{note.content}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>{new Date(note.created_at).toLocaleString("es-ES")}</span>
                <button
                  type="button"
                  onClick={() => void handleDeleteNote(note.id)}
                  disabled={noteLoading}
                  className="font-medium text-red-600 disabled:opacity-60"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
