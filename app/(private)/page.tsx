// 'use client';
import ProgressCard from '@/components/ProgressCard';
import { RecentOrder } from '@/components/RecentOrder';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { calcTotalByQuantity, getTotalHargaWithinDays } from '@/lib/utils';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Transaction } from './transaction/columns';

export default async function Home() {
  const supabase = createClient();

  const { data: transaction, error } = await supabase
    .from('transaction')
    .select(`*, stock:id_barang (id, nama_barang, harga_barang)`);

  if (error) {
    console.error(error);
    return <div>Gagal memuat aktivitas</div>;
  }

  const transactions = calcTotalByQuantity(transaction);

  const totalHargaLast30Days = getTotalHargaWithinDays(transactions, 30);
  const totalHargaLast7Days = getTotalHargaWithinDays(transactions, 7);
  const last7DaysPercentage = (totalHargaLast7Days / 5000000) * 100;
  const last30DaysPercentage = (totalHargaLast30Days / 50000000) * 100;

  return (
    <section className="grid grid-cols-3 p-12 gap-x-8">
      <div id="left-section" className="col-span-2 space-y-6">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Tambah Transaksi Baru</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Memperkenalkan Dasbor Pesanan Dinamis Kami untuk Manajemen yang Mulus.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={'/transaction'} className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap">
              Buat Transaksi Baru
            </Link>
          </CardFooter>
        </Card>
        <div className="flex">
          <RecentOrder />
        </div>
      </div>
      <div id="right-section" className="col-span-1 space-y-6">
        <ProgressCard
          title={'7 Hari Terakhir'}
          amount={totalHargaLast7Days}
          content={''}
          progress={last7DaysPercentage}
        />
        <ProgressCard
          title={'30 Hari Terakhir'}
          amount={totalHargaLast30Days}
          content={''}
          progress={last30DaysPercentage}
        />
      </div>
    </section>
  );
}
