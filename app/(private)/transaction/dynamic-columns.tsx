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
  user_id?: string;
  profiles?: {
    display_name: string;
  };
};

export const getColumns = (namaBarang: { value: number; label: string }[], onTransactionUpdated: () => void): ColumnDef<Transaction>[] => [
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
      accessorKey: 'user_id',
      header: 'ID Pengguna',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const payment = row.original;
  
        const handleDelete = async () => {
          if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
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
                alert('Gagal mengambil informasi stok');
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
                alert('Gagal memperbarui stok');
                return;
              }
  
              // Now delete the transaction
              const { error: deleteError } = await supabase
                .from('transaction')
                .delete()
                .eq('id', payment.id);
  
              if (deleteError) {
                console.error('Error deleting transaction', deleteError);
                alert('Gagal menghapus transaksi');
              } else {
                // Refresh the page to reflect the deletion
                onTransactionUpdated();
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
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    payment.tanggal_transaksi.toString()
                  )
                }
              >
                Salin tanggal transaksi
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" /> Hapus
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditTransaction 
                  transaction={payment} 
                  namaBarang={namaBarang} 
                  onTransactionUpdated={onTransactionUpdated} 
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  