// composables/useResendCooldown.ts
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export function useResendCooldown(
  key = 'resendCooldownAt',
  defaultSeconds = 60,
) {
  // useState keeps value across the same route/component tree in Nuxt; ref also fine
  const countdown = ref(0);
  let timer: ReturnType<typeof setTimeout> | null = null;

  const isCoolingDown = computed(() => countdown.value > 0);

  function stopTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function tick() {
    if (!import.meta.client) return;
    const until = Number(localStorage.getItem(key) || 0);
    const left = Math.max(0, Math.ceil((until - Date.now()) / 1000));
    countdown.value = left;

    if (left > 0) {
      stopTimer();
      timer = setTimeout(tick, 1000);
    } else {
      stopTimer();
      localStorage.removeItem(key);
    }
  }

  function start(seconds = defaultSeconds) {
    if (!import.meta.client) return;
    localStorage.setItem(key, String(Date.now() + seconds * 1000));
    tick();
  }

  // optional: cancel only clears timer; doesn't erase storage by default
  function cancel() {
    stopTimer();
  }

  // optional: hard reset (clears storage too)
  function reset() {
    if (!import.meta.client) return;
    stopTimer();
    localStorage.removeItem(key);
    countdown.value = 0;
  }

  onMounted(() => {
    // restore existing cooldown (if user refreshed)
    tick();
  });

  onBeforeUnmount(() => {
    // avoid stray timers when component unmounts
    stopTimer();
  });

  return { countdown, isCoolingDown, start, cancel, reset };
}
