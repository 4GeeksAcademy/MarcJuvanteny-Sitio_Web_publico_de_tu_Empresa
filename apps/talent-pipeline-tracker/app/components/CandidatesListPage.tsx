"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getRecords } from "../../lib/api";
import { CandidateRecord } from "../../lib/types";
import { LoadingSpinner } from "./LoadingSpinner";

const STATUS_OPTIONS = ["", "applied", "in_progress", "hired", "rejected"];
const STAGE_OPTIONS = [
  "",
  "applied",
  "review",
  "interview",
  "offer",
  "hired",
  "rejected",
];

export function CandidatesListPage() {
  const [records, setRecords] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedStatus = searchParams.get("status") ?? "";
  const selectedStage = searchParams.get("stage") ?? "";

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecords();
        setRecords(data);
      } catch {
        setError("No pudimos cargar las candidaturas. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    void loadRecords();
  }, []);

  const updateQueryParam = (key: "status" | "stage", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const filteredRecords = useMemo(() => {
    const q = searchText.trim().toLowerCase();

    return records.filter((record) => {
      const matchesStatus = selectedStatus ? record.status === selectedStatus : true;
      const matchesStage = selectedStage ? record.stage === selectedStage : true;
      const matchesSearch =
        !q ||
        record.full_name.toLowerCase().includes(q) ||
        record.email.toLowerCase().includes(q);

      return matchesStatus && matchesStage && matchesSearch;
    });
  }, [records, selectedStatus, selectedStage, searchText]);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#003049]">Talent Pipeline Tracker</h1>
            <p className="text-sm text-slate-600">
              Gestiona candidaturas con filtros y seguimiento por etapa.
            </p>
          </div>
          <Link
            href="/candidates/new"
            className="inline-flex items-center justify-center rounded-lg bg-[#e8640c] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#cf5a0b]"
          >
            Nueva candidatura
          </Link>
        </div>
      </header>

      <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Buscar por nombre o email"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-[#e8640c] focus:ring"
          aria-label="Buscar por nombre o email"
        />

        <select
          value={selectedStatus}
          onChange={(event) => updateQueryParam("status", event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-[#e8640c] focus:ring"
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          {STATUS_OPTIONS.filter(Boolean).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={selectedStage}
          onChange={(event) => updateQueryParam("stage", event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-[#e8640c] focus:ring"
          aria-label="Filtrar por etapa"
        >
          <option value="">Todas las etapas</option>
          {STAGE_OPTIONS.filter(Boolean).map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        {loading && <LoadingSpinner label="Cargando candidaturas..." />}

        {!loading && error && (
          <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {!loading && !error && filteredRecords.length === 0 && (
          <p className="text-sm text-slate-600">No hay candidaturas que coincidan con los filtros.</p>
        )}

        {!loading && !error && filteredRecords.length > 0 && (
          <ul className="grid gap-3">
            {filteredRecords.map((record) => (
              <li
                key={record.id}
                className="rounded-lg border border-slate-200 p-4 transition hover:border-[#e8640c]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-[#003049]">{record.full_name}</h2>
                    <p className="text-sm text-slate-600">{record.position}</p>
                    <p className="mt-1 text-xs text-slate-500">{record.email}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-slate-100 px-2 py-1">Estado: {record.status}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1">Etapa: {record.stage}</span>
                    <Link
                      href={`/candidates/${record.id}`}
                      className="rounded-md bg-[#003049] px-3 py-1.5 font-medium text-white"
                    >
                      Ver detalle
                    </Link>
                    <Link
                      href={`/candidates/${record.id}/edit`}
                      className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
