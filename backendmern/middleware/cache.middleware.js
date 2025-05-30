// middleware/cacheMiddleware.js
import cache from './cache.js'; // путь к node-cache

export const cacheMiddleware = (keyGenerator, ttl = 60) => {
  return (req, res, next) => {
    const key = typeof keyGenerator === 'function' ? keyGenerator(req) : keyGenerator;

    const cached = cache.get(key);
    if (cached) {
      console.log(key + ' was taken from cache')
      return res.json(cached);
    }

    // перехватываем res.json и кэшируем ответ
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      let plainData;

      if (Array.isArray(data)) {
    // Если массив, пробежимся и вызовем toObject() для каждого элемента, если он есть
        plainData = data.map(item =>
        typeof item.toObject === 'function' ? item.toObject() : item
        );
    } else {
        plainData = typeof data.toObject === 'function' ? data.toObject() : data;
    }



      cache.set(key, plainData, ttl);
      return originalJson(plainData);
    };

    next();
  };
};
