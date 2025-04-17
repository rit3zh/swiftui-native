type TruncateOptions<T = string> = {
  length: number;
  ellipsis?: T;
  from?: "start" | "middle" | "end";
  preserveWords?: boolean;
  caseSensitive?: boolean;
  trim?: boolean;
};

export function truncate<T extends string | JSX.Element = string>(
  input: T,
  options: TruncateOptions<T>
): T {
  if (typeof input !== "string") return input;

  const {
    length,
    ellipsis = "…" as T,
    from = "end",
    preserveWords = false,
    caseSensitive = true,
    trim = true,
  } = options;

  let str = input as string;
  if (trim) str = str.trim();
  if (!caseSensitive) str = str.toLowerCase();

  if (str.length <= length) return input;

  const truncateWordSafe = (s: string, len: number): string => {
    const regex = new RegExp(`^(.{0,${len}})(\\s|$)`);
    const match = s.match(regex);
    return match ? match[1] : s.slice(0, len);
  };

  switch (from) {
    case "start":
      return (ellipsis +
        (preserveWords
          ? truncateWordSafe(str.slice(-length), length)
          : str.slice(-length))) as T;
    case "middle":
      const half = Math.floor(length / 2);
      const firstPart = preserveWords
        ? truncateWordSafe(str.slice(0, half), half)
        : str.slice(0, half);
      const secondPart = preserveWords
        ? truncateWordSafe(str.slice(-half), half)
        : str.slice(-half);
      return (firstPart + ellipsis + secondPart) as T;
    case "end":
    default:
      return ((preserveWords
        ? truncateWordSafe(str, length)
        : str.slice(0, length)) + ellipsis) as T;
  }
}
