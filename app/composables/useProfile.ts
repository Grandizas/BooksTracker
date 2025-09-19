type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

export function useProfile() {
  const profile = useState<Profile | null>('profile', () => null);
  const pending = useState<boolean>('profile:pending', () => false);

  async function refresh() {
    pending.value = true;
    try {
      profile.value = await $fetch<Profile>('/api/profile');
      return profile.value;
    } finally {
      pending.value = false;
    }
  }

  async function update(
    patch: Partial<Pick<Profile, 'full_name' | 'avatar_url'>>,
  ) {
    pending.value = true;
    try {
      profile.value = await $fetch<Profile>('/api/profile', {
        method: 'PUT',
        body: patch,
      });
      return profile.value;
    } finally {
      pending.value = false;
    }
  }

  function clear() {
    profile.value = null;
  }

  return { profile, pending, refresh, update, clear };
}
