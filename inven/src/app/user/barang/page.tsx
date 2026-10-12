"use client";

import { Button, Card, Select, ListBox } from "@heroui/react";
import {
  Boxes,
  Package,
  PackageCheck,
  PackageX,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "@/src/lib/toast";

// ================== TYPES ==================
interface InventoryItem {
  id: string;
  kode: string;
  nama: string;
  kategori: string;
  stok: number;
  satuan: string;
  lokasi: string;
  gambar?: string;
}

// ================== DUMMY DATA ==================
const DUMMY_BARANG: InventoryItem[] = [
  {
    id: "1",
    kode: "ELK-001",
    nama: "Proyektor Epson EB-X05",
    kategori: "Electronics",
    stok: 1,
    satuan: "unit",
    lokasi: "Gudang A - Rak 1",
  },
  {
    id: "2",
    kode: "ELK-002",
    nama: "Laptop Dell Latitude 5420",
    kategori: "Electronics",
    stok: 1,
    satuan: "unit",
    lokasi: "Gudang A - Rak 2",
  },
  {
    id: "3",
    kode: "ELK-003",
    nama: "Kamera Canon EOS M50",
    kategori: "Electronics",
    stok: 0,
    satuan: "unit",
    lokasi: "Gudang A - Rak 3",
  },
  {
    id: "4",
    kode: "FUR-001",
    nama: "Kursi Lipat Lapangan",
    kategori: "Furniture",
    stok: 1,
    satuan: "buah",
    lokasi: "Gudang B - Rak 1",
  },
  {
    id: "5",
    kode: "FUR-002",
    nama: "Meja Lipat Portable",
    kategori: "Furniture",
    stok: 1,
    satuan: "buah",
    lokasi: "Gudang B - Rak 2",
  },
  {
    id: "6",
    kode: "OFS-001",
    nama: "Whiteboard Magnetik 120x90",
    kategori: "Office Supplies",
    stok: 1,
    satuan: "buah",
    lokasi: "Gudang C - Rak 1",
  },
  {
    id: "7",
    kode: "OFS-002",
    nama: "Flipchart Stand",
    kategori: "Office Supplies",
    stok: 0,
    satuan: "buah",
    lokasi: "Gudang C - Rak 1",
  },
  {
    id: "8",
    kode: "NET-001",
    nama: "Router Mikrotik hAP ac2",
    kategori: "Networking",
    stok: 1,
    satuan: "unit",
    lokasi: "Gudang A - Rak 5",
  },
  {
    id: "9",
    kode: "NET-002",
    nama: "Switch TP-Link 24 Port",
    kategori: "Networking",
    stok: 1,
    satuan: "unit",
    lokasi: "Gudang A - Rak 5",
  },
  {
    id: "10",
    kode: "ELK-004",
    nama: "Speaker Portable JBL PartyBox",
    kategori: "Electronics",
    stok: 1,
    satuan: "unit",
    lokasi: "Gudang A - Rak 4",
  },
];

const KATEGORI_LIST = [
  "Semua",
  "Electronics",
  "Furniture",
  "Office Supplies",
  "Networking",
];

// ================== HELPERS ==================
function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const minDate = todayPlus(1);

// ================== PAGE ==================
export default function PeminjamanBarangPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<InventoryItem[]>(DUMMY_BARANG);

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [jumlah, setJumlah] = useState(1);
  const [tanggalKembali, setTanggalKembali] = useState(minDate);
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalItems = data.length;
  const totalKategori = new Set(data.map((item) => item.kategori)).size;
  const tersediaCount = data.filter((item) => item.stok > 0).length;
  const habisCount = data.filter((item) => item.stok === 0).length;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchKategori =
        kategoriAktif === "Semua" || item.kategori === kategoriAktif;
      const matchQuery = item.nama.toLowerCase().includes(query.toLowerCase());
      return matchKategori && matchQuery;
    });
  }, [data, kategoriAktif, query]);

  const statCards = [
    {
      label: "Total Barang",
      value: totalItems.toLocaleString("id-ID"),
      icon: Package,
      tone: "cyan" as const,
    },
    {
      label: "Total Kategori",
      value: totalKategori.toLocaleString("id-ID"),
      icon: Boxes,
      tone: "neutral" as const,
    },
    {
      label: "Tersedia Dipinjam",
      value: tersediaCount.toLocaleString("id-ID"),
      icon: PackageCheck,
      tone: "emerald" as const,
    },
    {
      label: "Stok Habis",
      value: habisCount.toLocaleString("id-ID"),
      icon: PackageX,
      tone: "red" as const,
    },
  ];

  const TONE_STYLE: Record<string, string> = {
    cyan: "bg-cyan-500/15 text-cyan-400",
    neutral: "bg-zinc-700/50 text-zinc-300",
    emerald: "bg-emerald-500/15 text-emerald-400",
    red: "bg-red-500/15 text-red-400",
  };

  const openPinjamDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    setJumlah(1);
    setTanggalKembali(minDate);
    setCatatan("");
  };

  const closePinjamDialog = () => {
    if (isSubmitting) return;
    setSelectedItem(null);
  };

  const submitPeminjaman = async () => {
    if (!selectedItem) return;

    if (jumlah < 1 || jumlah > selectedItem.stok) {
      toast.error(
        "Jumlah tidak valid",
        `Masukkan jumlah antara 1 dan ${selectedItem.stok}`,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulasi request ke server (data dummy, belum terhubung ke API)
      await new Promise((resolve) => setTimeout(resolve, 700));

      setData((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, stok: item.stok - jumlah }
            : item,
        ),
      );

      toast.success(
        "Peminjaman diajukan",
        `${jumlah} ${selectedItem.satuan} ${selectedItem.nama} menunggu persetujuan admin`,
      );
      setSelectedItem(null);
    } catch {
      toast.error("Terjadi kesalahan", "Tidak dapat memproses peminjaman");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="space-y-8 px-5 py-7 lg:px-8">
      {/* PAGE HEADER */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
          Peminjaman Barang
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500">
          Pilih barang yang tersedia dan ajukan peminjaman untuk kebutuhan
          kegiatanmu.
        </p>
      </section>

      {/* STATISTIK */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="rounded-2xl border border-zinc-800 bg-[#181919] p-5 shadow-none transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONE_STYLE[stat.tone]}`}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      {/* FILTER TOOLBAR */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1.5 sm:w-72">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Cari Barang
          </span>
          <div className="flex h-10 items-center gap-3 rounded-xl border border-zinc-700 bg-[#181919] px-4 transition-colors focus-within:border-cyan-500">
            <Search size={16} className="shrink-0 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari barang..."
              className="h-full w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:w-56">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Filter Kategori
          </span>

          <Select
            className="w-full sm:w-56"
            selectedKey={kategoriAktif}
            onSelectionChange={(key) => setKategoriAktif(key as string)}
          >
            <Select.Trigger className="h-10 rounded-xl border border-zinc-700 bg-[#181919] px-4 text-sm text-zinc-200 outline-none transition-colors focus:border-cyan-500">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="rounded-xl border border-zinc-800 bg-[#181919] shadow-2xl">
              <ListBox className="p-1.5 outline-none">
                {KATEGORI_LIST.map((kategori) => (
                  <ListBox.Item
                    key={kategori}
                    id={kategori}
                    textValue={kategori === "Semua" ? "Semua barang" : kategori}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none cursor-pointer hover:bg-zinc-800 hover:text-white transition"
                  >
                    {kategori === "Semua" ? "Semua barang" : kategori}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </section>

      {/* GRID BARANG */}
      {filteredData.length === 0 ? (
        <Card className="rounded-2xl border border-zinc-800 bg-[#181919] p-10 text-center shadow-none">
          <p className="text-sm text-zinc-500">
            Tidak ada barang yang cocok dengan pencarianmu.
          </p>
        </Card>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredData.map((item) => {
            const habis = item.stok === 0;
            return (
              <Card
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#181919] p-5 shadow-none transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        {item.kode}
                      </p>
                      <h3 className="mt-1 truncate text-base font-semibold text-zinc-100">
                        {item.nama}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
                      {item.kategori}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1.5 text-sm text-zinc-400">
                    <p>
                      Stok:{" "}
                      <span
                        className={
                          habis
                            ? "font-semibold text-red-400"
                            : "font-semibold text-zinc-200"
                        }
                      >
                        {item.stok} {item.satuan}
                      </span>
                    </p>
                    <p>Lokasi: {item.lokasi}</p>
                  </div>
                </div>

                <Button
                  isDisabled={habis}
                  onPress={() => openPinjamDialog(item)}
                  className={`mt-5 flex h-10 w-full items-center justify-center rounded-xl text-sm font-semibold transition ${
                    habis
                      ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
                      : "bg-cyan-500 text-[#08181a] hover:bg-cyan-400"
                  }`}
                >
                  {habis ? "Stok Habis" : "Pinjam Barang"}
                </Button>
              </Card>
            );
          })}
        </section>
      )}

      {/* DIALOG PEMINJAMAN */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <Card className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181919] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-zinc-100">
                  Ajukan Peminjaman
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {selectedItem.nama}
                </p>
              </div>
              <button
                onClick={closePinjamDialog}
                className="shrink-0 rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Jumlah ({selectedItem.satuan})
                </label>
                <input
                  type="number"
                  min={1}
                  max={selectedItem.stok}
                  value={jumlah}
                  onChange={(e) => setJumlah(Number(e.target.value))}
                  className="mt-1.5 h-10 w-full rounded-xl border border-zinc-700 bg-[#0f0f0f] px-4 text-sm text-zinc-200 outline-none focus:border-cyan-500"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Stok tersedia: {selectedItem.stok} {selectedItem.satuan}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Tanggal Pengembalian
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={tanggalKembali}
                  onChange={(e) => setTanggalKembali(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-xl border border-zinc-700 bg-[#0f0f0f] px-4 text-sm text-zinc-200 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Catatan (opsional)
                </label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Contoh: dipakai untuk acara seminar hari Jumat"
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-xl border border-zinc-700 bg-[#0f0f0f] px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-cyan-500 placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onPress={closePinjamDialog}
                isDisabled={isSubmitting}
                className="h-10 flex-1 rounded-xl border border-zinc-700 bg-transparent text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800"
              >
                Batal
              </Button>
              <Button
                onPress={submitPeminjaman}
                isDisabled={isSubmitting}
                className="h-10 flex-1 rounded-xl bg-cyan-500 text-sm font-semibold text-[#08181a] transition hover:bg-cyan-400 disabled:opacity-60"
              >
                {isSubmitting ? "Memproses..." : "Ajukan Pinjam"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
