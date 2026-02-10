'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/client';
import { DatePicker } from '@/components/ui/date-picker';
import { Transaction } from '@/app/((private))/transaction/columns';

const formSchema = z.object({
  tanggal: z.date({
    required_error: 'Wajib ada tanggal transaksi.',
  }),
  id_barang: z.coerce.number().min(1),
  kuantitas: z.coerce.number().min(1),
});

import { PencilIcon } from 'lucide-react';

const EditTransaction = ({
  transaction,
  namaBarang,
  onTransactionUpdated,
}: {
  transaction: Transaction;
  namaBarang: { value: number; label: string }[];
  onTransactionUpdated: () => void;
}) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal: transaction.tanggal_transaksi ? new Date(transaction.tanggal_transaksi) : undefined,
      id_barang: Number(transaction.id_barang),
      kuantitas: transaction.kuantitas,
    },
  });

  const supabase = createClient();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Get the previous quantity to adjust stock accordingly
    const previousQuantity = transaction.kuantitas;
    const newQuantity = values.kuantitas;
    
    // Calculate the difference to adjust stock
    const quantityDifference = newQuantity - previousQuantity;
    
    // Update the transaction
    const { error: transactionError } = await supabase
      .from('transaction')
      .update({
        tanggal_transaksi: values.tanggal,
        id_barang: values.id_barang,
        kuantitas: values.kuantitas,
      })
      .eq('id', transaction.id);

    if (transactionError) {
      console.error('Error updating transaction', transactionError.message);
      alert('Error updating transaction');
      return;
    }

    // Adjust stock based on the difference
    if (quantityDifference !== 0) {
      // Get current stock for the item
      const { data: stockData, error: stockError } = await supabase
        .from('stock')
        .select('jumlah_barang')
        .eq('id', values.id_barang)
        .single();

      if (stockError) {
        console.error('Error fetching stock', stockError.message);
        alert('Error updating stock');
        return;
      }

      // Calculate new stock amount
      // If quantity increased, subtract from stock; if decreased, add back to stock
      const newJumlahBarang = stockData.jumlah_barang - quantityDifference;
      
      // Check if there's enough stock for the new quantity
      if (newJumlahBarang < 0) {
        alert('Not enough stock available for the requested quantity');
        return;
      }
      
      // Update the stock
      const { error: updateError } = await supabase
        .from('stock')
        .update({ jumlah_barang: newJumlahBarang })
        .eq('id', values.id_barang);

      if (updateError) {
        console.error('Error updating stock', updateError.message);
        alert('Error updating stock');
        return;
      }
    }

    form.reset();
    setOpen(false);
    onTransactionUpdated(); // Refresh the data
    console.log('Transaction updated successfully');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center w-full cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <PencilIcon className="mr-2 h-4 w-4" /> Edit
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaksi</DialogTitle>
        </DialogHeader>
        <DialogDescription>Edit Transaksi</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Tanggal Transaksi</FormLabel>
                  <DatePicker field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_barang"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Nama Barang</FormLabel>
                  <FormControl>
                    <select
                      className="border rounded-md p-2"
                      {...field}
                    >
                      {namaBarang.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kuantitas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kuantitas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input kuantitas"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransaction;