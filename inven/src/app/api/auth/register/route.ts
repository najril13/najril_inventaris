import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { nama, email, password, role } = await request.json();

    if (!nama || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 },
      );
    }

    const existing = await prisma.pengguna.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: `Email "${email}" sudah terdaftar` },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pengguna = await prisma.pengguna.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        role: role === "Admin" ? "Admin" : "User",
      },
    });

    return NextResponse.json(
      {
        message: "Akun berhasil dibuat",
        data: { id: pengguna.id, nama: pengguna.nama, email: pengguna.email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error register:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
