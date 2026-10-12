"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical,
  // Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

type RolePengguna = "Admin" | "Petugas" | "User";
type StatusPengguna = "Active" | "Inactive";

type Pengguna = {
  id: string;
  nama: string;
  email: string;
  role: RolePengguna;
  tanggalBergabung: string;
  status: StatusPengguna;
  inisial: string;
};

// Data mock berdasarkan desain screen.png
const PENGGUNA_DATA: Pengguna[] = [
  {
    id: "user-01",
    nama: "Sarah Jenkins",
    email: "sarah.j@company.com",
    role: "Admin",
    tanggalBergabung: "12 Oct 2023",
    status: "Active",
    inisial: "SJ",
  },
  {
    id: "user-02",
    nama: "Marcus Rossi",
    email: "m.rossi@company.com",
    role: "Petugas",
    tanggalBergabung: "05 Nov 2023",
    status: "Active",
    inisial: "MR",
  },
  {
    id: "user-03",
    nama: "David Chen",
    email: "d.chen@company.com",
    role: "User",
    tanggalBergabung: "22 Aug 2023",
    status: "Inactive",
    inisial: "DC",
  },
];

export default function KelolaPenggunaPage() {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    return PENGGUNA_DATA.filter(
      (item) =>
        item.nama.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <main className="space-y-6 px-5 py-7 lg:px-8">
      {/* HEADER SECTION */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Manajemen Pengguna
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Kelola akses, peran, dan status akun pengguna dalam sistem.
          </p>
        </div>

        {/* =============== TOMBOL TAMBAH PENGGUNA (LINK) ===============
        <Link href="/admin/pengguna/hal_pengguna">
          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-bold tracking-wide text-[#08181a] transition hover:bg-cyan-300"
          >
            <Plus size={18} strokeWidth={2.5} />
            Tambah Pengguna
          </button>
        </Link> */}
      </section>

      {/* TABLE CONTAINER */}
      <Card className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-0 shadow-none">
        {/* TOP CONTROL BAR (Search & Filters) */}
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          {/* SEARCH INPUT */}
          <div className="flex h-11 w-full max-w-md items-center gap-3 rounded-xl border border-zinc-700/60 bg-[#101111] px-4 focus-within:border-cyan-500">
            <Search size={18} className="text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berdasarkan nama atau email..."
              className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
            />
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700/60 bg-transparent px-4 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              <Filter size={16} />
              Filter Role
              <ChevronRight
                size={14}
                className="ml-1 rotate-90 text-zinc-500"
              />
            </button>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700/60 bg-transparent text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto border-t border-zinc-800/80">
          <table className="w-full min-w-200 border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-[#181919]">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Nama Pengguna
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Tanggal Bergabung
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800/60">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-white/2"
                >
                  {/* USER INFO */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar Placeholder */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-300">
                        {item.inisial}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-200">
                          {item.nama}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {item.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300">
                      {item.role}
                    </span>
                  </td>

                  {/* TANGGAL BERGABUNG */}
                  <td className="px-6 py-4 text-zinc-400">
                    {item.tanggalBergabung}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                        item.status === "Active"
                          ? "border-green-900/50 bg-green-950/30 text-green-400"
                          : "border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status === "Active"
                            ? "bg-green-400 shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                            : "bg-zinc-500"
                        }`}
                      ></span>
                      {item.status}
                    </span>
                  </td>

                  {/* AKSI (Diperbarui dengan Pencil dan Trash2) */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {/* Tombol Edit menggunakan Link (bisa disesuaikan route-nya) */}
                      <Link
                        href={`/admin/pengguna/${item.id}`}
                        aria-label={`Edit ${item.nama}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-cyan-400"
                      >
                        <Pencil size={16} />
                      </Link>

                      {/* Tombol Hapus */}
                      <button
                        type="button"
                        aria-label={`Hapus ${item.nama}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    Tidak ada pengguna yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-zinc-800/80 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">
            Showing 1 to {filteredData.length} of 3 results
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-[#08181a]"
            >
              1
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              2
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              3
            </button>
            <span className="px-1 text-sm text-zinc-600">...</span>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>
    </main>
  );
}
