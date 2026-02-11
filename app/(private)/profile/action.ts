'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateDisplayName(formData: FormData) {
  const supabase = createClient();
  const displayName = formData.get('displayName') as string;

  if (!displayName) {
    return { error: 'Display name is required' };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  // Update auth metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: { display_name: displayName },
  });

  if (authError) {
    return { error: authError.message };
  }

  // Update/Insert into public profiles table for joining
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ 
      id: user.id, 
      display_name: displayName,
      email: user.email 
    });

  if (profileError) {
    console.error('Error updating profile table:', profileError);
    // We don't return error here because auth was successful
  }

  revalidatePath('/profile');
  revalidatePath('/transaction');
  return { success: true };
}
