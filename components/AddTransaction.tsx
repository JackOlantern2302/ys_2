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
import { DatePicker } from './ui/date-picker';

const formSchema = z.object({
  tanggal: z.date({
    required_error: 'Wajib ada tanggal transaksi.',
  }),
  id_barang: z.coerce.number().min(1),
  kuantitas: z.coerce.number().min(1),
});

const AddTransaction = ({
  namaBarang,
}: {
  namaBarang: { value: number; label: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal: undefined,
      id_barang: 0,
      kuantitas: undefined,
    },
  });

  const supabase = createClient();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase.from('transaction').insert({
      tanggal_transaksi: values.tanggal,
      id_barang: values.id_barang,
      kuantitas: values.kuantitas,
    });

    if (error) {
      console.error('Error tambah transaksi', error.message);
    }
    form.reset();

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
          <DialogTitle>Tambah Transaksi</DialogTitle>
        </DialogHeader>
        <DialogDescription>Tambah Transaksi</DialogDescription>
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
                      defaultValue="default"
                    >
                      <option value="default" disabled>
                        Pilih nama barang
                      </option>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
