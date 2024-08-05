'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Stock } from '../stock/columns';
import { MoreHorizontal, PencilIcon, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  payment.tanggal_transaksi.toString()
                )
              }
            >
              Copy tanggal transaksi
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
