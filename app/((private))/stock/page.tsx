import { DataTable } from '@/components/ui/data-table';
import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { columns } from './columns';
import AddItem from '@/components/AddItem';
import EditStock from '@/components/EditStock';

const stock = async () => {
  const supabase = createClient();

  const { data: stock, error } = await supabase.from('stock').select('*');

  if (error) {
    console.error(error);
    return <div>Error loading activities</div>;
  }

  return (
    <div className="flex flex-col px-12 pt-8 gap-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Stock</h1>
        <div className="flex items-center gap-4">
          <AddItem />
          <EditStock />
        </div>
      </div>
      <DataTable columns={columns} data={stock} />
    </div>
  );
};

export default stock;
