'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditStock from '@/components/EditStock';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stock = {
  id: string;
  created_at: Date;
  nama_barang: string;
  jumlah_barang: number;
  harga_barang: number;
};

export const columns: (onStockUpdated: () => void) => ColumnDef<Stock>[] = (onStockUpdated) => [
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
  {
    id: 'actions',
    cell: ({ row }) => {
      const stock = row.original;

      const handleDelete = async () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus stok ini?')) {
          try {
            const supabase = await import('@/utils/supabase/client').then(m => m.createClient());

            // Check if there are any transactions associated with this stock item
            const { count: transactionCount, error: countError } = await supabase
              .from('transaction')
              .select('*', { count: 'exact', head: true })
              .eq('id_barang', stock.id);

            if (countError) {
              console.error('Error counting transactions', countError);
              alert('Gagal memeriksa transaksi terkait');
              return;
            }

            if (transactionCount && transactionCount > 0) {
              alert('Tidak dapat menghapus stok yang memiliki transaksi terkait');
              return;
            }

            // Delete the stock item
            const { error: deleteError } = await supabase
              .from('stock')
              .delete()
              .eq('id', stock.id);

            if (deleteError) {
              console.error('Error deleting stock', deleteError);
              alert('Gagal menghapus stok');
            } else {
              onStockUpdated(); // Refresh the data to reflect the deletion
            }
          } catch (error) {
            console.error('Unexpected error during deletion:', error);
            alert('Terjadi kesalahan yang tidak terduga');
          }
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditStock stock={stock} onStockUpdated={onStockUpdated} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
