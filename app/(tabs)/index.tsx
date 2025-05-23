import InviteModal from '@/components/invite/invite'
import { IlyCardList } from '@/components/main/IlyCard'
import { InlineSearchStepInput } from '@/components/main/InlineSearchInput'
import { SearchedUserCard } from '@/components/main/SearchedUserCard'
import { SendIlyModal } from '@/components/main/SendIlyModal'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
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
  const [inviteVisible, setInviteVisible] = useState(false)

  const handleSearchResult = (user: UserResult | null) => {
    setSearchedUser(user)
    setInviteVisible(user === null)
    if (user) setShowModal(true)
  }

  const handleIlySendSuccess = () => {
    setShowModal(false)
    setSearchedUser(null)
    setRefreshKey((prev) => prev + 1)
  }

  useFocusEffect(
    useCallback(() => {
      setInviteVisible(false)
      setSearchedUser(null)
      setShowModal(false)
    }, [])
  )

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32, backgroundColor: '#FFFCF5' }}>
      <InlineSearchStepInput onResult={handleSearchResult} />

      {inviteVisible && (
        <View style={{ marginTop: 12 }}>
          <InviteModal visible={inviteVisible} onClose={() => setInviteVisible(false)} />
        </View>
      )}

      {searchedUser && !showModal && (
        <SearchedUserCard user={searchedUser} onSend={() => setShowModal(true)} />
      )}

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