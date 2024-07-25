'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stock = {
  id: string;
  created_at: Date;
  nama_barang: string;
  jumlah_barang: number;
  harga_barang: number;
};

export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: 'nama_barang',
    header: 'Nama Barang',
  },
  {
    accessorKey: 'jumlah_barang',
    header: 'Jumlah Barang',
  },
  {
    accessorKey: 'harga_barang',
    header: 'Harga Barang',
  },
];
