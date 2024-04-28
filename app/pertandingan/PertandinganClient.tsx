"use client";
import { useUrlId } from "@/hooks/dat-url";
// import { Peserta } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { PertandinganFormData, savePertandingan } from "./dataPertandingan";
// import { SavePertandingan } from "./dataPertandingan";

type FormData = {
  waktu: Date;
  lokasi?: string;
  kejuaraanId: string;
  pesertaIds: string[];
};

export const loadFromLocalStorage = (key: any) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (key: any, data: string[]) => {
  const dataArray = data;
  localStorage.setItem(key, JSON.stringify(data));
};

const PertandinganClient = ({ params }: { params: { query: string } }) => {
  const dataUrl = useUrlId();
  const [matches, setMatches] = useState<string[]>(
    loadFromLocalStorage("matches") || []
  );
  useEffect(() => {
    console.log("Data URL ID:", dataUrl.idDtas);
    if (Array.isArray(dataUrl.idDtas) && dataUrl.idDtas.length >= 2) {
      console.log("Setting matches:", dataUrl.idDtas);
      setMatches(dataUrl.idDtas);
      saveToLocalStorage("matches", dataUrl.idDtas); // <--- Menyimpan dataUrl.idDtas ke localStorage
    } else {
      console.log("Resetting matches.");
      setMatches([]);
      saveToLocalStorage("matches", []); // <--- Menyimpan array kosong ke localStorage saat tidak ada data
    }
  }, [dataUrl.idDtas]);

  // useEffect(() => {
  //   // Saat matches berubah, simpan ke localStorage
  //   saveToLocalStorage("matches", matches);
  // }, [matches]);
  // setMatches(dataUrl.idDtas);
  const { register, handleSubmit } = useForm<PertandinganFormData>();
  // ...

  const onSubmit: SubmitHandler<PertandinganFormData> = async (data) => {
    try {
      data.waktu = new Date(data.waktu);
      await savePertandingan(data);
      console.log(data);
    } catch (e) {
      console.log(e);
      console.error("Error:", e);
    }
  };

  console.log({ matches });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Lokasi</label>
        <input {...register("lokasi")} />
      </div>
      <div>
        <label>waktu</label>
        <input {...register("waktu", { required: true })} type="date" />
        {/* {errors.kategori && <span>Kategori wajib diisi</span>} */}
      </div>
      <input type="hidden" {...register("kejuaraanId")} value={params.query} />
      <input type="hidden" {...register("pesertaIds")} value={matches} />
      <button type="submit">Buat Pertandingan</button>
    </form>
  );
};

export default PertandinganClient;
