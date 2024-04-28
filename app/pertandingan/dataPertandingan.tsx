"use server";
import { z } from "zod";
import prisma from "@/app/libs/prismaDb";
import { Pertandingan } from "@prisma/client";

const PertandinganSchema = z.object({
  waktu: z.date(),
  lokasi: z.string().optional(),
  kejuaraanId: z.string(),
  pesertaIds: z.array(z.string()).length(2),
});

export interface PertandinganFormData {
  waktu: Date;
  lokasi?: string;
  kejuaraanId: string;
  pesertaIds: string[];
}

export const savePertandingan = async (formData: PertandinganFormData) => {
  const { waktu, lokasi, kejuaraanId, pesertaIds } = formData;

  const parsedData = PertandinganSchema.safeParse(formData);
  if (!parsedData.success) {
    console.log("Error parsing form data:", parsedData.error);
    return;
  }

  const [pesertaId1, pesertaId2] = pesertaIds;

  try {
    const res = await prisma.pertandingan.create({
      data: {
        waktu,
        lokasi,
        kejuaraan: {
          connect: { id: kejuaraanId },
        },
        pesertas: {
          createMany: {
            data: [
              { pesertaId: pesertaId1, kejuaraanId },
              { pesertaId: pesertaId2, kejuaraanId },
            ],
          },
        },
      },
      // include: {
      //   pesertas: true,
      //   kejuaraan: true,
      // },
    });

    console.log("Pertandingan berhasil dibuat:", res);
  } catch (error) {
    console.log("Error creating pertandingan:", error);
    return;
  }
};

export const getPertandingan = async (): Promise<any> => {
  try {
    const pertandingan = await prisma.pertandingan.findMany({
      // e the createdAt field from the query
      select: {
        id: true,
        waktu: true,
        lokasi: true,
        pesertas: {
          select: {
            peserta: true,
          },
        },
      },
    });
    console.log("Pertandingan:", pertandingan);
    return pertandingan;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// pesertas: {
//   select: {
//     peserta: {
//       select: {
//         id: true,
//         nama: true,
//       },
//     },
//   },
// },
// kejuaraan: {
//   // select: {
//   //   id: true,
//   //   nama: true,
//   // },
// },
