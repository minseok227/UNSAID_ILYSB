// lib/fetch/ily.ts
import { API_BASE_URL } from '@/lib/constants'
import { authorizedFetch } from '@/lib/fetcher'

export async function fetchIlyList() {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/ily/list`)
    const body = await res.json()

    if (!res.ok) {
      console.error(`❌ API /api/ily/list failed [${res.status}]:`, body)
      return null
    }

    return body // expected to be IlyRecordNormalized[]
  } catch (err) {
    console.error('❌ Error fetching ILY list:', err)
    return null
  }
}
