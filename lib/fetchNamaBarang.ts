// utils/fetchNamaBarang.ts
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchNamaBarang = async () => {
  const { data, error } = await supabase.from('stock').select('nama_barang');
  if (error) {
    console.error(error);
    return [];
  }
  return (
    data.map((item) => ({
      value: item.nama_barang,
      label: item.nama_barang,
    })) || []
  );
};
