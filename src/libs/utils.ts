export function extractExpiryDate(input: string) {
  const regex = /time:[^\s]+/g;

  // Find all matches and take the last one, if any
  const matches = input.match(regex) || [];
  const lastMatch = matches.at(-1); // Use `.at()` for functional elegance

  return lastMatch
    ? {
        before: input.slice(0, input.lastIndexOf(lastMatch)).trim(),
        match: lastMatch,
        after: input
          .slice(input.lastIndexOf(lastMatch) + lastMatch.length)
          .trim(),
      }
    : { before: input, match: undefined, after: "" };
}
