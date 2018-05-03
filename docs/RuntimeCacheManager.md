# RuntimeCacheManager - 运行时缓存管理器

用于运行时计算。使用MemoryCacheManager进行初始化。

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

### add()

添加的对象必须要有UUID和raw



### 恢复数据并实例化到 reboot

系统依靠runtime缓存上的数据来运行，当runtime被清理后，每个Manager需要由一套自己的Reboot方法以便能够及时恢复数据