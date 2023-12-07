import { PostgrestError } from '@supabase/supabase-js';
import { sbClient } from '../config';
import { KajianType, lang } from '../constants';
import { buildKajianResp } from './helper';
import { todayDateString } from '../helper';

export default {
  getKajianDB: async () => {
    const { data } = await sbClient
      .from('kajian')
      .select('id,name')
      .order('date', { ascending: false });

    const resp: KajianType[] = buildKajianResp(data);

    return { resp };
  },

  searchKajianByKeywordDB: async (keyword: string) => {
    const { data } = await sbClient
      .from('kajian')
      .select('*')
      .ilike('name', `%${keyword}%`)
      .order('date', { ascending: false });

    const resp: KajianType[] = buildKajianResp(data);

    return { resp };
  },

  getKajianByIDDB: async (id: string) => {
    const { data, error } = await sbClient
      .from('kajian')
      .select('*')
      .eq('id', id);

    let resp: KajianType = {
      id: 0,
      name: '',
      lecturer: '',
      date: '',
    };

    if (data?.length === 0) {
      const error: PostgrestError = {
        code: '404',
        details: '',
        hint: '',
        message: lang('service.err_kajian_not_found'),
      };
      return { resp, error };
    }

    resp = {
      id: data?.[0]?.id,
      name: data?.[0]?.name,
      lecturer: data?.[0]?.lecturer,
      date: data?.[0]?.date,
    };

    return { resp, error };
  },

  insertKajianDB: async (kajian: KajianType) => {
    const { error } = await sbClient
      .from('kajian')
      .insert([
        {
          name: kajian.name,
          lecturer: kajian.lecturer,
          date: kajian.date,
        },
      ])
      .select();

    return { error };
  },

  getKajianTodayDB: async () => {
    const today = todayDateString();

    const { data } = await sbClient
      .from('kajian')
      .select('*')
      .eq('date', today);

    const resp: KajianType[] = buildKajianResp(data);

    return { resp };
  },
};
