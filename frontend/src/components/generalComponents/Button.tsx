import { Pressable, Text } from "react-native";
import buttonStyles from "@/styles/button"

type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "outline"
    | "dangerOutline";

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant: ButtonVariant;
    disabled: boolean;
}

const Button = ({
    title,
    onPress,
    variant = "primary",
    disabled = false,
}: ButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                buttonStyles.button,
                buttonStyles[variant],
                pressed && buttonStyles[`${variant}Pressed`],
                disabled && buttonStyles.disabled,
            ]}>
            <Text style={[buttonStyles.text, buttonStyles[`${variant}Text`]]}>
                {title}
            </Text>
        </Pressable>
    );
};

export default Button