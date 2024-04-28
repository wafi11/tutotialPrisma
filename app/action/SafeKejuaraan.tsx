interface FormData {
  nama: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasi: string;
  startDate?: string;
  endDate?: string;
  createdAt?: Date;
}

export default async function getListings(params: FormData) {
  try {
    const { nama, tanggalMulai, tanggalSelesai, lokasi, startDate, endDate } =
      params;

    let query: any = {};

    if (nama) {
      query.nama = nama;
    }
    if (tanggalMulai) {
      query.tanggalMulai = tanggalMulai;
    }
    if (tanggalSelesai) {
      query.tanggalSelesai = tanggalSelesai;
    }
    if (lokasi) {
      query.lokasi = lokasi;
    }
    if (startDate) {
      query.startDate = startDate;
    }
    if (endDate) {
      query.endDate = endDate;
    }
    const kejuaraans = await prisma?.kejuaraan.findMany({
      where: query,
    });
    return kejuaraans;
    // const SafeListing = kejuaraans?.map((listing) => ({
    //   ...listing,
    //   createdAt: listing.tanggalMulai.toISOString(),
    //   createdAt: listing.tanggalSelesai.toISOString(),
    // }));
  } catch (err) {
    console.log(err);
  }
}
