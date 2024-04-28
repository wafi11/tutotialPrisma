"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import prisma from "@/app/libs/prismaDb";
import React, { FC, useEffect, useState } from "react";
// import KelasTanding from "./kelasTanding";
import { date, number } from "zod";
import axios from "axios";
// import KelasTanding from "../page";
// import client from "@/app/libs/prismaDb";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { savePeserta } from "../dataPeserta";
import ShowPeserta from "./ShowPeserta";

interface kejuaraans {
  kejuaraanId: string;
}

const schema = z.object({
  nama: z.string().min(1).max(50),
  kelasTanding: z.string(),
  kontingen: z.string().min(1).max(50), // Assuming kelasTanding is a string field
  kejuaraanId: z.string(), // Adjust this based on the actual type of kejuaraanId
});

type FormData = {
  nama: string;
  kelasTanding: string;
  kontingen: string;
  kejuaraanId?: string;
};

interface pertandinganform {
  kejuaraanId?: string;
  params: string;
}

const PesertaForm = ({ params }: { params: string }) => {
  console.log({ params });
  const { query }: any = params;
  console.log({ query });
  const [kelasOptions, setKelasOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    kelasTanding: "",
    kontingen: "",
    kejuaraanId: query,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await savePeserta(formData);
      console.log("peserta saved");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Peserta:
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
          />
        </label>
        <label>
          Kelas Tanding:
          <input
            type="text"
            name="kelasTanding"
            value={formData.kelasTanding}
            onChange={handleChange}
          />
        </label>
        <label>
          Kontingen:
          <input
            type="text"
            name="kontingen"
            value={formData.kontingen}
            onChange={handleChange}
          />
        </label>
        <input type="hidden" name="kejuaraanId" value={formData.kejuaraanId} />
        <button type="submit">Tambah Pertandingan</button>
      </form>
    </React.Fragment>
  );
};

export default PesertaForm;
