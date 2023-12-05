import { PostgrestError } from '@supabase/supabase-js';
import { sbClient } from '../config';
import { JamaahType } from '../constants';

export default {
  getJamaahDB: async () => {
    const { data, error } = await sbClient
      .from('jamaah')
      .select('id,name')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  searchJamaahByKeywordDB: async (keyword: string) => {
    const { data } = await sbClient
      .from('jamaah')
      .select('*')
      .ilike('name', `%${keyword}%`)
      .order('created_at', { ascending: false });

    return { data };
  },

  getJamaahByIDDB: async (id: string) => {
    const { data: resp, error } = await sbClient
      .from('jamaah')
      .select('*')
      .eq('id', id);

    const data = resp?.[0];
    if (!data) {
      const error: PostgrestError = {
        code: '404',
        details: '',
        hint: '',
        message: 'Jamaah Tidak Ditemukan',
      };
      return { data, error };
    }

    return { data, error };
  },

  insertJamaahDB: async (jamaah: JamaahType) => {
    const { data: jamaahExists } = await sbClient
      .from('jamaah')
      .select('id')
      .eq('phone_number', jamaah.phoneNumber);

    if (jamaahExists?.[0]?.id) {
      const error: PostgrestError = {
        code: '409',
        details: '',
        hint: '',
        message: 'Nomor WhatssApp Sudah Digunakan',
      };
      return { jamaahExists, error };
    }

    const { data, error } = await sbClient
      .from('jamaah')
      .insert([
        {
          name: jamaah.name,
          phone_number: jamaah.phoneNumber,
          unique_id: jamaah.uniqueId,
        },
      ])
      .select();

    return { data, error };
  },
};
