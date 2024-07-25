'use client';

import EditStock from '@/components/EditStock';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

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
