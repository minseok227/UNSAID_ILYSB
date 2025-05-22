import { API_BASE_URL } from '@/lib/constants'
import { authorizedFetch } from '@/lib/fetcher'

export async function fetchSearchedUser(name: string, username: string) {
  try {
    const query = `name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}`

    const res = await authorizedFetch(`${API_BASE_URL}/api/user/search?${query}`)
    const body = await res.json()

    if (!res.ok) {
      console.error(`❌ API /api/user/search failed [${res.status}]:`, body)
      return null
    }

    if (!body.found) {
      return null
    }

    return body.user as {
      id: string
      name: string
      instagram_username: string
    }
  } catch (err) {
    console.error('❌ Error searching user:', err)
    return null
  }
}