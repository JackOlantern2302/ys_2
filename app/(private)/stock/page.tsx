'use client';

import { DataTable } from '@/components/ui/data-table';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import { columns } from './columns';
import AddItem from '@/components/AddItem';
import StockPDFDownload from '@/components/StockPDFDownload';

const Stock = () => {
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const supabase = createClient();

    const { data: stock, error } = await supabase.from('stock').select('*');

    if (error) {
      console.error(error);
      return;
    }

    setStockData(stock || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStockUpdated = () => {
    fetchData(); // Refresh the data when a stock item is updated or deleted
  };

  if (loading) {
    return <div>Memuat...</div>;
  }

  return (
    <div className="flex flex-col px-12 pt-8 gap-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Stok</h1>
        <div className="flex items-center gap-4">
          <AddItem onSuccess={handleStockUpdated} />
          <StockPDFDownload stockData={stockData} />
        </div>
      </div>
      <DataTable columns={columns(handleStockUpdated)} data={stockData} />
    </div>
  );
};

export default Stock;
