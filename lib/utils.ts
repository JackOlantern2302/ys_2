import { Transaction } from '@/app/((private))/transaction/columns';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calcTotalByQuantity(input: Transaction[]) {
  const processedTransactions: Transaction[] = input.map((data) => ({
    ...data,
    total_harga: data.stock.harga_barang * data.kuantitas,
  }));

  return processedTransactions;
}

export const formatIDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

export function getTotalHarga(transactions: Transaction[]): number {
  return transactions.reduce(
    (acc, transaction) => acc + transaction.total_harga,
    0
  );
}

export function getTotalHargaWithinDays(
  transactions: Transaction[],
  days: number
): number {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return transactions
    .filter(
      (transaction) => new Date(transaction.tanggal_transaksi) >= cutoffDate
    )
    .reduce((acc, transaction) => acc + transaction.total_harga, 0);
}
