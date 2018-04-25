本文描述`reboot`流程

```flow
start=>start: Start
end=>end: End
loadConfig=>subroutine: load config
loadPrototypes=>subroutine: load prototypes
loadGlobalObject=>subroutine: load Global Object

initManager=>subroutine: init Managers

start->loadConfig
loadConfig->loadPrototypes->loadGlobalObject->initManager
initManager->end
```

# Config

> ###全局配置 - global成员
>
> `USERNAME`		用户名
>
> `SIGN_MESSAGE`	sign信息
>
> `WHITE_LIST`		好友名单
>
> `LOG_EMOJI`		是否允许输出emoji表情
>
> `LOG_LEVEL`		日志输出级别



# Prototypes

