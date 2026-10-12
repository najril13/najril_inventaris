"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  RotateCcw,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

// Tipe data transaksi
type StatusTransaksi = "Dipinjam" | "Terlambat" | "Dikembalikan";

type Transaksi = {
  id: string;
  barang: string;
  gambarInisial: string; // inisial barang untuk avatar kecil
  tglPinjam: string;
  tenggatWaktu: string;
  status: StatusTransaksi;
};

// Dummy data — hanya transaksi milik user yang sedang login
const TRANSAKSI_SAYA: Transaksi[] = [
  {
    id: "TRX-0892",
    barang: 'MacBook Pro M2 14"',
    gambarInisial: "MB",
    tglPinjam: "12 Okt 2023",
    tenggatWaktu: "19 Okt 2023",
    status: "Dipinjam",
  },
  {
    id: "TRX-0870",
    barang: "Proyektor Epson EB-X51",
    gambarInisial: "PJ",
    tglPinjam: "01 Okt 2023",
    tenggatWaktu: "04 Okt 2023",
    status: "Terlambat",
  },
  {
    id: "TRX-0855",
    barang: "Kamera DSLR Canon 90D",
    gambarInisial: "KM",
    tglPinjam: "20 Sep 2023",
    tenggatWaktu: "22 Sep 2023",
    status: "Dikembalikan",
  },
  {
    id: "TRX-0840",
    barang: "Tripod Weifeng WT-3730",
    gambarInisial: "TR",
    tglPinjam: "10 Sep 2023",
    tenggatWaktu: "12 Sep 2023",
    status: "Dikembalikan",
  },
];

export default function TransaksiSayaPage() {
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua Status");
  const [selectedDate, setSelectedDate] = useState("");

  // Ringkasan status milik user
  const ringkasan = useMemo(() => {
    return {
      dipinjam: TRANSAKSI_SAYA.filter((t) => t.status === "Dipinjam").length,
      terlambat: TRANSAKSI_SAYA.filter((t) => t.status === "Terlambat").length,
      selesai: TRANSAKSI_SAYA.filter((t) => t.status === "Dikembalikan").length,
    };
  }, []);

  // Filtering data transaksi
  const filteredData = useMemo(() => {
    return TRANSAKSI_SAYA.filter((item) => {
      const matchQuery =
        item.barang.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase());

      const matchStatus =
        selectedStatus === "Semua Status" || item.status === selectedStatus;

      return matchQuery && matchStatus;
    });
  }, [query, selectedStatus]);

  return (
    <main className="space-y-6 px-5 py-7 lg:px-8">
      {/* PAGE HEADER & TOP BAR */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Transaksi Saya
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Pantau barang yang sedang kamu pinjam dan riwayat peminjamanmu.
          </p>
        </div>
      </section>

      {/* STATS CARDS — ringkasan milik user */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* CARD 1: SEDANG DIPINJAM */}
        <Card className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-5 shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Sedang Kamu Pinjam
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  {ringkasan.dipinjam}
                </span>
                <span className="text-xs text-zinc-400">Barang</span>
              </div>
            </div>
            <Clock size={40} className="text-zinc-700/50" />
          </div>
        </Card>

        {/* CARD 2: TERLAMBAT */}
        <Card className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-5 shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Perlu Dikembalikan
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  {ringkasan.terlambat}
                </span>
                <span className="text-xs text-zinc-400">Melewati Batas</span>
              </div>
            </div>
            <AlertTriangle size={40} className="text-zinc-700/50" />
          </div>
          {ringkasan.terlambat > 0 && (
            <p className="mt-3 text-xs text-red-400">
              Segera kembalikan barang untuk menghindari denda.
            </p>
          )}
        </Card>

        {/* CARD 3: SELESAI */}
        <Card className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-5 shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Riwayat Selesai
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  {ringkasan.selesai}
                </span>
                <span className="text-xs text-zinc-400">Dikembalikan</span>
              </div>
            </div>
            <CheckCircle2 size={40} className="text-zinc-700/50" />
          </div>
        </Card>
      </section>

      {/* FILTER & TABLE SECTION */}
      <Card className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-0 shadow-none">
        {/* CONTROL BAR (Search, Status, Date) */}
        <div className="flex flex-col gap-3 border-b border-zinc-800/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* SEARCH INPUT */}
            <div className="flex h-10 min-w-50 items-center gap-2 rounded-xl border border-zinc-700/60 bg-[#101111] px-3.5 focus-within:border-cyan-500">
              <Search size={16} className="text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari barang atau ID..."
                className="w-full bg-transparent text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            {/* STATUS FILTER */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-xl border border-zinc-700/60 bg-[#101111] px-3 text-xs text-zinc-300 focus:border-cyan-500 focus:outline-none"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Dipinjam">Dipinjam</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Dikembalikan">Dikembalikan</option>
            </select>

            {/* DATE PICKER INPUT */}
            <div className="flex h-10 items-center gap-2 rounded-xl border border-zinc-700/60 bg-[#101111] px-3.5 text-xs text-zinc-400">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-zinc-300 focus:outline-none scheme-dark"
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800/80 text-zinc-500">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider">
                  Barang
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider">
                  Tgl Pinjam
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider">
                  Tenggat Waktu
                </th>
                <th className="px-4 py-4 text-center font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider">
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
                  {/* ID */}
                  <td className="px-6 py-4 font-mono font-medium text-zinc-400">
                    {item.id}
                  </td>

                  {/* BARANG */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
                        {item.gambarInisial}
                      </div>
                      <span className="font-medium text-zinc-200">
                        {item.barang}
                      </span>
                    </div>
                  </td>

                  {/* TGL PINJAM */}
                  <td className="px-4 py-4 text-zinc-400">{item.tglPinjam}</td>

                  {/* TENGGAT WAKTU */}
                  <td
                    className={`px-4 py-4 font-medium ${
                      item.status === "Terlambat"
                        ? "text-red-400"
                        : "text-zinc-400"
                    }`}
                  >
                    {item.tenggatWaktu}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                        item.status === "Dipinjam"
                          ? "bg-cyan-950/60 text-cyan-400 border border-cyan-800/50"
                          : item.status === "Terlambat"
                            ? "bg-red-950/60 text-red-400 border border-red-800/50"
                            : "bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* AKSI — hanya aksi yang relevan untuk peminjam */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Lihat Detail — selalu tersedia */}
                      <button
                        type="button"
                        title="Lihat Detail"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-cyan-400"
                      >
                        <Eye size={16} />
                      </button>

                      {/* Ajukan Perpanjangan — hanya untuk barang yang masih/sudah dipinjam */}
                      {(item.status === "Dipinjam" ||
                        item.status === "Terlambat") && (
                        <button
                          type="button"
                          title="Ajukan Perpanjangan"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
                        >
                          <RotateCcw size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    Kamu belum punya transaksi yang cocok dengan pencarian ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-zinc-800/80 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            Menampilkan 1-{filteredData.length} dari {TRANSAKSI_SAYA.length}{" "}
            transaksi
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400 text-xs font-bold text-[#08181a]"
            >
              1
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>
    </main>
  );
}
