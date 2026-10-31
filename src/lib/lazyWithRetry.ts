import { lazy, type ComponentType } from 'react';

/**
 * Robust lazy-loading wrapper with retry logic and version-change automatic reload.
 * If a deployment updates chunk hashes on GitHub Pages and a cached client requests
 * an old chunk (resulting in 'Failed to fetch dynamically imported module'),
 * this catches the failure, checks if a force-reload has been attempted, and smoothly
 * reloads the page to obtain the latest index.html and chunk manifest.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T } | Record<string, any>>,
  exportName: string = 'default'
) {
  return lazy(async () => {
    const storageKey = `retry_chunk_${exportName}`;
    const hasReloaded = typeof window !== 'undefined' ? window.sessionStorage.getItem(storageKey) : null;

    try {
      const module = await factory();
      if (hasReloaded && typeof window !== 'undefined') {
        window.sessionStorage.removeItem(storageKey);
      }
      if (module && typeof module === 'object' && exportName in module) {
        return { default: module[exportName] as T };
      }
      if (module && typeof module === 'object' && 'default' in module) {
        return { default: module.default as T };
      }
      return { default: module as unknown as T };
    } catch (error: any) {
      console.warn(`Dynamic import for [${exportName}] failed:`, error?.message || error);

      // Check if it's a chunk loading failure or network hiccup
      const isChunkError =
        error?.message?.includes('Failed to fetch') ||
        error?.message?.includes('dynamically imported module') ||
        error?.name === 'ChunkLoadError' ||
        error?.message?.includes('Importing a module script failed');

      if (isChunkError && typeof window !== 'undefined' && !hasReloaded) {
        window.sessionStorage.setItem(storageKey, 'true');
        window.location.reload();
        // Return dummy component while page reloads
        return { default: (() => null) as unknown as T };
      }

      // If we already tried reloading or it's another error, throw for ErrorBoundary
      throw error;
    }
  });
}

