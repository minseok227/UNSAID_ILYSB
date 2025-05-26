// lib/fetch/useIlyList.ts
import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

export async function fetchIlyList() {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/ily/list`)
    const body = await res.json()

    if (!res.ok) {
      console.error(`❌ API /api/ily/list failed [${res.status}]:`, body)
      throw new Error(body?.error || 'Failed to fetch ILY list')
    }

    return body // expected to be IlyRecordNormalized[]
  } catch (err) {
    console.error('❌ Error fetching ILY list:', err)
    throw err
  }
}

export function useIlyList() {
  return useQuery({
    queryKey: ['ilyList'],
    queryFn: fetchIlyList,
    staleTime: 1000 * 60 * 3, // 3분 캐싱
    retry: 1,
  })
}