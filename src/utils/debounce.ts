export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  fn: F,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
