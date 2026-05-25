export const enhancedImages = (() => {
  const raw = import.meta.glob("$lib/assets/**/*.{png,jpg,jpeg,webp,avif}", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const byFilename = Object.fromEntries(
    Object.entries(raw).map(([fullPath, value]) => {
      const parts = fullPath.split("/");
      const filename = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
      return [filename, value];
    }),
  ) as Record<string, string>;

  const byFilenameIncludingRoot = Object.fromEntries(
    Object.entries(raw).flatMap(([fullPath, value]) => {
      const parts = fullPath.split("/");
      const leaf = parts[parts.length - 1];
      const dir = parts[parts.length - 2];

      return [
        [`${leaf}`, value],
        [leaf, value],
      ];
    }),
  ) as Record<string, string>;

  Object.assign(byFilename, byFilenameIncludingRoot);

  return byFilename;
})();
