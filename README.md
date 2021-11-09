自己用的 vue3 组件库

# 下载

`npm i -s sdt3`

# 使用

vue 组件：

在主文件`main.js`中引入并挂载即可

```javascript
import SDT from "sdt3";
app.use(SDT);
```

可以指定只挂载全局组件或全局指令

```javascript
import { Components } from "sdt3";
```

甚至能指定某个组件挂载为全局组件

```javascript
import { RollText } from "sdt3/components";
```

同时还支持在 vue 文件中按需引入

```javascript
import { RollText } from "sdt3/components";
```

函数：

直接指定需要的函数或对象引入

```javascript
import { LimitArray } from "sdt3";
```

# 组件

组件中的颜色通过 css 变量定义，如果要修改部分主题颜色可以通过新建 css 文件指定新的主题色使用，如：

```css
:root {
    --color-text-default: xxx;
}
```

## RollText

将放入的元素滚动

| props    | 说明           |
| -------- | -------------- |
| duration | 设置滚动的周期 |
| type     | 设置滚动方式   |

-   `:type="1"`：默认，进行左到右的无限滚动

-   `:type="2"`：该模式下元素会移动到右边，然后又移动到左边，每次到顶点时暂停两秒

## SliderBox

当该组件出现在屏幕中时才会显示出来

| props     | 说明                                     |
| --------- | ---------------------------------------- |
| duration  | 设置动画时间                             |
| direction | 设置动画方向 支持`top bottom left right` |

## SwitchButton

正常的`switch`

| props   | 说明               |
| ------- | ------------------ |
| v-model | 绑定到组件的布尔值 |

| emits         | 说明                                                                |
| ------------- | ------------------------------------------------------------------- |
| onStatuChange | 当按钮状态改变时触发，接收一个参数表示当前 v-model 参数被改变后的值 |

| slots | 说明             |
| ----- | ---------------- |
| left  | 在按钮左边的组件 |
| right | 在按钮右边的组件 |

设定了`slot`后组件会根据按钮的当前状态修改左右组件的颜色

> 可以通过`:deep(.switchButton)`修改`.chosed .notChosed`来修改被选择的组件的样式
>
> 可以通过修改`.switchButton`下的 css 变量：`--width --height`来修改按钮宽高

## SplitButton

分页按钮

| props       | 说明                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| v-model     | 绑定列表的数组，传入后组件会按照页数将该数组缓存，当重新回到页面时会修改绑定的数组为缓存的数组，如果不传入将不缓存 |
| limit       | 显示的页数按钮数，默认为 7                                                                                         |
| totalPage   | 总页数，必须                                                                                                       |
| currentPage | 初始页码，组件不会修改该值，如果有`vueRouter`的配置，为了保证刷新页面后显示正常，将`query.page`或类似的值绑定上    |

| emits        | 说明                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| onPageChange | 页面改变时触发的函数，接收一个参数表示改变到的页数                                                                      |
| getNewData   | 在页面改变时获得新数据的函数，接收一个参数表示改变到的页数；如果组件绑定了`v-model`，被缓存的页数被点击到不会触发该函数 |

## Message

通过函数调用使用，接收两个参数：text，options

| opions     | 说明                                        |
| ---------- | ------------------------------------------- |
| duration   | 弹框持续时间 如果为零则只能点击关闭         |
| align      | 文字对齐方式 支持`center left` 默认为`left` |
| isCanClose | 是否能点击关闭                              |
| style      | 弹框的自定义样式                            |
| type       | 弹框的内置样式，有`default success error`   |
| onClose    | 弹框关闭时执行的回调                        |

函数也有两个静态方法来快速指定弹框样式，如`Message.success("提示")`

# 指令

## v-fill

该指令会将挂载元素中的元素从左到右按间隔排序，一排排满时换行

## v-hidden

该指令会根据参数 boolen 将挂载元素用`visibility`隐藏

# 函数或工具类

## AsyncConstructor

通过继承该类并在`super()`写入异步操作（必须是箭头函数），该类实例化时将会异步实例`const instence = await new AsyncClass()`

。。。好累 不写了 反正就自己用
