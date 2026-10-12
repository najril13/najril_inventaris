"use client";

import { Button, Modal } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from "@/src/lib/toast";
import { INPUT_CLASS, LABEL_CLASS } from "@/src/lib/form_style";

type ItemStatus = "TERSEDIA" | "DIPINJAM" | "HABIS";
type ItemCondition = "BARU" | "BEKAS";

type Kategori = {
  id: string;
  nama: string;
};

type BarangDetail = {
  id: string;
  nama: string;
  kategoriId: string;
  merek: string | null;
  sku: string;
  kondisi: string;
  lokasiRak: string | null;
  stok: number;
  status: string;
  deskripsi: string | null;
};

type Props = {
  barangId: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function EditBarangModal({ barangId, onClose, onSuccess }: Props) {
  const isOpen = barangId !== null;

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<BarangDetail | null>(null);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await fetch("/api/jenisbarang");
        const result = await res.json();
        if (res.ok) setKategoriList(result.data);
      } catch {
        // Gagal diam-diam; dropdown akan tampil kosong jika ini gagal
      }
    };

    fetchKategori();
  }, []);

  useEffect(() => {
    if (!barangId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(null);
      return;
    }

    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/barang/${barangId}`);
        const result = await res.json();

        if (!res.ok) {
          toast.error("Gagal memuat data", result.error);
          onClose();
          return;
        }

        setForm({
          id: result.data.id,
          nama: result.data.nama,
          kategoriId: result.data.kategoriId,
          merek: result.data.merek,
          sku: result.data.sku,
          kondisi: result.data.kondisi,
          lokasiRak: result.data.lokasiRak,
          stok: result.data.stok,
          status: result.data.status,
          deskripsi: result.data.deskripsi,
        });
      } catch {
        toast.error("Terjadi kesalahan", "Tidak dapat terhubung ke server");
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [barangId, onClose]);

  const updateField = <K extends keyof BarangDetail>(
    key: K,
    value: BarangDetail[K],
  ) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async () => {
    if (!form || !barangId) return;

    if (!form.nama.trim() || !form.sku.trim()) {
      toast.warning("Data belum lengkap", "Nama dan SKU wajib diisi");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/barang/${barangId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama.trim(),
          kategoriId: form.kategoriId,
          merek: form.merek?.trim() || null,
          sku: form.sku.trim(),
          kondisi: form.kondisi,
          lokasiRak: form.lokasiRak?.trim() || null,
          stok: Number(form.stok) || 0,
          status: form.status,
          deskripsi: form.deskripsi?.trim() || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error("Gagal menyimpan perubahan", result.error);
        return;
      }

      toast.success(
        "Barang berhasil diperbarui",
        `${form.nama} sudah tersimpan`,
      );
      onSuccess();
      onClose();
    } catch {
      toast.error("Terjadi kesalahan", "Tidak dapat terhubung ke server");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <Modal.Container placement="center" size="lg" scroll="inside">
          <Modal.Dialog className="bg-[#181919] border border-zinc-800">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-zinc-100">
                Edit Barang
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              {isLoading && (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Memuat data...
                </p>
              )}

              {!isLoading && form && (
                <div className="space-y-5">
                  <div>
                    <label className={LABEL_CLASS}>Nama Barang *</label>
                    <input
                      value={form.nama}
                      onChange={(e) => updateField("nama", e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_CLASS}>Kategori</label>
                      <select
                        value={form.kategoriId}
                        onChange={(e) =>
                          updateField("kategoriId", e.target.value)
                        }
                        className={`${INPUT_CLASS} appearance-none`}
                      >
                        {kategoriList.map((k) => (
                          <option
                            key={k.id}
                            value={k.id}
                            className="bg-[#181919]"
                          >
                            {k.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>SKU *</label>
                      <input
                        value={form.sku}
                        onChange={(e) => updateField("sku", e.target.value)}
                        className={`${INPUT_CLASS} font-mono uppercase`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_CLASS}>Merek</label>
                      <input
                        value={form.merek ?? ""}
                        onChange={(e) => updateField("merek", e.target.value)}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Kondisi</label>
                      <div className="flex gap-2">
                        {(["BARU", "BEKAS"] as ItemCondition[]).map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => updateField("kondisi", k)}
                            className={`flex-1 h-11 rounded-xl border text-sm font-medium transition ${
                              form.kondisi === k
                                ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                                : "border-zinc-700 bg-[#0f1010] text-zinc-400"
                            }`}
                          >
                            {k === "BARU" ? "Baru" : "Bekas"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_CLASS}>Stok</label>
                      <input
                        type="number"
                        value={form.stok}
                        onChange={(e) =>
                          updateField("stok", Number(e.target.value))
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Lokasi Rak</label>
                      <input
                        value={form.lokasiRak ?? ""}
                        onChange={(e) =>
                          updateField("lokasiRak", e.target.value)
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Status</label>
                    <div className="flex gap-2">
                      {(["TERSEDIA", "DIPINJAM", "HABIS"] as ItemStatus[]).map(
                        (s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => updateField("status", s)}
                            className={`flex-1 h-11 rounded-xl border text-sm font-medium transition ${
                              form.status === s
                                ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                                : "border-zinc-700 bg-[#0f1010] text-zinc-400"
                            }`}
                          >
                            {s}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                type="button"
                onPress={onClose}
                className="h-11 rounded-xl border border-zinc-700 bg-transparent px-5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800"
              >
                Batal
              </Button>
              <Button
                type="button"
                onPress={handleSave}
                isDisabled={isLoading || isSaving || !form}
                className="h-11 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-[#08181a] hover:bg-cyan-400 disabled:opacity-40"
              >
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
