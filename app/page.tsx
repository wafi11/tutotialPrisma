import Image from "next/image";
import prisma from "@/app/libs/prismaDb";
// import PesertaForm from "./peserta/page";
import Link from "next/link";
import ShowPeserta from "./peserta/[query]/ShowPeserta";
// import PertandinganList from "./pertandingan/ShowPeertandingan";
// import {getListingById} from '@/app/action/getListingById';

interface IParams {
  kejuaraanId?: string;
}

export async function getListingById(params: IParams) {
  try {
    const { kejuaraanId } = params;
    const listing = await prisma.kejuaraan.findUnique({
      where: {
        id: kejuaraanId,
      },
    });

    if (!listing) {
      return null;
    }
    return {
      ...listing,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

interface FormData {
  nama: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasi: string;
}

const getProducts = async () => {
  const res = await prisma.kejuaraan.findMany({
    select: {
      id: true,
      nama: true,
      tanggalMulai: true,
      tanggalSelesai: true,
      lokasi: true,
    },
  });
  return res;
};

async function Home({ params }: { params: IParams }) {
  const [data] = await Promise.all([
    getProducts(),
    // fetchKelasOptions(),
  ]);
  // const datas = await getListingById(params);
  // console.log({ datas });
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Kejuaraan Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <p className="font-semibold text-lg mb-2">{item.nama}</p>
            <p className="font-semibold text-lg mb-2">{item.id}</p>
            <Link href={`/peserta/${item.id}`}>hallo sayang</Link>
            {/* <Link href={`/peserta/bagan/${item.id}`}>mbuhlah aku bingung</Link> */}
            <ShowPeserta kejuaraanId={item.id} />
            {/* <PesertaForm kejuaraanId={item.id} /> */}
            <p className="text-gray-600">
              Tanggal Mulai: {item.tanggalMulai.toString()}
            </p>
            <Link href={`/bagan/${item.id}`}>
              <p>Klik disini</p>
            </Link>
            <p className="text-gray-600">
              Tanggal Selesai: {item.tanggalSelesai.toString()}
            </p>
            <Link href={`/pertandingan?kejuaraan=${item.id}`}>
              <p>gmn sudah stress bukan</p>
            </Link>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
      {/* <PertandinganList /> */}
    </div>
  );
}

export default Home;
