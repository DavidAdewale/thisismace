const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_content", "utm_term"] as const;

export function campaignAttribution(read: (key: string) => unknown) {
  const result: Record<string, string> = {};
  for (const key of keys) {
    const value = read(key);
    if (typeof value === "string" && /^[a-z0-9][a-z0-9 _-]{0,79}$/i.test(value) &&
        !/\d{7,}/.test(value)) result[key] = value;
  }
  return result;
}
