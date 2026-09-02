import { Switch } from "./ui/switch";
import { useTheme } from "./ThemeProvider";

export default function LightDarkToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <span className="material-symbols-outlined size-5 text-[18px] text-muted-foreground">
        bedtime
      </span>

      <Switch
        checked={theme === "light"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle light and dark mode"
      />

      <span className="material-symbols-outlined size-5 text-[18px] text-muted-foreground">
        wb_sunny
      </span>
    </div>
  );
}
