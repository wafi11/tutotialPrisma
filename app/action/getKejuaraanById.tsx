import prisma from "../libs/prismaDb";

interface IParams {
  kejuaraanId?: string;
}

export default async function getListingById(params: IParams) {
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
