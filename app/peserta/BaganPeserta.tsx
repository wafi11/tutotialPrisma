import React from "react";

interface Peserta {
  id: number;
  nama: string;
  kelasTanding: string;
  kontingen: string;
}

interface Props {
  pesertas: Peserta[];
}

const TabelPeserta: React.FC<Peserta> = ({
  id,
  nama,
  kelasTanding,
  kontingen,
}) => {
  // Shuffle function to randomize the order of participants

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Kelas Tanding</th>
          <th>Kontingen</th>
        </tr>
      </thead>
      <tbody>
        {/* {pesertas.map((peserta) => ( */}
        <tr>
          <td>{id}</td>
          <td>{nama}</td>
          {/* <td>{kelasTanding}</td>
          <td>{kontingen}</td> */}
        </tr>
        {/* ))} */}
      </tbody>
    </table>
  );
};

export default TabelPeserta;
