import { JamaahType } from '../../constants';

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
