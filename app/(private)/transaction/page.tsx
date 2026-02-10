'use client';

import { DataTable } from '@/components/ui/data-table';
import { createClient } from '@/utils/supabase/client';
import { Transaction } from './columns';
import AddTransaction from '@/components/AddTransaction';
import { fetchNamaBarang } from '@/lib/fetchNamaBarang';
import TransactionPDFDownload from '@/components/pdf/TransactionPDFDownload';
import { calcTotalByQuantity } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getColumns } from './dynamic-columns';

export default function Page() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [namaBarang, setNamaBarang] = useState<{ value: number; label: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const supabase = createClient();

    const { data: transactionData, error: transactionError } = await supabase
      .from('transaction')
      .select(`*, stock:id_barang (id, nama_barang, harga_barang)`)
      .order('created_at', { ascending: false }); // Sort by created_at from newest to oldest

    if (transactionError) {
      console.error(transactionError);
      return;
    }

    const processedTransactions = calcTotalByQuantity(transactionData || []);
    setTransactions(processedTransactions);

    const fetchedNamaBarang = await fetchNamaBarang();
    setNamaBarang(fetchedNamaBarang);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransactionUpdated = () => {
    fetchData(); // Refresh the data when a transaction is updated or deleted
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col px-12 pt-8 gap-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Transaction</h1>
        <div className="flex items-center gap-4">
          <AddTransaction namaBarang={namaBarang} />
          <TransactionPDFDownload transactions={transactions} />
        </div>
      </div>
      <DataTable 
        columns={getColumns(namaBarang, handleTransactionUpdated)} 
        data={transactions} 
      />
    </div>
  );
}
