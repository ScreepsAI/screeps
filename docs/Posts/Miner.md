# MinerPost - 矿工合同

这份合同描述矿工任务的所有细节

合同继承自基本合同对象Post

>### 约定
>
>#### postType
>
>miner
>
>####entries
>
>creeps
>
>sources
>
>####status



### 状态表

toSource		移动到资源

toContainer		移动到容器

Heavest			收获/采集

Transfer			将资源倒入容器

idle				闲置

|             | toSource | toContainer             | Heavest      | Transfer        | idle          |
| ----------- | ---------------------- | ----------------------- | ------------ | --------------- | ------------- |
| toSource    |                        | `notEmpty`              | `nearSource` |                 | `noSource`    |
| toContainer | `isEmpty`              |                         |              | `nearContainer` | `noContainer` |
| Heavest     | `exhausted`            | `isFull`                |              |                 |               |
| Transfer    | `isEmpty`              | `noSpace`               |              |                 |               |
| idle        | `hasSource` `isEmpty`  | `hasContainer` `isFull` |              |                 |               |

### 校验函数 - check method

#### creep

`isEmpty`		背包已经清空

`isFull`			背包已经满了

`notEmpty`		背包没有清空

`nearSource`		已经到达资源

`nearContainer`	已经到达容器

#### Source

`exhausted`		资源已经枯竭

`noSource`		没有合适的资源点

`hasSource`		有合适的资源点

#### Container

`noSpace`		容器没有空间

`noContainer`	没有合适的容器

`hasContainer`	有合适的容器