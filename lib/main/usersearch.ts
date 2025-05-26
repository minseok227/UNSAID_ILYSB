// lib/fetch/useSearchUser.ts
import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

export async function fetchSearchedUser(name: string, username: string) {
  const query = `name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}`
  const res = await authorizedFetch(`${API_BASE_URL}/api/user/search?${query}`)
  const body = await res.json()

  if (!res.ok) {
    console.error(`❌ API /api/user/search failed [${res.status}]:`, body)
    throw new Error('사용자 검색 실패')
  }

  if (!body.found) return null

  return body.user as {
    id: string
    name: string
    instagram_username: string
  }
}

export function useSearchUser(name: string, username: string, enabled: boolean) {
  return useQuery({
    queryKey: ['searchUser', name, username],
    queryFn: () => fetchSearchedUser(name, username),
    enabled,
    staleTime: 1000 * 10, // 10초 간 캐싱 (선택)
  })
}