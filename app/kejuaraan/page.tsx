"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const dateTransform = (value: string | null): string | null => {
  if (!value) return null; // If the value is null or empty, return null
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date.toISOString(); // Check if the date is valid
};
export const ChampionshipSchema = z.object({
  nama: z.string().min(3).max(50),
  tanggalMulai: z.string().transform(dateTransform),
  tanggalSelesai: z.string().transform(dateTransform),
  lokasi: z.string(),
});

const FormPendaftaranKejuaraan: FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      // Validate form data against schema
      const validatedData = ChampionshipSchema.parse(data);

      // Send validated data to the server
      const response = await axios.post("/api/kejuaraan", validatedData);

      // Handle success response
      console.log("Form submitted successfully:", response.data);

      // Reset form after successful submission
      reset();
    } catch (error) {
      // Handle validation error or API error
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Link></Link> */}
      {/* Input fields */}
      <div>
        <label htmlFor="nama">Name:</label>
        <input type="text" id="nama" {...register("nama")} />
      </div>
      <div>
        <label htmlFor="tanggalMulai">Start Date:</label>
        <input type="date" id="tanggalMulai" {...register("tanggalMulai")} />
      </div>
      <div>
        <label htmlFor="tanggalSelesai">End Date:</label>
        <input
          type="date"
          id="tanggalSelesai"
          {...register("tanggalSelesai")}
        />
      </div>
      <div>
        <label htmlFor="lokasi">Location:</label>
        <input type="text" id="lokasi" {...register("lokasi")} />
      </div>
      {/* <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" {...register("category")} />
      </div> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPendaftaranKejuaraan;
