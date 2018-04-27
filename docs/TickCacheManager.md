#TickCacheManager - 单帧缓存管理器

单帧缓存管理器不是一个全局对象。

他用在需要做单帧缓存的场景下（如：post单帧缓存），适时创建和销毁。

单帧缓存的工作方式很简单，其重要的部分是对缓存读写的约定

>### 约定
>
>```javascript
>global.tickCache = { // 写地址
>    ...
>    [cache object UUID]: {...cacheData},
>    ...
>}
>```
>在写的同时记录Game.time
>
>在读的同时判断判断是否为当前time，若不是则销毁并返回undefined



