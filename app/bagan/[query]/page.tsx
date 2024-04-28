"use client";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TabelPeserta from "../../peserta/BaganPeserta";
import { getPesertaByKejuaraanId } from "../../peserta/dataPeserta";
import { Peserta } from "@prisma/client";
import { useUrlId } from "@/hooks/dat-url";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
// import { loadFromLocalStorage } from "@/app/pertandingan/PertandinganClient";

const BaganPesertas = ({ params }: { params: { query: string } }) => {
  const dataUrl = useUrlId(); // Ensure useUrlId hook is implemented correctly
  const kejuaraanId = params.query;
  const [pesertas, setPesertas] = useState<Peserta[]>([]);
  const [matches, setMatches] = useState<[Peserta, Peserta][]>([]);
  const [tombol, setTombol] = useState<boolean>(false);

  useEffect(() => {
    if (kejuaraanId) {
      const fetchData = async () => {
        try {
          const pesertasData = await getPesertaByKejuaraanId(kejuaraanId);
          if (pesertasData && pesertasData.length > 0) {
            const pesertaIds = pesertasData.map((peserta) => peserta.id);
            dataUrl.setQueryPeserta(pesertaIds); // Set pesertaIds directly
            setPesertas(pesertasData);
          }
        } catch (error) {
          console.error("Error fetching pesertas:", error);
        }
      };

      fetchData();
    }
  }, [kejuaraanId, dataUrl.setQueryPeserta]);

  useEffect(() => {
    if (pesertas.length >= 2) {
      // Change the condition to check for at least two participants
      const newMatches = generateMatches(pesertas);
      setMatches(newMatches);
    }
  }, [tombol, pesertas]);
  // const [matches, setMatches] = useState<[Peserta, Peserta][]>([]);

  const shuffle = (array: Peserta[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const generateMatches = (participants: Peserta[]) => {
    const shuffledParticipants = shuffle([...participants]);
    const newMatches: [Peserta, Peserta][] = [];
    for (let i = 0; i < shuffledParticipants.length; i += 2) {
      const match: [Peserta, Peserta] = [
        shuffledParticipants[i],
        shuffledParticipants[i + 1],
      ];
      newMatches.push(match);
    }
    return newMatches;
  };

  const handleTombol = useCallback(() => setTombol(!tombol), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  // setSearchParams.set("searchParams", id)
  const handleMatchSelection = (match: [id: string, id2: string]) => {
    // Lakukan apa pun yang diperlukan dengan data pertandingan yang dipilih
    dataUrl.setIdDtas(match);
    router.push(`/pertandingan/${match}`);
    // Misalnya, kirim data tersebut ke server atau lakukan pemrosesan tambahan
  };

  return (
    <div>
      <h1>Randomized Matches</h1>
      <button onClick={handleTombol}>Randomize dulu bang</button>
      <ul className="grid">
        {matches.map((match, index) => (
          <li key={uuidv4()}>
            Match {index + 1}: [{match[0]?.nama} vs {match[1]?.nama}]{" "}
            <Link
              href={`/pertandingan?kejuaraan=${[kejuaraanId]}&id1=${
                match[1].id
              }&id2=${match[0].id}`}>
              Pilih
            </Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaganPesertas;
