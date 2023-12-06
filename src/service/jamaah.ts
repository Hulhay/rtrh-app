import { PostgrestError } from '@supabase/supabase-js';
import { sbClient } from '../config';
import { JamaahType, lang } from '../constants';
import { buildJamaahResp } from './helper';
import { buildQRStringFromResponse } from '../helper';

export default {
  getJamaahDB: async () => {
    const { data, error } = await sbClient
      .from('jamaah')
      .select('id,name')
      .order('created_at', { ascending: false });

    const resp: JamaahType[] = buildJamaahResp(data);

    return { resp, error };
  },

  searchJamaahByKeywordDB: async (keyword: string) => {
    const { data } = await sbClient
      .from('jamaah')
      .select('id,name')
      .ilike('name', `%${keyword}%`)
      .order('created_at', { ascending: false });

    const resp: JamaahType[] = buildJamaahResp(data);

    return { resp };
  },

  getJamaahByIDDB: async (id: string) => {
    const { data, error } = await sbClient
      .from('jamaah')
      .select('*')
      .eq('id', id);

    let resp: JamaahType = {
      id: 0,
      name: '',
      phoneNumber: '',
      uniqueId: '',
      qrString: '',
    };

    if (data?.length === 0) {
      const error: PostgrestError = {
        code: '404',
        details: '',
        hint: '',
        message: lang('service.err_jamaah_not_found'),
      };
      return { resp, error };
    }

    resp = {
      id: data?.[0]?.id,
      name: data?.[0]?.name,
      phoneNumber: data?.[0]?.phone_number,
      uniqueId: data?.[0]?.unique_id,
      qrString: buildQRStringFromResponse(data?.[0]),
    };

    return { resp, error };
  },

  insertJamaahDB: async (jamaah: JamaahType) => {
    const { data: jamaahExists } = await sbClient
      .from('jamaah')
      .select('id')
      .eq('phone_number', jamaah.phoneNumber);

    if (jamaahExists?.[0]?.id) {
      const error: PostgrestError = {
        code: '409',
        message: lang('service.err_wa_exists'),
        details: '',
        hint: '',
      };
      return { error };
    }

    const { error } = await sbClient
      .from('jamaah')
      .insert([
        {
          name: jamaah.name,
          phone_number: jamaah.phoneNumber,
          unique_id: jamaah.uniqueId,
        },
      ])
      .select();

    return { error };
  },
};
