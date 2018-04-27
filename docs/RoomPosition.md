# RoomPosition

房间内的坐标对象

每个在room内占据一格空间的对象都有RoomPosition属性，他描述了对象在房间内的位置以及房间名称

所有在空间距离上的操作，都应该在该对象上进行定义和扩展。

**和空间距离无关的属性和方法不应该挂载其上进行扩展。**

## 扩展

```
raw
room
getAdjacent(range=1)
getRawAdjacent(range=1)
getAccessibleFields(range=1)	获取坐标点为中心，range为半径的正方形范围内不是墙体的坐标对象数据
getRawAccessibleFields(range=1)	
getPositionByDirection(direction) 获取相对于指定坐标对象的指定方向的坐标对象
```

