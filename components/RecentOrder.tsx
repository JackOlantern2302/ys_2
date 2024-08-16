import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { createClient } from '@/utils/supabase/server';
import { calcTotalByQuantity, formatIDR } from '@/lib/utils';

export async function RecentOrder() {
  const supabase = createClient();

  const { data: recentOrder, error } = await supabase
    .from('transaction')
    .select(`*, stock:id_barang (id, nama_barang, harga_barang)`)
    .limit(10);

  if (error) {
    console.error(error);
    return <div>Error loading activities</div>;
  }

  const processedTransactions = calcTotalByQuantity(recentOrder);

  const totalSum = processedTransactions.reduce(
    (sum, transaction) => sum + transaction.total_harga,
    0
  );

  return (
    <Card className="w-full">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Barang</TableHead>
              <TableHead>Kuantitas</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedTransactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.tanggal_transaksi.toString()}
                </TableCell>
                <TableCell>{item.stock.nama_barang}</TableCell>
                <TableCell>{item.kuantitas}</TableCell>
                <TableCell className="text-right">
                  {formatIDR.format(item.total_harga)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Akhir</TableCell>
              <TableCell className="text-right">
                {formatIDR.format(totalSum)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
