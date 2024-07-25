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

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { createClient } from '@/utils/supabase/client';

const formSchema = z.object({
  nama_barang: z.string().min(2).max(50),
  jumlah_barang: z.coerce.number().min(1),
  harga_barang: z.coerce.number().min(100),
});

const AddItem = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_barang: '',
      jumlah_barang: 0,
      harga_barang: 0,
    },
  });

  const supabase = createClient();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase.from('stock').insert({
      nama_barang: values.nama_barang,
      jumlah_barang: values.jumlah_barang,
      harga_barang: values.harga_barang,
    });

    if (error) {
      console.error('Error tambah stock', error.message);
    }

    setOpen(false);
    console.log('Success');
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-black rounded-md p-4 text-white">
          <PlusIcon />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Barang</DialogTitle>
        </DialogHeader>
        <DialogDescription>Input Data</DialogDescription>
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
                      placeholder="Input jumlah barang"
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

export default AddItem;
