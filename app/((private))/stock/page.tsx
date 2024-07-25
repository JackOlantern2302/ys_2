import { DataTable } from '@/components/ui/data-table';
import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { columns } from './columns';

const stock = async () => {
  const supabase = createClient();

  const { data: stock, error } = await supabase.from('stock').select('*');

  if (error) {
    console.error(error);
    return <div>Error loading activities</div>;
  }

  return (
    <div className="px-12 pt-8">
      <DataTable columns={columns} data={stock} />
    </div>
  );
};

export default stock;
