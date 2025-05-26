import InviteModal from '@/components/invite/invite'
import IlyCardList from '@/components/main/IlycardList'
import { InlineSearchStepInput } from '@/components/main/InlineSearchInput'
import { SearchedUserCard } from '@/components/main/SearchedUserCard'
import { SendIlyModal } from '@/components/main/SendIlyModal'
import { SendIlysbModal } from '@/components/main/SendIlysbModal'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View } from 'react-native'

  type UserResult = {
    id: string
    name: string
    instagram_username: string
    isIlysb?: boolean
    daysToSb?: number
    daysToExpire?: number
  }

  export default function MainTab() {
    const [searchedUser, setSearchedUser] = useState<UserResult | null>(null)
    const [showIlyModal, setShowIlyModal] = useState(false)
    const [showIlysbModal, setShowIlysbModal] = useState(false)
    const [inviteVisible, setInviteVisible] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    const openModal = useCallback((user: UserResult) => {
      setSearchedUser(user)
      const isEligibleForIlysb = user.daysToSb !== undefined && user.daysToSb <= 0 && !user.isIlysb
      setShowIlysbModal(isEligibleForIlysb)
      setShowIlyModal(!isEligibleForIlysb)
    }, [])

    const handleSearchResult = useCallback((user: UserResult | null) => {
      setSearchedUser(user)
      setInviteVisible(user === null)
      if (user) openModal(user)
    }, [openModal])

    const handleSuccess = () => {
      setShowIlyModal(false)
      setShowIlysbModal(false)
      setSearchedUser(null)
      setRefreshKey(prev => prev + 1)
    }

    useFocusEffect(
      useCallback(() => {
        setInviteVisible(false)
        setSearchedUser(null)
        setShowIlyModal(false)
        setShowIlysbModal(false)
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

        {searchedUser && !showIlyModal && !showIlysbModal && (
          <SearchedUserCard user={searchedUser} onSend={() => openModal(searchedUser)} />
        )}

        <IlyCardList key={refreshKey} onSend={openModal} />

        {searchedUser && showIlyModal && (
          <SendIlyModal
            visible
            user={searchedUser}
            onCancel={() => setShowIlyModal(false)}
            onConfirmSuccess={handleSuccess}
          />
        )}

        {searchedUser && showIlysbModal && (
          <SendIlysbModal
            visible
            user={searchedUser}
            onCancel={() => setShowIlysbModal(false)}
            onConfirmSuccess={handleSuccess}
          />
        )}
      </View>
    )
  }