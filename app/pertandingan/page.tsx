"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PertandinganFormData, savePertandingan } from "./dataPertandingan";
// import PertandinganList from "./ShowPeertandingan";

const Page = () => {
  const searchParams = useSearchParams();
  const [pesertaIds, setPesertaIds] = useState("");
  const [pesertaArray, setPesertaArray] = useState<string[]>([]);
  //   console.log(searchParams.get("id1"));
  //   console.log(searchParams.get("id2"));
  const [ids, setIds] = useState<string[]>([]);
  // console.log(ids);
  const kejuaraan = searchParams.get("kejuaraan") ?? "";
  const id1 = searchParams.get("id1") ?? "";
  const id2 = searchParams.get("id2") ?? "";

  //   useEffect(() => {

  //     const newIds: string[] = [];
  //     if (id1) newIds.push(id1);
  //     if (id2) newIds.push(id2);

  //     setIds(newIds);
  //   }, [searchParams]);

  const { register, handleSubmit } = useForm<PertandinganFormData>();
  // ...

  useEffect(() => {
    const newIds: string[] = [];
    if (id1) newIds.push(id1);
    if (id2) newIds.push(id2);
    setIds(newIds);

    const newArray = newIds;
    setPesertaArray(newArray);
  }, [searchParams, id1, id2]);

  const onSubmit: SubmitHandler<PertandinganFormData> = async (data) => {
    try {
      data.waktu = new Date(data.waktu);
      await savePertandingan({ ...data, pesertaIds: pesertaArray });
      console.log("pertandingan saved successfully");
    } catch (e) {
      console.log(e);
      console.error("Error:", e);
    }
  };
  console.log({ pesertaArray });

  return (
    <React.Fragment>
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
        <input type="hidden" {...register("kejuaraanId")} value={kejuaraan} />
        {/* <input
        type="hidden"
        {...register("pesertaIds")}
        value={pesertaArray.join(",")}
      /> */}
        <button type="submit">Buat Pertandingan</button>
      </form>
    </React.Fragment>
  );
};

export default Page;
