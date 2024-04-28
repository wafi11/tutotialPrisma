import prisma from "../../libs/prismaDb";
import type { Peserta } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: any = await request.json();
  const { nama, kelasTanding, kontingen, kejuaraanId } = body;
  console.log(body);

  // const kejuaraan = await prisma.kejuaraan.findUnique({
  //   where: {
  //     nama: namaKejuaraan,
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  // if (!kejuaraan) {
  //   return NextResponse.error();
  // }

  const peserta = await prisma.peserta.create({
    data: {
      nama,
      kontingen,
      kelasTanding,
      //   kontingen,
      // pertandingan: { connect: { id: pertandingan.id } },
      kejuaraan: { connect: { id: kejuaraanId } }, // Hubungkan peserta dengan kejuaraan
    },
  });
  return NextResponse.json(peserta);
}
