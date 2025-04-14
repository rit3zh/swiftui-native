/**
 * Converts a JavaScript Date into a Swift-friendly ISO8601 string
 * without milliseconds (e.g., "2020-12-04T00:00:00Z")
 */
export function toSwiftDate(input: Date | string): string {
  if (input instanceof Date) {
    return new Date(
      Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate())
    )
      .toISOString()
      .replace(/\.\d{3}Z$/, "Z");
  }

  const cleaned = input.trim().replace(/[^0-9a-zA-Z]/g, "-");
  const parts = cleaned.split("-").filter(Boolean);

  let year = 1970;
  let month = 0;
  let day = 1;

  if (parts.length === 3) {
    if (parts[0].length === 4) {
      year = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1;
      day = parseInt(parts[2]) + 1;
    } else if (parts[2].length === 4) {
      year = parseInt(parts[2]);
      month = parseInt(parts[1]) - 1;
      day = parseInt(parts[0]);
    }
  }

  const utc = new Date(Date.UTC(year, month, day));
  return utc.toISOString().replace(/\.\d{3}Z$/, "Z");
}
