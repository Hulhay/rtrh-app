import { PostgrestError } from '@supabase/supabase-js';
import { sbClient } from '../config';
import { PresensiType, lang } from '../constants';

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
};
