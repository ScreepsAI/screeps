# Manager

Manager是一个对象管理器，是游戏中的数据层框架。

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



## 对象类型 - entryClass

Manager在初始化时除了需要指定`entryName`，还需要给定该类entry的基类`entryClass`，

>### 约定 - entryClass
>
>`existCheckKeyArray`		用于对象查重时的校验过程
>
>`modifyKeyArray`			对象的读，写，持久化存储属性名列表



## 对象 - entry

Manager需要指定`entryName`，该name会用来很多场合

如：`post`的Manager名称就会为`PostManger`，并绑定MemoryCacheManager中指定`post`类别的对象。

>### 约定 - 对象id
>
>`UUID`		在add时创建UUID
>
>`raw`		用于持久化缓存与实例化过程，又基类的`modifyKeyArray`属性生成
>
>



### 清理 - clean

不同的Manager管理的对象不同，拥有不同的对象状态。由于screeps的特殊游戏机制，不存在跨tick的callback回调机制，所以我们始终需要检查有哪些对象需要改变状态，甚至需要被清除数据。

###查询 - get

根据查询范围可分为`在Memory中查找`和`在runtime中查找`

后者需要经过实例化，在global时会丢失，在那一个tick会出现在Memory中有而未找到的情况

查询优先级：单帧缓存tick→runtime(hasReboot)→从Memory中实例化

###修改 - modify

对象的修改行为是通过其基类`modifyKeyArray`属性自动生成的接口进行的。




## 缓存 - cache

Manager拥有`固定的持久化缓存（Memory）定义路径/格式`和`运行时缓存路径/格式`

Manager对entry的结构应该是明确的，并拥有该类型对象的三种缓存管理器。

使用MemoryCacheManager，RuntimeCacheManager和TickCacheManager来对自身绑定的对象进行数据操作，是一个容器。

其中MemoryCacheManager就像是一个代理人，Manager通过他可以可以轻松的对绑定的对象类型的数据进行读写，而Manager无需关心和Memory有关的任何事。





