"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@heroui/react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useState, Suspense } from "react";

function FormTransaksiContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Membaca ID dari URL jika sedang dalam mode edit (misal: ?id=TRX-001)
  const editId = searchParams.get("id");
  const isEditMode = !!editId;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    peminjamId: "",
    barangId: "",
    jumlah: "",
    tanggalPinjam: "",
    tenggatWaktu: "",
    catatan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulasi proses simpan
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!isEditMode) {
        console.log("Berhasil mencatat peminjaman baru:", formData);
        alert("Berhasil! Data peminjaman berhasil dicatat.");
      } else {
        console.log("Berhasil mengedit transaksi ID:", editId, formData);
        alert("Berhasil! Perubahan data transaksi disimpan.");
      }

      router.push("/admin/transaksi"); // Ganti dengan rute tabel transaksi Anda
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    // Wrapper untuk ke tengah dan ukuran yang lebih lebar
    <div className="mx-auto max-w-4xl space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-[#181919] text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
            {isEditMode ? "Edit Transaksi" : "Catat Peminjaman Baru"}
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500">
            {isEditMode
              ? `Memperbarui data transaksi untuk ID: ${editId}`
              : "Masukkan detail pengeluaran atau peminjaman barang oleh pengguna."}
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <Card className="w-full rounded-2xl border border-zinc-800 bg-[#181919] p-6 shadow-none md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h3 className="border-b border-zinc-800 pb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Detail Peminjaman
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* PEMINJAM (Menggunakan elemen <select>) */}
              <div className="col-span-2 md:col-span-1">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Nama Peminjam <span className="text-red-500">*</span>
                </label>
                <select
                  name="peminjamId"
                  value={formData.peminjamId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors focus:border-cyan-500 focus:outline-none"
                >
                  <option value="" disabled>
                    -- Pilih Pengguna --
                  </option>
                  <option value="USR-001">Sarah Jenkins</option>
                  <option value="USR-002">Marcus Rossi</option>
                  <option value="USR-003">David Chen</option>
                </select>
              </div>

              {/* BARANG (Menggunakan elemen <select>) */}
              <div className="col-span-2 md:col-span-1">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Barang yang Dipinjam <span className="text-red-500">*</span>
                </label>
                <select
                  name="barangId"
                  value={formData.barangId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors focus:border-cyan-500 focus:outline-none"
                >
                  <option value="" disabled>
                    -- Pilih Barang --
                  </option>
                  <option value="BRG-001">MacBook Pro 16 (Sisa: 15)</option>
                  <option value="BRG-002">Ergonomic Chair Pro (Sisa: 3)</option>
                </select>
              </div>

              {/* TANGGAL PINJAM */}
              <div className="col-span-2 md:col-span-1">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Tanggal Pinjam <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalPinjam"
                  value={formData.tanggalPinjam}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* TENGGAT WAKTU (RENCANA KEMBALI) */}
              <div className="col-span-2 md:col-span-1">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Batas Waktu Pengembalian{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tenggatWaktu"
                  value={formData.tenggatWaktu}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* JUMLAH */}
              <div className="col-span-2 md:col-span-1">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Jumlah Pinjam <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="jumlah"
                  value={formData.jumlah}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Misal: 1"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* CATATAN */}
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Keterangan / Tujuan (Opsional)
                </label>
                <textarea
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Misal: Dipinjam untuk kebutuhan rapat direksi di lantai 4..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-4 border-t border-zinc-800 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="rounded-xl bg-zinc-800 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-700 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-[#08181a] transition hover:bg-cyan-400 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Save size={18} strokeWidth={2.2} />
                  {isEditMode ? "Simpan Perubahan" : "Catat Peminjaman"}
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function HalTransaksiPage() {
  return (
    <main className="w-full px-5 py-7 lg:px-8">
      <Suspense
        fallback={
          <div className="mt-10 text-center text-zinc-400">
            Memuat formulir...
          </div>
        }
      >
        <FormTransaksiContent />
      </Suspense>
    </main>
  );
}
