import { Input } from "@heroui/react";

export function AppInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      radius="md"
      classNames={{
        inputWrapper: "border-border focus-within:border-primary",
      }}
      {...props}
    />
  );
}
