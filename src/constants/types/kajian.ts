export type KajianType = {
  id: number;
  name: string;
  lecturer: string;
  date: string;
};

export type PresensiType = {
  kajianId: number;
  name: string;
  phoneNumber: string;
  uniqueId: string;
  time: string;
};
