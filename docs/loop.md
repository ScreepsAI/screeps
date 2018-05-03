# Loop

screeps中一个tick会执行一次所有代码

我们将所有代码的都放在Loop方法内作为一个整体

本项目中loop的结构和流程如下：

```flow
s=>start: Start
e=>end: Next Tick
condHasRoot=>condition: hasRoot?
opReBoot=>subroutine: reboot operation
opMain=>subroutine: main code

s->condHasRoot
condHasRoot(yes)->opMain
condHasRoot(no)->opReBoot
opReBoot->opMain->e
e(left)->condHasRooms
```

## newRooms？

很有可能，你会被打的一个占领的房间都不剩，然后你respawn了，那么你就需要重新分析房间内的情况，并加以缓存。待编辑。

## hasRoot？



## Reboot



## Main code



