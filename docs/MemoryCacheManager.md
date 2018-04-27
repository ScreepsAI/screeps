# MemoryCacheManager - 持久缓存管理器

持久缓存管理器用于管理各类对象的字面值数据。

一般用于实例化runtime下的对象。

其工作方式也很简单，仅为对对象的读写删操作，重要的是他对持久化数据管理的约定

>### 约定
>
>定义：
>
>`entryName`		需要存储的对象
>
>```javascript
>Memory[`${entryName}s`] = {
>    ...
>    [entryUUID] = {...entryRawData},
>    ...
>}
>```
>不论是不是原生的对象，都使用自定义的唯一UUID用于存储
>
>```
>entryName			管理器管理的对象名
>existCheckKeyArray		对象查重时比较的key数组
>MemoryCacheManager(entryName, existCheckKeyArray)
>```
>
>


