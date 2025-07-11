import { useLayoutEffect, useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { computed, effect, untracked } from '@dnd-kit/state';
import { flushSync } from 'react-dom';
import { currentValue } from '@dnd-kit/react/utilities';

function useConstant(initializer) {
  const ref = useRef(null);
  if (!ref.current) {
    ref.current = initializer();
  }
  return ref.current;
}
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
function useForceUpdate() {
  const setState = useState(0)[1];
  return useCallback(() => {
    setState((value) => value + 1);
  }, [setState]);
}

// src/hooks/useSignal.ts
function useSignal(signal, sync = false) {
  const previous = useRef(signal.peek());
  const read = useRef(false);
  const forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(
    () => effect(() => {
      const previousValue = previous.current;
      const currentValue2 = signal.value;
      if (previousValue !== currentValue2) {
        previous.current = currentValue2;
        if (!read.current) return;
        if (sync) {
          flushSync(forceUpdate);
        } else {
          forceUpdate();
        }
      }
    }),
    [signal, sync, forceUpdate]
  );
  return {
    get value() {
      read.current = true;
      return signal.peek();
    }
  };
}

// src/hooks/useComputed.ts
function useComputed(compute, dependencies = [], sync = false) {
  const $compute = useRef(compute);
  $compute.current = compute;
  return useSignal(
    useMemo(() => computed(() => $compute.current()), dependencies),
    sync
  );
}
function useDeepSignal(target, synchronous) {
  const tracked = useRef(/* @__PURE__ */ new Map());
  const forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(() => {
    if (!target) {
      tracked.current.clear();
      return;
    }
    return effect(() => {
      var _a;
      let stale = false;
      let sync = false;
      for (const entry of tracked.current) {
        const [key] = entry;
        const value = untracked(() => entry[1]);
        const latestValue = target[key];
        if (value !== latestValue) {
          stale = true;
          tracked.current.set(key, latestValue);
          sync = (_a = synchronous == null ? void 0 : synchronous(key, value, latestValue)) != null ? _a : false;
        }
      }
      if (stale) {
        sync ? flushSync(forceUpdate) : forceUpdate();
      }
    });
  }, [target]);
  return useMemo(
    () => target ? new Proxy(target, {
      get(target2, key) {
        const value = target2[key];
        tracked.current.set(key, value);
        return value;
      }
    }) : target,
    [target]
  );
}

// src/hooks/useImmediateEffect.ts
function useImmediateEffect(callback, _) {
  callback();
}
function useLatest(value) {
  const valueRef = useRef(value);
  useIsomorphicLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);
  return valueRef;
}
function useOnValueChange(value, onChange, effect3 = useEffect, compare = Object.is) {
  const tracked = useRef(value);
  effect3(() => {
    const oldValue = tracked.current;
    if (!compare(value, oldValue)) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [onChange, value]);
}
function useOnElementChange(value, onChange) {
  const previous = useRef(currentValue(value));
  useIsomorphicLayoutEffect(() => {
    const current = currentValue(value);
    if (current !== previous.current) {
      previous.current = current;
      onChange(current);
    }
  });
}

export { useComputed, useConstant, useDeepSignal, useImmediateEffect, useIsomorphicLayoutEffect, useLatest, useOnElementChange, useOnValueChange };
//# sourceMappingURL=hooks.js.map
//# sourceMappingURL=hooks.js.map