import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';
import { Text, TouchableOpacity } from 'react-native';

export function KakaoLoginButton() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'unsaidilysb://auth/callback',
      },
    })
    if (error) {
      console.error('Kakao login failed:', error.message);
    } else if (data?.url) {
      Linking.openURL(data.url);
    }
  }

  return (
    <TouchableOpacity
      onPress={handleLogin}
      style={{ backgroundColor: '#FEE500', padding: 12, borderRadius: 8 }}
    >
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>카카오로 로그인</Text>
    </TouchableOpacity>
  )
}