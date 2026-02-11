'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateDisplayName } from '@/app/(private)/profile/action';

interface EditProfileFormProps {
  initialDisplayName: string;
}

export default function EditProfileForm({ initialDisplayName }: EditProfileFormProps) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateDisplayName(formData);

    setLoading(false);
    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Nama tampilan berhasil diperbarui!' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="displayName">Nama Tampilan</Label>
        <Input
          id="displayName"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Masukkan nama tampilan Anda"
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Memperbarui...' : 'Perbarui Nama Tampilan'}
      </Button>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}
