import { create } from "zustand";

interface DataQuery {
  queryPeserta: string[];
  idDtas: string[];
  setQueryPeserta: (queryPeserta: string[]) => void;
  setIdDtas: (idDtas: string[]) => void;
}

export const useUrlId = create<DataQuery>((set) => ({
  queryPeserta: [],
  idDtas: [],
  setQueryPeserta: (queryPeserta) => set({ queryPeserta }),
  setIdDtas: (idDtas) => set({ idDtas }),
}));
