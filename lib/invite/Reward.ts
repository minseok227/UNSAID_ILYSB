// lib/invite/claimReward.ts
import { authorizedFetch } from '@/lib/auth/fetcher';
import { API_BASE_URL } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';

export async function claimInviteReward(): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/invite/reward`, {
      method: 'POST',
    })

    const body = await res.json()
    if (!res.ok) {
      console.error(`❌ API /api/invite/reward failed [${res.status}]:`, body)
      return { success: false, error: body?.error || 'Unknown error' }
    }

    return { success: true }
  } catch (err) {
    console.error('❌ claimInviteReward error:', err)
    return { success: false, error: 'Network error' }
  }
}

export function useClaimInviteReward() {
  return useMutation({
    mutationFn: claimInviteReward,
  })
}