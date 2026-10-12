"use client";

import Link from "next/link";
import { Button, Card, Select, ListBox } from "@heroui/react";
import {
  AlertTriangle,
  Boxes,
  Package,
  PackageX,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ConfirmDialog } from "@/src/components/kelola_barang/ConfirmDialog";
import { toast } from "@/src/lib/toast";
import {
  BarangTable,
  type InventoryItem,
} from "@/src/components/kelola_barang/TabelBarang";

const KATEGORI_LIST = [
  "Semua",
  "Electronics",
  "Furniture",
  "Office Supplies",
  "Networking",
];

function getKategoriNama(kategori: InventoryItem["kategori"]) {
  if (typeof kategori === "object" && kategori !== null) {
    return kategori.nama;
  }
  return kategori;
}

export default function KelolaBarangPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    nama: string;
  } | null>(null);

  const fetchBarang = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/barang");
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Gagal memuat data barang");

      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBarang();
  }, []);

  const requestDelete = (id: string, nama: string) => {
    setPendingDelete({ id, nama });
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const { id, nama } = pendingDelete;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/barang/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (!res.ok) {
        toast.error("Gagal menghapus barang", result.error);
        return;
      }

      setData((prev) => prev.filter((item) => item.id !== id));
      toast.success("Barang dihapus", `${nama} sudah dihapus dari inventaris`);
    } catch {
      toast.error("Terjadi kesalahan", "Tidak dapat terhubung ke server");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  };

  const totalItems = data.length;
  const totalKategori = new Set(
    data.map((item) => getKategoriNama(item.kategori)),
  ).size;
  const lowStockCount = data.filter(
    (item) => item.stok > 0 && item.stok < 10,
  ).length;
  const habisCount = data.filter((item) => item.stok === 0).length;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const namaKategori = getKategoriNama(item.kategori);
      const matchKategori =
        kategoriAktif === "Semua" || namaKategori === kategoriAktif;
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
      label: "Stok Menipis",
      value: lowStockCount.toLocaleString("id-ID"),
      icon: AlertTriangle,
      tone: "amber" as const,
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
    amber: "bg-amber-500/15 text-amber-400",
    red: "bg-red-500/15 text-red-400",
  };

  return (
    <main className="space-y-8 px-5 py-7 lg:px-8">
      {/* PAGE HEADER */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
            Kelola Barang
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500">
            Manajemen inventaris barang, termasuk menambah, mengedit, dan
            menghapus data barang.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-11 items-center gap-3 rounded-xl border border-zinc-700 bg-[#181919] px-4 transition-colors focus-within:border-cyan-500 sm:w-64">
            <Search size={18} className="shrink-0 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search items..."
              className="h-full w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
            />
          </div>

          <Link href="/admin/barang/hal_barang">
            <Button className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 text-sm font-semibold text-[#08181a] transition hover:bg-cyan-400">
              <Plus size={18} strokeWidth={2.2} />
              Tambah Barang
            </Button>
          </Link>
        </div>
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
      {/* <section className="flex flex-col gap-1.5 sm:w-56">
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
      </section> */}

      {/* TABLE */}
      <BarangTable
        data={filteredData}
        isLoading={isLoading}
        error={error}
        deletingId={deletingId}
        onDelete={requestDelete}
      />

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Hapus Barang?"
        description={
          pendingDelete
            ? `"${pendingDelete.nama}" akan dihapus permanen dari inventaris. Tindakan ini tidak bisa dibatalkan.`
            : ""
        }
        isLoading={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </main>
  );
}
