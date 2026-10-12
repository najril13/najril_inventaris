"use client";

import Link from "next/link"; // Tambahkan import Link
import { Card } from "@heroui/react";
import {
  AlertTriangle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

// Tipe data transaksi
type StatusTransaksi = "Dipinjam" | "Terlambat" | "Dikembalikan";

type Transaksi = {
  id: string;
  peminjam: {
    nama: string;
    inisial: string;
  };
  barang: string;
  tglPinjam: string;
  tenggatWaktu: string;
  status: StatusTransaksi;
};

// Dummy Data berdasarkan gambar
const TRANSAKSI_DATA: Transaksi[] = [
  {
    id: "TRX-0892",
    peminjam: { nama: "Ahmad Jaelani", inisial: "AJ" },
    barang: 'MacBook Pro M2 14"',
    tglPinjam: "12 Okt 2023",
    tenggatWaktu: "19 Okt 2023",
    status: "Dipinjam",
  },
  {
    id: "TRX-0885",
    peminjam: { nama: "Budi Waseso", inisial: "BW" },
    barang: "Proyektor Epson EB-X51",
    tglPinjam: "05 Okt 2023",
    tenggatWaktu: "08 Okt 2023",
    status: "Terlambat",
  },
  {
    id: "TRX-0881",
    peminjam: { nama: "Citra Sari", inisial: "CS" },
    barang: "Kamera DSLR Canon 90D",
    tglPinjam: "01 Okt 2023",
    tenggatWaktu: "03 Okt 2023",
    status: "Dikembalikan",
  },
  {
    id: "TRX-0895",
    peminjam: { nama: "Dian Pratama", inisial: "DP" },
    barang: "Tablet iPad Air Gen 5",
    tglPinjam: "14 Okt 2023",
    tenggatWaktu: "21 Okt 2023",
    status: "Dipinjam",
  },
];

export default function TransaksiPage() {
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua Status");
  const [selectedDate, setSelectedDate] = useState("");

  // Filtering data transaksi
  const filteredData = useMemo(() => {
    return TRANSAKSI_DATA.filter((item) => {
      const matchQuery =
        item.peminjam.nama.toLowerCase().includes(query.toLowerCase()) ||
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
            Daftar Transaksi Peminjaman
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Kelola dan pantau seluruh aktivitas peminjaman barang.
          </p>
        </div>

        {/* =============== TOMBOL CATAT PEMINJAMAN BARU (LINK) =============== */}
        {/* Sesuaikan href dengan path folder form Anda */}
        <Link
          href="/admin/transaksi/hal_catatbarang"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-bold tracking-wide text-[#08181a] transition hover:bg-cyan-300"
        >
          <Plus size={18} strokeWidth={2.5} />
          CATAT PEMINJAMAN BARU
        </Link>
      </section>

      {/* STATS CARDS */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* CARD 1: SEDANG DIPINJAM */}
        <Card className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-5 shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Sedang Dipinjam
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">42</span>
                <span className="text-xs text-zinc-400">Transaksi Aktif</span>
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
                Terlambat
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">7</span>
                <span className="text-xs text-zinc-400">Melewati Batas</span>
              </div>
            </div>
            <AlertTriangle size={40} className="text-zinc-700/50" />
          </div>
        </Card>

        {/* CARD 3: SELESAI */}
        <Card className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-5 shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Selesai (Bulan Ini)
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">128</span>
                <span className="text-xs text-zinc-400">Dikembalikan</span>
              </div>
            </div>
            <CheckCircle2 size={40} className="text-zinc-700/50" />
          </div>
        </Card>
      </section>

      {/* FILTER & TABLE SECTION */}
      <Card className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#181919] p-0 shadow-none">
        {/* CONTROL BAR (Search, Status, Date, Export) */}
        <div className="flex flex-col gap-3 border-b border-zinc-800/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* SEARCH INPUT */}
            <div className="flex h-10 min-w-50 items-center gap-2 rounded-xl border border-zinc-700/60 bg-[#101111] px-3.5 focus-within:border-cyan-500">
              <Search size={16} className="text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari transaksi..."
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

          {/* EXPORT BUTTON */}
          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800/80 text-zinc-500">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider">
                  Peminjam
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

                  {/* PEMINJAM */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
                        {item.peminjam.inisial}
                      </div>
                      <span className="font-medium text-zinc-200">
                        {item.peminjam.nama}
                      </span>
                    </div>
                  </td>

                  {/* BARANG */}
                  <td className="px-4 py-4 font-medium text-zinc-300">
                    {item.barang}
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

                  {/* AKSI */}
                  <td className="px-6 py-4">
                    {/* Bungkus dengan div flex, items-center, justify-center, dan gap untuk jarak antar tombol */}
                    <div className="flex items-center justify-center gap-2">
                      {/* Tombol Edit (Cyan) */}
                      <button
                        type="button"
                        title="Edit Transaksi"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-cyan-400"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* Tombol Hapus (Merah) */}
                      <button
                        type="button"
                        title="Hapus Transaksi"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
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
                    colSpan={7}
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-zinc-800/80 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            Menampilkan 1-4 dari 177 transaksi
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
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              2
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              3
            </button>
            <span className="px-1 text-xs text-zinc-600">...</span>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              18
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
