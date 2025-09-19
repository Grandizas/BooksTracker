import { onMounted, onBeforeUnmount, type Ref } from 'vue';

/* Usage example:
  <script setup lang="ts">
  const dropdownRef = ref<HTMLElement|null>(null)
  const panelRef = ref<HTMLElement|null>(null) // if teleported panel
  const isOpen = ref(false)

  useClickOutside(dropdownRef, () => (isOpen.value = false), { ignore: [panelRef] })
</script>
 */

// --------------------------------------------------------------

/**
 * A composable function that detects clicks outside a specified target element
 * and triggers a callback when such clicks occur.
 *
 * @param {Ref<HTMLElement | null>} target - A Vue ref pointing to the target element.
 * @param {(e: Event) => void} callback - A function to be called when a click outside the target is detected.
 * @param {Object} [options] - Optional configuration for the behavior.
 * @param {Array<Ref<HTMLElement | null> | HTMLElement>} [options.ignore] - Elements to ignore when detecting outside clicks.
 * @param {'pointerdown' | 'mousedown' | 'click'} [options.event='pointerdown'] - The event type to listen for.
 */
export function useClickOutside(
  target: Ref<HTMLElement | null>,
  callback: (e: Event) => void,
  options?: {
    ignore?: Array<Ref<HTMLElement | null> | HTMLElement>;
    event?: 'pointerdown' | 'mousedown' | 'click';
  },
) {
  // Determine the event type to listen for, defaulting to 'pointerdown'.
  const event = options?.event ?? 'pointerdown';

  /**
   * Converts a ref or HTMLElement to an HTMLElement, or null if invalid.
   *
   * @param {Ref<HTMLElement | null> | HTMLElement} x - The element or ref to convert.
   * @returns {HTMLElement | null} - The resolved HTMLElement or null.
   */
  const toElement = (
    x: Ref<HTMLElement | null> | HTMLElement,
  ): HTMLElement | null => (isRef(x) ? x.value : (x ?? null));

  /**
   * Event handler that checks if the event target is outside the target element
   * and not in the list of ignored elements. If so, it triggers the callback.
   *
   * @param {Event} e - The event object.
   */
  const handler = (e: Event) => {
    const el = target.value;

    // If the target element is not defined, exit early.
    if (!el) return;

    // Resolve the list of ignored elements.
    const ignores = (options?.ignore ?? [])
      .map(toElement)
      .filter(Boolean) as HTMLElement[];

    const evTarget = e.target as Node | null;

    // Check if the event target is in the ignored elements.
    const isIgnored = ignores.some((ign) => ign.contains(evTarget as Node));

    // Trigger the callback if the event target is outside the target element and not ignored.
    if (!el.contains(evTarget as Node) && !isIgnored) callback(e);
  };

  // Add the event listener when the component is mounted.
  onMounted(() =>
    document.addEventListener(event, handler, { capture: true, passive: true }),
  );

  // Remove the event listener when the component is unmounted.
  onBeforeUnmount(() =>
    document.removeEventListener(event, handler, { capture: true }),
  );
}
