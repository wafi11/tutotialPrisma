"use client";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// // import prisma from "@/app/libs/prismaDb";
// import { FC, useEffect, useState } from "react";
// // import KelasTanding from "./kelasTanding";
// import { date, number } from "zod";
// import axios from "axios";
// // import KelasTanding from "../page";
// // import client from "@/app/libs/prismaDb";
// import { z } from "zod";
// import KelasTanding from "./kelasTanding";
// // import { kelasTanding } from "@prisma/client";

// interface kejuaraans {
//   kejuaraanId: string;
// }

// const schema = z.object({
//   nama: z.string().min(1).max(50),
//   kelasTanding: z.string(),
//   kontingen: z.string().min(1).max(50), // Assuming kelasTanding is a string field
//   kejuaraanId: z.string(), // Adjust this based on the actual type of kejuaraanId
// });

// type FormData = {
//   nama: string;
//   kelasTanding: string;
//   kontingen: string;
//   kejuaraanId?: string;
// };

// interface pertandinganform {
//   kejuaraanId?: string;
//   params: string;
//   //   kelasTandings: kelasTandingId[];
// }

// const PesertaForm = ({ kejuaraanId }: { kejuaraanId: string }) => {
//   //   const [kelasOptions, setKelasOptions] = useState<string[]>([]);
//   const [kelasOptions, setKelasOptions] = useState<string[]>([]);

//   //   useEffect(() => {
//   //     const fetchKelasOptions = async () => {
//   //       try {
//   //         const kelas = await prisma.kelasTandingId.findMany({
//   //           select: {
//   //             id: true,
//   //           },
//   //         });
//   //         setKelasOptions(kelas.map(({ id }) => id));
//   //       } catch (error) {
//   //         console.error("Error fetching kelas options:", error);
//   //       }
//   //     };

//   //     fetchKelasOptions();
//   //   }, []);
//   const [formData, setFormData] = useState<FormData>({
//     nama: "",
//     kelasTanding: "",
//     kontingen: "",
//     kejuaraanId: kejuaraanId,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/peserta", formData);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* <label>
//       Kategori Pertandingan:
//       <input
//         type="text"
//         name="kategori"
//         value={formData.kategori}
//         onChange={handleChange}
//       />
//     </label> */}
//       <label>
//         Nama Peserta:
//         <input
//           type="text"
//           name="nama"
//           value={formData.nama}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Kelas Tanding:
//         <input
//           type="text"
//           name="kelasTanding"
//           value={formData.kelasTanding}
//           onChange={handleChange}
//         />
//       </label>
//       {/* <div>
//       <label htmlFor="kelas tanding">Kelas Tanding:</label>
//       <select id="kelasTandingId" name="kelasTanding">
//         {kelasTandings?.map((option) => (
//           <option key={option.id} value={option.kategori}>
//             {option.kategori}
//           </option>
//         ))}
//       </select>
//     </div> */}
//       <label>
//         Kontingen:
//         <input
//           type="text"
//           name="kontingen"
//           value={formData.kontingen}
//           onChange={handleChange}
//         />
//       </label>
//       {/* <label>
//         Kontingen:
//         <input
//           type="text"
//           name="kelasTanding"
//           value={formData.kelasTanding}
//           onChange={handleChange}
//         />
//       </label> */}
//       <input type="hidden" name="kejuaraanId" value={formData.kejuaraanId} />

//       <button type="submit">Tambah Pertandingan</button>
//     </form>
//   );
// };

// export default PesertaForm;

import React from "react";
import TabelPeserta from "./BaganPeserta";
import PertandinganList from "../pertandingan/ShowPeertandingan";

const Page = () => {
  return <PertandinganList />;
};

export default Page;
