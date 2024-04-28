"use server";
import prisma from "@/app/libs/prismaDb";
import { Peserta } from "@prisma/client";
import { FC } from "react";
import { z } from "zod";

interface PesertaFormData {
  nama: string;
  kelasTanding: string;
  kontingen: string;
  // kejuaraanId: string;
}

const PesertaSchema = z.object({
  nama: z.string().min(1).max(50),
  kelasTanding: z.string().min(1).max(50),
  kontingen: z.string().min(1).max(50),
  kejuaraanId: z.string(), // Sesuaikan dengan tipe data yang benar
});

export const savePeserta = async (
  //   kejuaraanId: string,
  formPeserta: PesertaFormData
) => {
  const validateFields = PesertaSchema.safeParse(formPeserta);
  if (!validateFields.success) {
    throw new Error(validateFields.error.message);
  }
  try {
    const res = await prisma?.peserta.create({
      data: {
        nama: validateFields.data.nama,
        kelasTanding: validateFields.data.kelasTanding,
        kontingen: validateFields.data.kontingen,
        kejuaraanId: validateFields.data.kejuaraanId,
      },
      include: {
        pertandingans: true,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    throw new Error();
  }
};

export const getPesertaByKejuaraanId = async (kejuaraanId: string) => {
  const peserta = await prisma?.peserta.findMany({
    where: {
      kejuaraanId: kejuaraanId,
    },
  });
  return peserta;
};
