import { PostgrestError } from '@supabase/supabase-js';
import { sbClient } from '../config';
import { JamaahType, PresensiType, lang } from '../constants';

export default {
  insertPresensiDB: async (req: PresensiType) => {
    const { data: jamaah } = await sbClient
      .from('jamaah')
      .select('id')
      .eq('unique_id', req.uniqueId);

    if (jamaah?.length === 0) {
      const error: PostgrestError = {
        code: '404',
        details: '',
        hint: '',
        message: lang('service.err_jamaah_not_found'),
      };
      return { error };
    }

    const jamaahId = jamaah?.[0].id;

    const { error } = await sbClient
      .from('presensi')
      .insert([{ kajian_id: req.kajianId, jamaah_id: jamaahId }]);

    return { error };
  },

  getPresensiByKajianIDDB: async (id: string) => {
    const { data } = await sbClient
      .from('presensi')
      .select('*,jamaah (id, name)')
      .eq('kajian_id', id);

    const resp: JamaahType[] =
      data?.map((d) => {
        return {
          id: d.jamaah?.id,
          name: d.jamaah?.name,
          phoneNumber: '',
          uniqueId: '',
        };
      }) || [];

    const count = resp?.length;

    return { resp, count, data };
  },
};
