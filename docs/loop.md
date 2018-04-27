# Loop

screeps中一个tick会执行一次所有代码

我们将所有代码的都放在Loop方法内作为一个整体

本项目中loop的结构和流程如下：

```flow
s=>start: Start
e=>end: Next Tick
condHasRoot=>condition: hasRoot?
condHasRooms=>condition: hasRooms?
opReBoot=>subroutine: reboot operation
opMain=>subroutine: main code

s->condHasRooms
condHasRooms(yes)->condHasRoot
condHasRooms(no)->e
condHasRoot(yes)->opMain
condHasRoot(no)->opReBoot
opReBoot->opMain->e
e(left)->condHasRooms
```



