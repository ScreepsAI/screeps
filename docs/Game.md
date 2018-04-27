#ScreepsAI

通过代码操控creep和各种设施进行游戏

使用每tick执行代码的方式推进游戏

##要素说明

###global	

`global`全局变量，可以当做运行时环境，凡是他的成员或方法都可以在游戏内直接调用，类似浏览器中的window变量。

`global`会在每天0点或代码更新的时候被清空（还原）。

#### 运行时环境被还原

`hasRoot`，`hasRoom`

用`hasRoot`变量来判断是否被还原，不存在或为false的时候执行一遍全局`init`方法，重新挂载需要的扩展和方法。

```flow
s=>start: Start
e=>end: Next Tick
Loop=>subroutine: Loop:>./Loop.md

s(right)->Loop(right)->e
e(right)->Loop
```



### Cache → [Link](./cache.md)

### Clock → [Link](./Clock.md)



###扩展约定

每个实例化对象都有`UUID`，`raw`属性。

每个基类都用`existCheckKeyArray`属性。

####UUID 

UUID使用两个 0-9 a-Z的36进制字符串组成，前为随机变量，后为时间戳。所有实例化对象都有

####raw

字面量对象，即嵌套的属性中，最终都是字面量，不存在循环引用。用于存储在Memory中，也用来进行对象实例化。所有实例化对象都有。

**仅输出用于实例化的属性，或者需要用于恢复实例化的属性**

####existCheckKeyArray

字符串数组，用于校验对象的在管理器字典中是否已经存在，字符串表示对象的属性名。所有实例化对象的基类都有。





[#reboot](./reboot.md)

