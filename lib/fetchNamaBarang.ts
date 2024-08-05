// utils/fetchNamaBarang.ts
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchNamaBarang = async () => {
  const { data, error } = await supabase
    .from('stock')
    .select('id, nama_barang');
  if (error) {
    console.error(error);
    return [];
  }
  return (
    data.map((item) => ({
      value: item.id,
      label: item.nama_barang,
    })) || []
  );
};
