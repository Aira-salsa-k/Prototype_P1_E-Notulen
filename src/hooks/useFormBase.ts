import { useEffect, useState, useCallback} from "react";

export function useFormBase<T>({
  initialData,
  isOpen,
  defaultData,
}: {
  initialData?: T;
  isOpen: boolean;
  defaultData: T;
}) {
  const [data, setData] = useState<T>(initialData ?? defaultData);

  useEffect(() => {
    if (isOpen) {
      setData(initialData ?? defaultData);
    }
  }, [isOpen, initialData, defaultData]);

  const update = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const reset = useCallback(() => {
    setData(initialData ?? defaultData);
  }, [initialData, defaultData]);

  return { data, update, reset, setData };
}
