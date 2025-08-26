import { Text, View } from "@/components/Themed";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";
import { useAppTheme } from "@/components/theme/ThemeContext";

export default function PaymentTrackingScreen() {
    const { theme } = useAppTheme();
    return (
        <ScreenWrapper title="Payment Tracking" theme={theme}>
            <View>
                <Text>Payment Tracking Screen</Text>
            </View>
        </ScreenWrapper>
    );
}