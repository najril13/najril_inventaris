"use client";

import React from "react";
import { Card, SearchField } from "@heroui/react";
import {
  Archive,
  ArrowRight,
  Box,
  CheckCircle2,
  Clock3,
  Package,
  Users,
} from "lucide-react";

type InventoryItem = {
  id: string;
  nama: string;
  jenis: string;
  status: "TERSEDIA" | "DIPINJAM";
  tanggal: string;
};

const INVENTORY_DATA: InventoryItem[] = [
  {
    id: "1",
    nama: "Mikroskop Digital",
    jenis: "Laboratorium",
    status: "TERSEDIA",
    tanggal: "03 Agu 2026",
  },
  {
    id: "2",
    nama: "Proyektor Epson EB-X06",
    jenis: "Elektronik",
    status: "DIPINJAM",
    tanggal: "02 Agu 2026",
  },
  {
    id: "3",
    nama: "Laptop ASUS Vivobook",
    jenis: "Komputer",
    status: "TERSEDIA",
    tanggal: "01 Agu 2026",
  },
  {
    id: "4",
    nama: "Kamera Canon EOS 1500D",
    jenis: "Multimedia",
    status: "TERSEDIA",
    tanggal: "30 Jul 2026",
  },
];

const STAT_DATA = [
  {
    title: "Total Barang",
    value: "1,284",
    information: "+12%",
    icon: Package,
    active: false,
  },
  {
    title: "Total Kategori",
    value: "42",
    information: "Stabil",
    icon: Archive,
    active: false,
  },
  {
    title: "Total User",
    value: "156",
    information: "+8%",
    icon: Users,
    active: false,
  },
  {
    title: "Aktif Peminjaman",
    value: "18",
    information: "",
    icon: Box,
    active: true,
  },
];

export default function UserPage() {
  return (
    <div className="min-h-screen bg-[#101111] text-zinc-100">
      <header className="flex min-h-17 items-center justify-between gap-5 border-b border-zinc-800 px-5 lg:px-8">
        <h1 className="whitespace-nowrap text-xl font-bold tracking-tight text-zinc-100 lg:text-2xl">
          Dashboard Overview
        </h1>
      </header>

      {/* ================= KONTEN UTAMA ================= */}
      <main className="space-y-8 px-5 py-7 lg:px-8">
        {/* SEARCHFIELD HEROUI (MOBILE) */}
        <div className="lg:hidden">
          <SearchField name="search-mobile" className="w-full">
            <SearchField.Group className="flex h-11 items-center gap-3 rounded-xl border border-zinc-700 bg-[#181919] px-4 focus-within:border-cyan-500">
              <SearchField.SearchIcon className="text-zinc-400" />
              <SearchField.Input
                placeholder="Cari data atau barang..."
                className="h-full w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500 [&::-webkit-search-cancel-button]:appearance-none"
              />
              <SearchField.ClearButton className="text-zinc-400 hover:text-white" />
            </SearchField.Group>
          </SearchField>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STAT_DATA.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className={`relative min-h-48 rounded-2xl border bg-[#181919] p-6 shadow-none transition duration-200 hover:-translate-y-0.5 ${
                  item.active
                    ? "border-cyan-400 shadow-[inset_3px_0_0_0_#22d3ee]"
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                      item.active
                        ? "bg-cyan-500/15 text-cyan-400"
                        : item.title === "Total Barang"
                          ? "bg-cyan-500/15 text-cyan-400"
                          : "bg-zinc-700/70 text-zinc-200"
                    }`}
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  {item.information && (
                    <span
                      className={`text-sm ${
                        item.information.startsWith("+")
                          ? "rounded-full bg-cyan-500/10 px-3 py-1 font-semibold text-cyan-400"
                          : "italic text-zinc-500"
                      }`}
                    >
                      {item.information}
                    </span>
                  )}

                  {item.active && (
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold tracking-wide text-zinc-400">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-100">
                    {item.value}
                  </h2>
                </div>
              </Card>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-[#181919] p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">Barang Tersedia</p>
              <p className="mt-1 text-xl font-bold text-zinc-100">1,145</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-[#181919] p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Clock3 size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">Belum Dikembalikan</p>
              <p className="mt-1 text-xl font-bold text-zinc-100">18</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-[#181919] p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <Archive size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">Barang Rusak</p>
              <p className="mt-1 text-xl font-bold text-zinc-100">20</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6">
          <Card className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#181919] shadow-none">
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  Inventaris Terbaru
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Data barang yang baru diperbarui
                </p>
              </div>

              <button
                type="button"
                className="flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Lihat Semua
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-160 border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="w-[42%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Nama Barang
                    </th>
                    <th className="w-[20%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Jenis
                    </th>
                    <th className="w-[18%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Status
                    </th>
                    <th className="w-[20%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Tanggal
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {INVENTORY_DATA.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-zinc-800/70 transition-colors last:border-b-0 hover:bg-white/2"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80">
                            <Package size={20} className="text-cyan-400" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium text-zinc-200">
                              {item.nama}
                            </p>

                            <p className="mt-0.5 text-xs text-zinc-600">
                              ID: BRG-{item.id.padStart(3, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 align-middle text-zinc-400">
                        {item.jenis}
                      </td>

                      <td className="px-4 py-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
                            item.status === "TERSEDIA"
                              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                              : "border-red-500/30 bg-red-500/10 text-red-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 align-middle text-zinc-400">
                        {item.tanggal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
