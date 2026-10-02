import { GoeyToaster } from "goey-toast";
import { useTheme } from "../../hooks/useTheme";

export default function ToastManager() {
  const { isDarkMode } = useTheme();

  return (
    <GoeyToaster
      position="top-right"
      theme={isDarkMode ? "dark" : "light"}
      richColors
      closeButton
      duration={4000}
    />
  );
}
