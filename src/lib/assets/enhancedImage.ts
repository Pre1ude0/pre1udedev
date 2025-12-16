export const enhancedImages = import.meta.glob(
    "$lib/assets/**/*.{png,jpg,jpeg,webp,avif}",
    {
        eager: true,
        import: "default",
    },
) as Record<string, string>;
