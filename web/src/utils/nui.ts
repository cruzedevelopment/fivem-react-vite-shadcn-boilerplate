import type { NuiCallback } from '@/types/fivem';

/**
 * Simple wrapper around fetch API tailored for NUI use
 * @param eventName - The endpoint/event name to target
 * @param data - Data you wish to send in the NUI Callback
 * @param cb - The callback function (optional)
 * @returns
 */
export async function fetchNui<T = any>(
  eventName: string,
  data?: any,
  cb?: NuiCallback
): Promise<T> {
  const resourceName = (window as any).GetParentResourceName 
    ? (window as any).GetParentResourceName() 
    : 'haz-functionality';

  const resp = await fetch(`https://${resourceName}/${eventName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  const respFormatted = await resp.json();

  if (cb) cb(respFormatted);
  
  return respFormatted;
}

/**
 * Simple debounce function to prevent spam
 * @param func - Function to debounce
 * @param wait - Time to wait in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if we're in development mode (not in FiveM)
 */
export function isEnvBrowser(): boolean {
  return !(window as any).invokeNative;
}