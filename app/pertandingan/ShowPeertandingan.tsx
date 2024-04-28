"use client";
import React, { useState, useEffect } from "react";
import { getPertandingan } from "./dataPertandingan";
import { Pertandingan, PesertaPertandingan } from "@prisma/client";
interface DataItem {
  id: string;
  waktu: Date;
  lokasi?: string | null;
}
const PertandinganList = () => {
  const [pertandingans, setPertandingans] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPertandingan();
        console.log(data);
        setPertandingans(data);
      } catch (error) {
        console.error("Error fetching pertandingans:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Daftar Pertandingan</h2>
      {pertandingans?.map((pertandingan: any) => {
        console.log({ pertandingan });
        return (
          <div key={pertandingan.id}>
            <h3>Waktu: {pertandingan.waktu.toString()}</h3>
            <p>Lokasi: {pertandingan?.lokasi}</p>
            <h4>Peserta:</h4>
            <ul>
              {pertandingan.pesertas.map((peserta: any) => (
                <li key={peserta.id}>
                  Nama: {peserta.peserta.nama}, Kontingen:{" "}
                  {peserta.peserta.kontingen}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PertandinganList;
