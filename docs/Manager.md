# Manager

Manager是一个对象管理器

Manager管理的对象可以是原生的，如：Spawn，Source

也可以是自定义的，如：Path，Post

Manager作为一个管理器，他的功能为如下几个方面：

1. 管理对象的缓存；
2. 查询对象；
3. 处理对象；


>### 约定
>
>`name`			管理对象名称
>
>`managerName`	管理器名称，使用`name`生成
>
>`cacheName`		管理缓存名称，使用`name`生成
>
>`entries`		管理的对象字典，不唯一
>
>`hasReboot`		状态，表示是否已经重载过



## 对象 - entry

Manager需要指定`entry name`，该name会用来很多场合

如：`post`的Manager名称就会为`PostManger`

>### 约定 - 对象id
>
>`id`		一般为当前毫秒数+2位随机数

### 清理 - clean

不同的Manager管理的对象不同，拥有不同的对象状态。由于screeps的特殊游戏机制，不存在跨tick的callback回调机制，所以我们始终需要检查有哪些对象需要改变状态，甚至需要被清除数据。

###查询 - find

根据查询范围可分为`在Memory中查找`和`在runtime中查找`

后者需要经过实例化，在global时会丢失，在那一个tick会出现在Memory中有而未找到的情况

查询优先级：单帧缓存(tick)→runtime(hasReboot)→从Memory中实例化




## 缓存 - cache

Manager拥有`固定的持久化缓存（Memory）定义路径/格式`和`运行时缓存路径/格式`

### 持久化缓存 Memory

持久化缓存统一使用`entry.id`作为键名在对象字典中存储

>### 约定 - 持久化缓存结构
>
>```javascript
>Memory.Managers[Manager Name] = {
>    ["entry's kind name"]: {
>        [entry id]: {...entryData}
>    },
>}
>```



### 运行时缓存

```javascript
global[Manager Name].entries;
```

### 单帧缓存

有的时候一个特定的对象会在同一个tick内被查询很多次，此时将其缓存起来可以节省不必要的遍历搜索开销

>### 约定 - 单帧缓存结构
>
>```
>Manager[Manager Name].tick = {
>    [entries id] = {...entryData},
>}
>```





### 恢复数据并实例化到 reboot

由于系统基本是依靠runtime缓存上的数据来运行的，所以当runtime被清理后，每个Manager需要由一套自己的Reboot方法以便能够及时恢复数据

