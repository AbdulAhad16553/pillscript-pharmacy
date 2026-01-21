export const formatDOB = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
  });
};

export const copyToClipboard = async (
  value: string,
  setCopiedKey: (key: string | null) => void,
  key: string,
  timeout = 1500
) => {
  try {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), timeout);
  } catch (err) {
    console.error("Copy failed", err);
  }
};
