'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Stock } from '../stock/columns';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string;
  tanggal_transaksi: Date;
  id_barang: string;
  kuantitas: number;
  total_harga: number;
  stock: Stock;
};
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'tanggal_transaksi',
    header: 'Tanggal Transaksi',
  },
  {
    accessorKey: 'stock.nama_barang',
    header: 'Nama Barang',
  },
  {
    accessorKey: 'stock.harga_barang',
    header: 'Harga Per Item',
  },
  {
    accessorKey: 'kuantitas',
    header: 'Kuantitas',
  },
  {
    accessorKey: 'total_harga',
    header: 'Total Harga',
  },
];
