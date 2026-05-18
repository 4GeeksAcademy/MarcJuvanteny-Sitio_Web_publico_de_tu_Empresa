"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createRecord, getRecordById, updateRecord } from "../../lib/api";
import { CandidatePayload, CandidateRecord } from "../../lib/types";
import { LoadingSpinner } from "./LoadingSpinner";

type Mode = "create" | "edit";

const INITIAL_FORM: CandidatePayload = {
  full_name: "",
  email: "",
  phone: "",
  position: "",
  linkedin_url: "",
  cv_url: "",
  status: "applied",
  stage: "applied",
  experience_years: 0,
};

export function CandidateForm({ mode, candidateId }: { mode: Mode; candidateId?: string }) {
  const [form, setForm] = useState<CandidatePayload>(INITIAL_FORM);
  const [loading, setLoading] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (mode !== "edit" || !candidateId) {
      return;
    }

    const loadCandidate = async () => {
      try {
        setLoading(true);
        setError(null);

        const candidate: CandidateRecord = await getRecordById(candidateId);
        setForm({
          full_name: candidate.full_name,
          email: candidate.email,
          phone: candidate.phone,
          position: candidate.position,
          linkedin_url: candidate.linkedin_url,
          cv_url: candidate.cv_url,
          status: candidate.status,
          stage: candidate.stage,
          experience_years: candidate.experience_years,
        });
      } catch {
        setError("No se pudo cargar la candidatura para editar.");
      } finally {
        setLoading(false);
      }
    };

    void loadCandidate();
  }, [mode, candidateId]);

  const validate = (): string | null => {
    if (!form.full_name.trim()) {
      return "El nombre completo es obligatorio.";
    }
    if (!form.email.trim()) {
      return "El email es obligatorio.";
    }
    if (!form.position.trim()) {
      return "El puesto es obligatorio.";
    }
    if (!form.status) {
      return "El estado es obligatorio.";
    }
    if (!form.stage) {
      return "La etapa es obligatoria.";
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      if (mode === "create") {
        const created = await createRecord(form);
        setSuccess("Candidatura creada con éxito.");
        setForm(INITIAL_FORM);
        router.push(`/candidates/${created.id}`);
      } else if (candidateId) {
        await updateRecord(candidateId, form);
        setSuccess("Candidatura actualizada con éxito.");
      }
    } catch {
      setError("No se pudo guardar la candidatura. Revisa los datos e inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = <K extends keyof CandidatePayload>(
    key: K,
    value: CandidatePayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <LoadingSpinner label="Cargando candidatura..." />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-700">
          Nombre completo *
          <input
            value={form.full_name}
            onChange={(event) => handleChange("full_name", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <label className="text-sm text-slate-700">
          Email *
          <input
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <label className="text-sm text-slate-700">
          Teléfono
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="text-sm text-slate-700">
          Puesto *
          <input
            value={form.position}
            onChange={(event) => handleChange("position", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <label className="text-sm text-slate-700">
          LinkedIn
          <input
            type="url"
            value={form.linkedin_url}
            onChange={(event) => handleChange("linkedin_url", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="text-sm text-slate-700">
          URL del CV
          <input
            type="url"
            value={form.cv_url}
            onChange={(event) => handleChange("cv_url", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="text-sm text-slate-700">
          Años de experiencia
          <input
            type="number"
            min={0}
            value={form.experience_years}
            onChange={(event) => handleChange("experience_years", Number(event.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="text-sm text-slate-700">
          Estado *
          <select
            value={form.status}
            onChange={(event) => handleChange("status", event.target.value as CandidatePayload["status"])}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          >
            <option value="applied">applied</option>
            <option value="in_progress">in_progress</option>
            <option value="hired">hired</option>
            <option value="rejected">rejected</option>
          </select>
        </label>

        <label className="text-sm text-slate-700">
          Etapa *
          <select
            value={form.stage}
            onChange={(event) => handleChange("stage", event.target.value as CandidatePayload["stage"])}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          >
            <option value="applied">applied</option>
            <option value="review">review</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="hired">hired</option>
            <option value="rejected">rejected</option>
          </select>
        </label>
      </div>

      {error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {success && <p className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">{success}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-[#e8640c] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {submitting ? "Guardando..." : mode === "create" ? "Crear candidatura" : "Guardar cambios"}
        </button>

        <Link href="/" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
