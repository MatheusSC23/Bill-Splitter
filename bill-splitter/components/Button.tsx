import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import { Text } from "@/components/Themed";

type ButtonVariant = "primary" | "link";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftAccessory?: ReactNode;
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftAccessory,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.link,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#FFFFFF" : "#111111"} />
      ) : (
        <>
          {leftAccessory}
          <Text
            style={[
              styles.baseText,
              variant === "primary" ? styles.primaryText : styles.linkText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#111111",
    borderRadius: 12,
    paddingVertical: 12,
  },
  link: {
    paddingVertical: 10,
  },
  disabled: {
    opacity: 0.7,
  },
  baseText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  linkText: {
    color: "#111111",
  },
});
