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
import { formatIDR } from '@/lib/utils';
import EditTransaction from '@/components/EditTransaction';

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
    cell: ({ row }) => formatIDR.format(row.original.stock.harga_barang),
  },
  {
    accessorKey: 'kuantitas',
    header: 'Kuantitas',
  },
  {
    accessorKey: 'total_harga',
    header: 'Total Harga',
    cell: ({ row }) => formatIDR.format(row.original.total_harga),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
          try {
            const supabase = await import('@/utils/supabase/client').then(m => m.createClient());
            
            // First, we need to restore the stock that was reduced when this transaction was created
            const { data: stockData, error: stockError } = await supabase
              .from('stock')
              .select('jumlah_barang')
              .eq('id', payment.id_barang)
              .single();

            if (stockError) {
              console.error('Error fetching stock', stockError);
              alert('Error retrieving stock information');
              return;
            }

            // Restore the stock by adding back the quantity from this transaction
            const newJumlahBarang = stockData.jumlah_barang + payment.kuantitas;
            const { error: updateError } = await supabase
              .from('stock')
              .update({ jumlah_barang: newJumlahBarang })
              .eq('id', payment.id_barang);

            if (updateError) {
              console.error('Error updating stock', updateError);
              alert('Error updating stock');
              return;
            }

            // Now delete the transaction
            const { error: deleteError } = await supabase
              .from('transaction')
              .delete()
              .eq('id', payment.id);

            if (deleteError) {
              console.error('Error deleting transaction', deleteError);
              alert('Error deleting transaction');
            } else {
              // Refresh the page to reflect the deletion
              window.location.reload();
            }
          } catch (error) {
            console.error('Unexpected error during deletion:', error);
            alert('An unexpected error occurred');
          }
        }
      };

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
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
