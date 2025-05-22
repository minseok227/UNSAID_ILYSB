import { InviteCard } from '@/components/invite/invite'
import { IlyCardList } from '@/components/main/IlyCard'
import { InlineSearchStepInput } from '@/components/main/InlineSearchInput'
import { SearchedUserCard } from '@/components/main/SearchedUserCard'
import { SendIlyModal } from '@/components/main/SendIlyModal'
import { useState } from 'react'
import { View } from 'react-native'

type UserResult = {
  id: string
  name: string
  instagram_username: string
}

export default function MainTab() {
  const [searchedUser, setSearchedUser] = useState<UserResult | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchAttempted, setSearchAttempted] = useState(false)

  const handleSearchResult = (user: UserResult | null) => {
    setSearchedUser(user)
    setSearchAttempted(true)
    if (user) setShowModal(true)
  }

  const handleIlySendSuccess = () => {
    setShowModal(false)
    setSearchedUser(null)
    setRefreshKey((prev) => prev + 1) // 리스트 강제 리렌더링
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32, backgroundColor: '#FFFCF5' }}>
      <InlineSearchStepInput onResult={handleSearchResult} />

      {searchedUser && !showModal && (
        <SearchedUserCard user={searchedUser} onSend={() => setShowModal(true)} />
      )}

      {searchedUser === null && searchAttempted && <InviteCard />}

      <IlyCardList key={refreshKey} />

      {searchedUser && (
        <SendIlyModal
          visible={showModal}
          user={searchedUser}
          onCancel={() => setShowModal(false)}
          onConfirmSuccess={handleIlySendSuccess}
        />
      )}
    </View>
  )
}