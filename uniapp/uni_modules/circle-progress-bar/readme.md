# circle-progress-bar
### 使用说明

---

注册组件后直接使用，在 `<!-- content -->` 处写中心内容，比如进度百分比。

```html
<circle-progress-bar :pro="pro">
	<!-- content -->
</circle-progress-bar>
```

### 参数说明

---

| 参数              | 类型    | 默认值  | 描述                |
| ----------------- | ------- | ------- | -------------------|
| pro               | Number  | 0       | 进度百分比 0-1      |
| start             | Number  | 0       | 起始角度 0-1        |
| size              | Number  | 100     | 组件大小(单位rpx)   |
| border_width      | Number  | 5       | 进度条宽度(单位rpx) |
| border_color      | String  | #07C160 | 进度条颜色          |
| border_back_color | String  | #DDD    | 进度条背景色        |
| background        | String  | #FFF    | 中心内容背景色      |
| unit        		| String  | rpx    	| 大小单位			 |
| animate           | Boolean | true    | 是否启用动画        |
