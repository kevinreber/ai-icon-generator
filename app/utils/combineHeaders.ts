/**
 * Combine multiple header objects into one (uses append so headers are not overridden)
 */
export const combineHeaders = (
  ...headers: Array<ResponseInit["headers"] | null>
) => {
  const combined = new Headers();
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value);
    }
  }
  return combined;
};
