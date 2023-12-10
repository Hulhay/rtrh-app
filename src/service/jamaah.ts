import { PostgrestError } from '@supabase/supabase-js';
import { sbClient } from '../config';
import { JamaahType, lang } from '../constants';
import { buildJamaahResp } from './helper';
import { buildQRStringFromResponse } from '../helper';

export default {
  getJamaahDB: async (keyword?: string) => {
    const { data, error } = await sbClient
      .from('jamaah')
      .select('id,name')
      .ilike('name', `%${keyword}%`)
      .order('created_at', { ascending: false });

    const resp: JamaahType[] = buildJamaahResp(data);

    return { resp, error };
  },

  getJamaahByIDDB: async (id: string) => {
    const { data, error } = await sbClient
      .from('jamaah')
      .select('*')
      .eq('id', id)
      .single();

    let resp: JamaahType = {
      id: 0,
      name: '',
      phoneNumber: '',
      uniqueId: '',
      qrString: '',
    };

    if (!data) {
      const error: PostgrestError = {
        code: '404',
        details: '',
        hint: '',
        message: lang('service.err_jamaah_not_found'),
      };
      return { resp, error };
    }

    resp = {
      id: data?.id,
      name: data?.name,
      phoneNumber: data?.phone_number,
      uniqueId: data?.unique_id,
      qrString: buildQRStringFromResponse(data),
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

    const { error } = await sbClient.from('jamaah').insert([
      {
        name: jamaah.name,
        phone_number: jamaah.phoneNumber,
        unique_id: jamaah.uniqueId,
      },
    ]);

    return { error };
  },

  updateJamaahByIDDB: async (jamaah: JamaahType, id: string) => {
    const { data } = await sbClient
      .from('jamaah')
      .select('*')
      .eq('id', id)
      .single();

    if (!data) {
      const error: PostgrestError = {
        code: '404',
        details: '',
        hint: '',
        message: lang('service.err_jamaah_not_found'),
      };
      return { error };
    }

    const { error } = await sbClient
      .from('jamaah')
      .update([
        {
          name: jamaah.name,
          phone_number: jamaah.phoneNumber,
        },
      ])
      .eq('id', id);

    return { error };
  },
};
