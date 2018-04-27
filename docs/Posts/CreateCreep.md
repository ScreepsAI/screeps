# CreateCreep - 生产Creep的合同

这份合同描述生产creep的所有相关细节

> ### 约定
>
> #### postType
>
> createCreep
>
> #### entries
>
> spawns
>
> #### status




### 状态表

spawning		creep生产中

idle				闲置，没有需要处理的事务

stuck			spawn周围8格被堵塞，无法生出creep

waiting			等待能量补充

|          | spawning          | idle     | stuck     | waiting          |
| -------- | ----------------- | -------- | --------- | ---------------- |
| spawning |                   | `noPost` | `noSpace` | `noEnoughEnergy` |
| idle     | `hasPost`         |          |           |                  |
| stuck    | `hasSpace`        |          |           |                  |
| waiting  | `hasEnoughEnergy` |          |           |                  |

### 校验函数 - check method

#### spawn

`noSpawn`		没有合适的spawn用于生产creep

`hasSpawn`		有合适的spawn用于生产creep

`noSpace`		spawn周围没有空间生产creep

`hasSpace`		spawn周围有空间生产creep



`hasEnoughEnergy`	拥有足够能量

`noEnoughEnergy`		没有足够能量

#### post

`noPost`			没有需要处理的合同

`hasPost`		有需要处理的合同



### 状态转换函数

1. spawn周围8格内是否有空间生产creep
2. spawn是否有足够的能量用来生产指定body的creep
3. 有没有需要处理的creep生产合同



