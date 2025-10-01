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


const withTimeout = (p, ms, message = 'Timeout') =>
  Promise.race([
    p,
    new Promise((_, rej) => setTimeout(() => rej(new Error(message)), ms)),
  ]);

const cancellableFetch = (url, opts = {}) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = fetch(url, { ...opts, signal });
  return { promise, cancel: () => controller.abort() };
};

const retry = async (fn, attempts = 3, delay = 200, backoff = 2) => {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= attempts) throw err;
      await new Promise((res) => setTimeout(res, delay));
      delay *= backoff;
    }
  }
};
