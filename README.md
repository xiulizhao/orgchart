# orgchart
组织结构图用于制作、展示多层级信息结构图<br>
<img src="http://www.wware.org/img/orgchart.jpg?_c208" width="600px"><br>
普通属性<br>
data-addparent	JSON字符串数据,可设置初始显示的数据结构	{name:总经理,title:姓名,info:总经理描述}<br>
data-orgid	给元素设置一个id，默认id='chart-container',并填写此处，例如#abc,同一页面设置多个结构图需设置不同id构	#chart-container<br>
data-nodecontent	是否显示节点的内容部分	是<br>
data-direction	组织结构图的排列方向	从上到下<br>
data-pan	整个组织结构图通过鼠标拖拽	否<br>
data-zoom	组织结构图是否可以鼠标滚轮放大缩小	否<br>
data-draggable	组织结构图是否可以拖拽合并	是<br>
data-exportButton	是否显示导出图片的按钮（可导出结构图的png图片）	是<br>
data-exporttext	导出图片按钮，显示再按钮上的文字，默认：下载图片	下载<br>
data-exportFilename	导出图片的默认命名	公司结构图<br>
data-toggleSiblingsResp	是：箭头一侧有动作，否：节点同辈元素都有动作	否<br>
data-bgcolor	结构图背景色，css规则内的颜色，默认：红色网格，如需白底：设为#fff	#fff<br>
控制属性<br>
data--addparents	添加根元素	json字符串{name:总经理,title:姓名,info:总经理描述}，<br>
data--addsource	绑定数据源	json字符串{name:总经理,title:姓名,info:总经理描述}，可通过数据绑定，来更新显示初始数据源<br>
data--addsiblings	添加同辈（兄弟）元素	json字符串{name:总经理,title:姓名,info:总经理描述}，<br>
data--addchildren	添加子元素	json字符串{name:总经理,title:姓名,info:总经理描述}，<br>
data--removenodes	删除选择元素	不为空值即可<br>
输出属性<br>
data-x-newdata	保存最新的结构图的数据结构	json数据层级结构<br>
data-x-nodename	选中某个节点时，输出该节点的标题内容	总经理<br>
data-x-nodetitle	选中某个节点时，输出该节点的内容部分	姓名<br>
data-x-nodeinfo	选中某个节点时，输出该节点的描述部分	总经理描述<br>
data-x-nodeid	选中某个节点时，输出该节点的id	23463542342352<br>
