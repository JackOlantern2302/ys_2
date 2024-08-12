import { DataTable } from '@/components/ui/data-table';
import { createClient } from '@/utils/supabase/server';
import { columns, Transaction } from './columns';
import AddTransaction from '@/components/AddTransaction';
import { fetchNamaBarang } from '@/lib/fetchNamaBarang';
import TransactionPDFDownload from '@/components/pdf/TransactionPDFDownload';

export default async function Page() {
  const supabase = createClient();

  const { data: transactions, error } = await supabase
    .from('transaction')
    .select(`*, stock:id_barang (id, nama_barang, harga_barang)`);

  if (error) {
    console.error(error);
    return <div>Error loading activities</div>;
  }

  const processedTransactions: Transaction[] = transactions.map(
    (transaction) => ({
      ...transaction,
      total_harga: transaction.stock.harga_barang * transaction.kuantitas,
    })
  );

  const namaBarang = await fetchNamaBarang();

  return (
    <div className="flex flex-col px-12 pt-8 gap-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Transaction</h1>
        <div className="flex items-center gap-4">
          <AddTransaction namaBarang={namaBarang} />
          <TransactionPDFDownload transactions={processedTransactions} />
        </div>
      </div>
      <DataTable columns={columns} data={processedTransactions} />
    </div>
  );
}
