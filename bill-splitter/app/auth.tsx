import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Text, View } from '@/components/Themed';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (err: any) {
      const message =
        err?.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : err?.message || 'Unable to sign in.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" enabled>          
        <View style={styles.card}>
          <Text style={styles.title}>Bill Splitter</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#8C8C8C"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            placeholder="Password"
            placeholderTextColor="#8C8C8C"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.primaryButton} onPress={handleSignIn} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign in</Text>
            )}
          </Pressable>

          <Pressable style={styles.linkButton}>
            <Text style={styles.linkText}>Create an account</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
  },
  primaryButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  linkText: {
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#C62828',
    fontSize: 13,
  },
});
