import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// GET /api/barang - Ambil semua barang
export async function GET() {
  try {
    const barangList = await prisma.barang.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        kategori: true, // sertakan data JenisBarang terkait
      },
    });
    return NextResponse.json({ data: barangList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching barang:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

// POST /api/barang - Tambah barang baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nama,
      kategoriId,
      merek,
      sku,
      kondisi,
      stok,
      lokasiRak,
      status,
      deskripsi,
    } = body;

    if (!nama || !sku) {
      return NextResponse.json(
        { error: "Field nama dan sku wajib diisi" },
        { status: 400 },
      );
    }

    if (!kategoriId) {
      return NextResponse.json(
        { error: "Kategori wajib dipilih" },
        { status: 400 },
      );
    }

    const kategoriValid = await prisma.jenisBarang.findUnique({
      where: { id: kategoriId },
    });

    if (!kategoriValid) {
      return NextResponse.json(
        { error: "Kategori yang dipilih tidak ditemukan" },
        { status: 400 },
      );
    }

    const existing = await prisma.barang.findUnique({ where: { sku } });
    if (existing) {
      return NextResponse.json(
        { error: `SKU "${sku}" sudah digunakan` },
        { status: 409 },
      );
    }

    const barangTerakhir = await prisma.barang.findFirst({
      orderBy: { id: "desc" },
    });

    const nomorBerikutnya = barangTerakhir
      ? parseInt(barangTerakhir.id, 10) + 1
      : 1;

    const newId = String(nomorBerikutnya).padStart(4, "0");

    const barang = await prisma.barang.create({
      data: {
        id: newId,
        nama,
        kategoriId,
        merek: merek || null,
        sku,
        kondisi: kondisi || "BARU",
        stok: Number(stok) || 0,
        lokasiRak: lokasiRak || null,
        status: status || "TERSEDIA",
        deskripsi: deskripsi || null,
      },
      include: { kategori: true },
    });

    return NextResponse.json(
      { message: "Barang berhasil ditambahkan", data: barang },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating barang:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
