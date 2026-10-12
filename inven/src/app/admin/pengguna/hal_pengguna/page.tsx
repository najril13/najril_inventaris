"use client";

import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import {
  ChevronLeft,
  ImagePlus,
  Mail,
  MapPin,
  Save,
  User,
  FileText,
} from "lucide-react";
import { useState, type FormEvent } from "react";

const INPUT_CLASS =
  "h-11 w-full rounded-xl border border-zinc-700 bg-[#0f1010] px-4 text-sm text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-500";

const TEXTAREA_CLASS =
  "w-full resize-none rounded-xl border border-zinc-700 bg-[#0f1010] px-4 py-3 text-sm text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-500";

const LABEL_CLASS =
  "mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500";

const SECTION_TITLE_CLASS =
  "text-lg font-semibold text-zinc-100 flex items-center gap-2";
const SECTION_SUBTITLE_CLASS = "mt-1 text-sm text-zinc-500";

export default function TambahPenggunaPage() {
  const router = useRouter();

  // State Form
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validasi sederhana: Nama dan Email wajib diisi
  const isValid = nama.trim() !== "" && email.trim() !== "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    const payload = {
      nama: nama.trim(),
      email: email.trim(),
      alamat: alamat.trim(),
      deskripsi: deskripsi.trim(),
    };

    console.log("Menyimpan Pengguna Baru:", payload);

    // Simulasi proses loading / API Call
    setTimeout(() => {
      setIsSubmitting(false);
      // Asumsi rute kembali ke daftar pengguna adalah /admin/pengguna
      router.push("/admin/pengguna");
    }, 800);
  };

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-5 py-7 lg:px-8">
      {/* PAGE HEADER */}
      <section className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-400 transition hover:text-cyan-400"
        >
          <ChevronLeft size={16} />
          Kembali ke Kelola Pengguna
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
              Tambah Pengguna Baru
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500">
              Masukkan informasi detail pengguna untuk memberikan akses ke dalam
              sistem.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Button
              type="button"
              onPress={() => router.back()}
              className="h-11 rounded-xl border border-zinc-700 bg-transparent px-5 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800"
            >
              Batal
            </Button>
            <Button
              type="button"
              onPress={() => {
                const form = document.getElementById(
                  "form-tambah-pengguna",
                ) as HTMLFormElement;
                if (form) form.requestSubmit();
              }}
              isDisabled={!isValid || isSubmitting}
              className="flex h-11 items-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-[#08181a] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save size={18} strokeWidth={2.2} />
              Simpan Pengguna
            </Button>
          </div>
        </div>
      </section>

      <form
        id="form-tambah-pengguna"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
      >
        {/* ================= KOLOM KIRI (KONTEN UTAMA) ================= */}
        <div className="space-y-6 lg:col-span-2">
          {/* 1. INFORMASI PRIBADI */}
          <Card className="rounded-2xl border border-zinc-800 bg-[#181919] p-6 lg:p-8 shadow-none">
            <div className="mb-6">
              <h3 className={SECTION_TITLE_CLASS}>
                <User size={20} className="text-cyan-400" />
                Informasi Pribadi
              </h3>
              <p className={SECTION_SUBTITLE_CLASS}>
                Data identitas dan kontak utama pengguna.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="nama-pengguna" className={LABEL_CLASS}>
                    Nama Lengkap *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-500">
                      <User size={16} />
                    </span>
                    <input
                      id="nama-pengguna"
                      type="text"
                      value={nama}
                      onChange={(event) => setNama(event.target.value)}
                      placeholder="Cth: John Doe"
                      className={`${INPUT_CLASS} pl-11`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email-pengguna" className={LABEL_CLASS}>
                    Alamat Email *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-500">
                      <Mail size={16} />
                    </span>
                    <input
                      id="email-pengguna"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Cth: john.doe@email.com"
                      className={`${INPUT_CLASS} pl-11`}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 2. ALAMAT & DESKRIPSI */}
          <Card className="rounded-2xl border border-zinc-800 bg-[#181919] p-6 lg:p-8 shadow-none">
            <div className="mb-6">
              <h3 className={SECTION_TITLE_CLASS}>
                <MapPin size={20} className="text-emerald-400" />
                Alamat & Keterangan
              </h3>
              <p className={SECTION_SUBTITLE_CLASS}>
                Informasi tempat tinggal dan catatan tambahan.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="alamat-pengguna" className={LABEL_CLASS}>
                  Alamat Lengkap
                </label>
                <textarea
                  id="alamat-pengguna"
                  rows={3}
                  value={alamat}
                  onChange={(event) => setAlamat(event.target.value)}
                  placeholder="Masukkan alamat domisili saat ini..."
                  className={TEXTAREA_CLASS}
                />
              </div>

              <div>
                <label htmlFor="deskripsi-pengguna" className={LABEL_CLASS}>
                  <FileText size={13} />
                  Deskripsi / Jabatan
                </label>
                <textarea
                  id="deskripsi-pengguna"
                  rows={4}
                  value={deskripsi}
                  onChange={(event) => setDeskripsi(event.target.value)}
                  placeholder="Ketik catatan tentang peran, divisi, atau deskripsi singkat pengguna di sini..."
                  className={TEXTAREA_CLASS}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* ================= KOLOM KANAN (SIDEBAR: FOTO PROFIL) ================= */}
        <div className="space-y-6 lg:col-span-1">
          {/* FOTO PROFIL */}
          <Card className="rounded-2xl border border-zinc-800 bg-[#181919] p-6 shadow-none">
            <h3 className={SECTION_TITLE_CLASS}>Foto Profil</h3>
            <p className={SECTION_SUBTITLE_CLASS}>
              Unggah foto pengguna agar mudah dikenali.
            </p>

            <div className="mt-5">
              <label
                htmlFor="foto-pengguna"
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-700 bg-[#0f1010] p-10 text-center transition-all hover:border-cyan-500 hover:bg-cyan-500/5 cursor-pointer"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/80 transition-colors group-hover:bg-cyan-500/20 group-hover:text-cyan-400">
                  <ImagePlus
                    size={32}
                    className="text-zinc-400 group-hover:text-cyan-400"
                  />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-zinc-300">
                    Unggah Foto
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    Maks. ukuran file 2MB (JPG/PNG)
                  </span>
                </div>
                <input
                  id="foto-pengguna"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </Card>
        </div>

        {/* ================= ACTIONS BAWAH (MOBILE) ================= */}
        <div className="flex items-center gap-3 pb-8 lg:hidden lg:col-span-3">
          <Button
            type="button"
            onPress={() => router.back()}
            className="h-12 flex-1 rounded-xl border border-zinc-700 bg-transparent px-5 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800"
          >
            Kembali
          </Button>
          <Button
            type="submit"
            isDisabled={!isValid || isSubmitting}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-[#08181a] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Save size={18} strokeWidth={2.2} />
            {isSubmitting ? "Menyimpan..." : "Simpan Pengguna"}
          </Button>
        </div>
      </form>
    </main>
  );
}
