自己用的 vue3 组件库
vue2 暂时没有打包发布，可以进 vue2 文件夹用源码

## 下载

`npm i -s sdt3`

## 挂载

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

## 使用

### 组件

#### RollText

将放入的元素滚动

| props    | 说明           |
| -------- | -------------- |
| duration | 设置滚动的周期 |
| type     | 设置滚动方式 |

- `:type="1"`：默认，进行左到右的无限滚动

- `:type="2"`：该模式下元素会移动到右边，然后又移动到左边，每次到顶点时暂停两秒

#### SliderBox

当该组件出现在屏幕中时才会显示出来

| props     | 说明                                     |
| --------- | ---------------------------------------- |
| duration  | 设置动画时间                             |
| direction | 设置动画方向 支持`top bottom left right` |

#### Message

通过函数调用使用，接收两个参数：text，options

| options    | 说明                                        |
| ---------- | ------------------------------------------- |
| duration   | 弹框持续时间 如果为零则只能点击关闭         |
| align      | 文字对齐方式 支持`center left` 默认为`left` |
| isCanClose | 是否能点击关闭                              |
| style      | 弹框的自定义样式                            |
| type       | 弹框的内置样式，有`default success error`   |
| onClose    | 弹框关闭时执行的回调                        |

函数也有两个静态方法来快速指定弹框样式，如`Message.success("提示")`

### 指令

#### v-fill

该指令会将挂载元素中的元素从左到右按间隔排序，一排排满时换行

### 函数或工具类

#### AsyncConstructor

通过继承该类并在`super()`写入异步操作，该类实例化时将会异步实例`const instence = await new AsyncClass()`

。。。好累 不写了 反正就自己用
