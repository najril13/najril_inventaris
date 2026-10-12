import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const barang = await prisma.barang.findUnique({
      where: { id },
      include: { kategori: true },
    });

    if (!barang) {
      return NextResponse.json(
        { error: "Barang tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: barang }, { status: 200 });
  } catch (error) {
    console.error("Error fetching barang:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.kategoriId) {
      const kategoriValid = await prisma.jenisBarang.findUnique({
        where: { id: body.kategoriId },
      });

      if (!kategoriValid) {
        return NextResponse.json(
          { error: "Kategori yang dipilih tidak ditemukan" },
          { status: 400 },
        );
      }
    }

    const barang = await prisma.barang.update({
      where: { id },
      data: body,
      include: { kategori: true },
    });

    return NextResponse.json(
      { message: "Barang berhasil diperbarui", data: barang },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating barang:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.barang.delete({ where: { id } });

    return NextResponse.json(
      { message: "Barang berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting barang:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
