export default function () {
  return {
    resolveColor: (color: string) => {
      const colorScheme: {
        background: string;
        foreground: string;
        border: string;
      } = {
        background: "bg-stone-50/10",
        foreground: "text-white",
        border: "border-white",
      };

      switch (color) {
        case "primary":
          colorScheme.background = "bg-primary/5";
          colorScheme.foreground = "text-primary";
          colorScheme.border = "border-primary";
          break;
        case "secondary":
          colorScheme.background = "bg-secondary/5";
          colorScheme.foreground = "text-secondary";
          colorScheme.border = "border-secondary";
          break;
        case "success":
          colorScheme.background = "bg-success/5";
          colorScheme.foreground = "text-success";
          colorScheme.border = "border-success";
          break;
        case "warning":
          colorScheme.background = "bg-warning/5";
          colorScheme.foreground = "text-warning";
          colorScheme.border = "border-warning";
          break;
        case "error":
          colorScheme.background = "bg-error/5";
          colorScheme.foreground = "text-error";
          colorScheme.border = "border-error";
          break;
        case "info":
          colorScheme.background = "bg-info/5";
          colorScheme.foreground = "text-info";
          colorScheme.border = "border-info";
          break;

        default:
          break;
      }

      return colorScheme;
    },
  };
}
