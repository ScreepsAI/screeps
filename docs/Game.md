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
condHasRoot=>condition: hasRoot?
condHasRooms=>condition: hasRooms?
opReBoot=>subroutine: reboot operation
opLoopCode=>subroutine: loop code

s->condHasRooms(yes)->condHasRoot
condHasRooms(no)->e
condHasRoot(yes,bottom)->opLoopCode->e
condHasRoot(no)->opReBoot(bottom)->opLoopCode->e(left)
e(left)->condHasRooms
```



### Cache → [Link](./cache.md)

### Clock → [Link](./Clock.md)





[#reboot](./reboot.md)

