// import getCurrentUser from "@/app/actions/getCurrenUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";

export async function POST(request: Request) {
  const body = await request.json();
  const { nama, lokasi, category, tanggalMulai, tanggalSelesai } = body;
  console.log(nama);

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const kejuaraan = await prisma.kejuaraan.create({
    data: {
      nama,
      lokasi,
      tanggalMulai,
      tanggalSelesai,
    },
  });
  console.log(kejuaraan);
  return NextResponse.json(kejuaraan);
}
