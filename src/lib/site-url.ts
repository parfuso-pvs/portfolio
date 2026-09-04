const absoluteUrlPattern = /^[a-z][a-z\d+.-]*:\/\//i;

export function normalizeSiteUrl(value: string) {
  const trimmedValue = value.trim();
  const absoluteValue = absoluteUrlPattern.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  return new URL(absoluteValue);
}
