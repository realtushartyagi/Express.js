const curry = (fn, arity = fn.length) =>
  function curried(...args) {
    return args.length >= arity
      ? fn.apply(this, args)
      : (...more) => curried.apply(this, args.concat(more));
  };

const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

const memoize = (fn, keyResolver = (...args) => JSON.stringify(args)) => {
  const cache = new Map();
  return function (...args) {
    const k = keyResolver(...args);
    if (cache.has(k)) return cache.get(k);
    const result = fn.apply(this, args);
    cache.set(k, result);
    return result;
  };
};
