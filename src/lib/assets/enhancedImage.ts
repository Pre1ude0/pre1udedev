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

  return byFilename;
})();
