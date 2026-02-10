'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

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
} from './ui/form';
import { Input } from './ui/input';
import { createClient } from '@/utils/supabase/client';
import { Stock } from '@/app/((private))/stock/columns';

const formSchema = z.object({
  nama_barang: z.string().min(2).max(50),
  jumlah_barang: z.coerce.number().min(1),
  harga_barang: z.coerce.number().min(100),
});

const EditStock = ({
  stock,
  onStockUpdated,
}: {
  stock: Stock;
  onStockUpdated: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_barang: stock.nama_barang,
      jumlah_barang: stock.jumlah_barang,
      harga_barang: stock.harga_barang,
    },
  });

  const supabase = createClient();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase
      .from('stock')
      .update({
        nama_barang: values.nama_barang,
        jumlah_barang: values.jumlah_barang,
        harga_barang: values.harga_barang,
      })
      .eq('id', stock.id)
      .select();

    if (error) {
      console.error('Error update stock', error.message);
      alert('Error updating stock');
      return;
    }

    setOpen(false);
    onStockUpdated();
    console.log('Success', data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center w-full cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <Pencil1Icon className="mr-2 h-4 w-4" /> Edit
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Barang</DialogTitle>
        </DialogHeader>
        <DialogDescription>Ubah Data</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nama_barang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Barang</FormLabel>
                  <FormControl>
                    <Input placeholder="Input nama barang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jumlah_barang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Barang</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input jumlah barang"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harga_barang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Barang</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input harga barang"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStock;
