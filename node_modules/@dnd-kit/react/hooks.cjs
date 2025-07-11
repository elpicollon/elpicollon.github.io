'use strict';

var react = require('react');
var state = require('@dnd-kit/state');
var reactDom = require('react-dom');
var utilities = require('@dnd-kit/react/utilities');

function useConstant(initializer) {
  const ref = react.useRef(null);
  if (!ref.current) {
    ref.current = initializer();
  }
  return ref.current;
}
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var useIsomorphicLayoutEffect = canUseDOM ? react.useLayoutEffect : react.useEffect;
function useForceUpdate() {
  const setState = react.useState(0)[1];
  return react.useCallback(() => {
    setState((value) => value + 1);
  }, [setState]);
}

// src/hooks/useSignal.ts
function useSignal(signal, sync = false) {
  const previous = react.useRef(signal.peek());
  const read = react.useRef(false);
  const forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(
    () => state.effect(() => {
      const previousValue = previous.current;
      const currentValue2 = signal.value;
      if (previousValue !== currentValue2) {
        previous.current = currentValue2;
        if (!read.current) return;
        if (sync) {
          reactDom.flushSync(forceUpdate);
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
  const $compute = react.useRef(compute);
  $compute.current = compute;
  return useSignal(
    react.useMemo(() => state.computed(() => $compute.current()), dependencies),
    sync
  );
}
function useDeepSignal(target, synchronous) {
  const tracked = react.useRef(/* @__PURE__ */ new Map());
  const forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(() => {
    if (!target) {
      tracked.current.clear();
      return;
    }
    return state.effect(() => {
      var _a;
      let stale = false;
      let sync = false;
      for (const entry of tracked.current) {
        const [key] = entry;
        const value = state.untracked(() => entry[1]);
        const latestValue = target[key];
        if (value !== latestValue) {
          stale = true;
          tracked.current.set(key, latestValue);
          sync = (_a = synchronous == null ? void 0 : synchronous(key, value, latestValue)) != null ? _a : false;
        }
      }
      if (stale) {
        sync ? reactDom.flushSync(forceUpdate) : forceUpdate();
      }
    });
  }, [target]);
  return react.useMemo(
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
  const valueRef = react.useRef(value);
  useIsomorphicLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);
  return valueRef;
}
function useOnValueChange(value, onChange, effect3 = react.useEffect, compare = Object.is) {
  const tracked = react.useRef(value);
  effect3(() => {
    const oldValue = tracked.current;
    if (!compare(value, oldValue)) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [onChange, value]);
}
function useOnElementChange(value, onChange) {
  const previous = react.useRef(utilities.currentValue(value));
  useIsomorphicLayoutEffect(() => {
    const current = utilities.currentValue(value);
    if (current !== previous.current) {
      previous.current = current;
      onChange(current);
    }
  });
}

exports.useComputed = useComputed;
exports.useConstant = useConstant;
exports.useDeepSignal = useDeepSignal;
exports.useImmediateEffect = useImmediateEffect;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
exports.useLatest = useLatest;
exports.useOnElementChange = useOnElementChange;
exports.useOnValueChange = useOnValueChange;
//# sourceMappingURL=hooks.cjs.map
//# sourceMappingURL=hooks.cjs.map