import type { ImageMetadata } from 'astro';

// Every .jpg in src/assets/images is available by file name (without extension).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.jpg', { eager: true });

export function photoFor(name: string): ImageMetadata | undefined {
  return files[`../assets/images/${name}.jpg`]?.default;
}

export const hasPhoto = (name: string) => Boolean(photoFor(name));
