import React, { FC } from "react";
import prisma from "@/app/libs/prismaDb";
import { Peserta } from "@prisma/client";
import { getPesertaByKejuaraanId } from "../dataPeserta";
import { getPertandingan } from "@/app/pertandingan/dataPertandingan";

interface IParams {
  kejuaraanId: string;
}

const ShowPeserta = async ({ kejuaraanId }: { kejuaraanId: string }) => {
  const peserta = await getPesertaByKejuaraanId(kejuaraanId);

  return (
    <>
      <div>
        {peserta?.map((i, index) => (
          <div key={i.id}>
            <div>{index + 1}</div>
            <h1>{i.nama}</h1>
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default ShowPeserta;
