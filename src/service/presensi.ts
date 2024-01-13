import { PostgrestError } from '@supabase/supabase-js';
import { sbClient } from '../config';
import { JamaahType, PresensiType, lang } from '../constants';
import { endOfDay, startOfDay } from '../helper';

export default {
  insertPresensiDB: async (req: PresensiType) => {
    const { data: jamaah } = await sbClient
      .from('jamaah')
      .select('id')
      .or(
        `unique_id.eq.${req.uniqueId},name.eq.${req.name},phone_number.eq.${req.phoneNumber}`,
      )
      .single();

    if (!jamaah) {
      const error: PostgrestError = {
        code: '404',
        details: '',
        hint: '',
        message: lang('service.err_jamaah_not_found'),
      };
      return { error };
    }

    const { error } = await sbClient
      .from('presensi')
      .insert([{ kajian_id: req.kajianId, jamaah_id: jamaah?.id }]);

    return { error };
  },

  getPresensiByKajianIDandDateDB: async (id: string, date: string) => {
    const sod = startOfDay(date);
    const eod = endOfDay(date);

    const { data } = await sbClient
      .from('presensi')
      .select('*,jamaah (id, name)')
      .eq('kajian_id', id)
      .gt('created_at', sod)
      .lt('created_at', eod);

    const jamaah: JamaahType[] =
      data?.map((d) => {
        return {
          id: d.jamaah?.id,
          name: d.jamaah?.name,
          phoneNumber: '',
          uniqueId: '',
        };
      }) || [];

    // remove duplicate, temporary approach
    const resp: JamaahType[] = jamaah.filter((j, i) => {
      return i === jamaah.findIndex((o) => j.name === o.name);
    });

    const count = resp?.length;

    return { resp, count, data };
  },
};
