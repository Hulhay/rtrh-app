import { JamaahType, KajianType } from '../../constants';

export const buildJamaahResp = (data: any[] | null): JamaahType[] => {
  return (
    data?.map((d) => {
      return {
        id: d.id,
        name: d.name,
        phoneNumber: d.phone_number,
        uniqueId: d.unique_id,
      };
    }) || []
  );
};
export const buildKajianResp = (data: any[] | null): KajianType[] => {
  return (
    data?.map((d) => {
      return {
        id: d.id,
        name: d.name,
        lecturer: d.lecturer,
      };
    }) || []
  );
};
