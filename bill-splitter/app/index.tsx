import { useState, useTransition } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import auth from "@react-native-firebase/auth";

import { Text, View } from "@/components/Themed";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    startTransition(() => {
      auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .catch((err: any) => {
          const message =
            err?.code === "auth/invalid-credential"
              ? "Invalid email or password."
              : err?.message || "Unable to sign in.";
          setError(message);
        });
    });
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    startTransition(() => {
      auth()
        .createUserWithEmailAndPassword(email.trim(), password)
        .catch((err: any) => {
          const message =
            err?.code === "auth/email-already-in-use"
              ? "Email is already in use."
              : err?.code === "auth/invalid-email"
                ? "Invalid email address."
                : err?.code === "auth/weak-password"
                  ? "Password should be at least 6 characters."
                  : err?.message || "Unable to sign up.";
          setError(message);
        });
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
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

          <Pressable
            style={styles.primaryButton}
            onPress={handleSignIn}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign in</Text>
            )}
          </Pressable>

          <Pressable
            style={styles.linkButton}
            onPress={handleSignUp}
            disabled={isPending}
          >
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
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  keyboardAvoidingView: {
    width: "100%",
    maxWidth: 420,
  },
  card: {
    width: "100%",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  errorText: {
    color: "#D33A2C",
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#111111",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  linkButton: {
    marginTop: 14,
    alignItems: "center",
  },
  linkText: {
    color: "#111111",
    fontWeight: "600",
  },
});
