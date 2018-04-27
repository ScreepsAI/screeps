# RuntimeCacheManager - 运行时缓存管理器

用于运行时计算。使用MemoryCacheManager进行初始化。

他的工作方式很简单，就是参与运行时对象的读写。

使用绑定的对象类型和MemoryCacheManager可以进行从memory到对象的实例化。

>### 约定
>
>定义：
>
>`entryName`		需要存储的对象
>
>```javascript
>global[`${entryName}s`] = {
>    ...
>    [entryUUID] = {...entryData},
>    ...
>}
>```
>
>不论是不是原生的对象，都使用自定义的唯一UUID用于存储

### add

添加的对象必须要有UUID和raw