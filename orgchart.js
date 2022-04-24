(function(root, factory) {
    /* CommonJS */
    if (typeof exports == "object") module.exports = factory();
    /* AMD module */
    else if (typeof define == "function" && define.amd) define(factory);

    /* 修改: 将 wwclassName 改为元素标识 */
    else root.orgchart = factory();
}(this, function() {
    "use strict";

    /* 修改: 将 wwclassName 改为元素标识 */
    var wwclassName = /*INSBEGIN:WWCLSNAME*/
        "orgchart"
    /*INSEND:WWCLSNAME*/
    ;

    // BEGIN: 加载依赖部分
    // 无依赖资源请使用本函数
    // function loadDependence(fncallback) {
    //   if (typeof fncallback === "function") {
    //     fncallback();
    //   }
    // }

    // 有依赖资源使用本函数
    // 使用方式:
    //  - 将"插件名"设置为具体插件标识, 通常就是插件名称, 不可为中文. 如: swiper
    //  - 如libs中无该插件, 则申请添加该插件
    //  - 将"插件路径"设置为具体插件路径, 通常为js文件, 省略路径中, 开头的"/"和结尾的".js". 如: "/libs/qrcodejs/qrcode.js" 应写为 "libs/qrcodejs/qrcode"
    //  - require 函数第一个参数, 传入依赖资源数组. 通常为config中配置的`插件名`. 可能还包括css文件
    //   - css文件的格式, 以"css!"开头, 省略路径开头的"/"和路径结尾的".css". 如: "/libs/noty/lib/noty.css" 应写为 ""css!libs/noty/lib/noty""
    //  - require 函数第二个参数是个回调函数, 该函数可能会传入参数. 参数与前面数组位置对应. 如不清楚, 自行查阅 (requirejs)[http://requirejs.org/] 文档

    var loadDependence = function(fncallback) {
        // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
        if (!window.wwload.orgchart) {
            window.wwload.orgchart = "wait";
            requirejs.config({
                paths: {
                    "orgchart": "libs/orgchart/dist/js/jquery.orgchart",
                    "html2canvas": "libs/html2canvas/dist/html2canvas" // 示例: libs/qrcodejs/qrcode
                }
            });
            require(["html2canvas", "orgchart", "css!libs/orgchart/dist/css/jquery.orgchart"], function(html2canvas) {
                window.html2canvas = html2canvas;
                window.wwload.orgchart = true;
                replace();
                fncallback();
            });
        } else if (window.wwload.orgchart === "wait") {
            setTimeout(function() {
                loadDependence(fncallback);
            }, 100);
        } else {
            replace();
            fncallback();
        }

        function replace() {
            loadDependence = function(fncallback) {
                fncallback();
            };
        }
    };
    //
    // END: 加载依赖部分

    /*
    //*/


    // BEGIN: 元素处理类初始化。下方函数只在依赖被加载完毕后，执行一次。后续无论处理多少个元素，不再调用本函数。
    var init = function() {
        // 重写初始化函数
        init = function() {
            return true;
        };
        $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

        /*如果是逻辑元素，需要监听所有新加元素的时间，请打开下方注释。与process的区别是： process传入的参数一定有wwclass，而checker是更低级的事件处理，如果依赖wwclass，则事件在这里被处理，在process也会被处理。相当于被调用了两次，因此，checker处理的内容，不要包括wwclass，实际上，你可以利用checker构建一个wwclass体系。
         简单来说： 不用wwclass又希望有代码附加在某类(使用特定样式类，特定属性，特定标签等等)元素上，就使用本机制。
        //$newRootElement是新加入的元素。includeSelf指示是否包含$container自身
        function checker($newRootElement, includeSelf){
          //每次有新元素加入时，无论其类型，都会调用本方法。页面的根container($(".container[-fluid]"))
         //下文的例子，用来示例如何探测所有新加入的input并加以处理，类似的可以处理图片等等。
         var $inputElement = includeSelf ? $newRootElement.find("input[data-xxx]").addBack("input") : $newRootElement.find("[input]");
         if($inputElement.length > 0){ //新加入的元素有input。
         }
        }
        $.wwclass.getwwchecker().push(checker);
        //*/

        // 如有初始化动作, 请在下方添加
    };
    // END: 元素首次初始化处理


    /*
     * @description 元素平滑:
     * 1. 页面显示元素时,如果元素出现明显的闪现现象,需要做如下处理:
     *  1. 编辑器: 添加设置项:`禁用平滑加载`.对应属性`data-disabled-smooth`.该属性只允许设置值为true,否则元素删除该属性
     *  2. 编译期: 添加处理:当属性`data-disabled-smooth`值为`非true`时,元素添加平滑处理.平滑处理目的是使得页面元素的加载更加自然.例如swiper1:将图片添加类hide隐藏,只显示第一张图片,去除元素加载闪现现象
     *  3. 运行期: 添加处理:元素初始化完毕之后,即属性`data-x-inited`属性值为true时,平滑处理的相关元素恢复.例如swiper1:将图片hide类删除,恢复图片正常显示
     *  4. 示例元素可查看轮播图(swiper1)元素
     *  5. 类似imagefill等,平滑处理后,只遗留一个空壳,此时添加处理类`转圈`.加载完毕之后,去掉该类.
    //*/
    /*
     * @description 元素加载状态:
     * 页面显示元素时,如果元素出现明显的有无到有现象,需要做如下处理:
     *  1. 编辑器: 添加设置项:`禁用自动添加加载状态`.对应属性`data-noblock`.该属性只允许设置值为true,否则元素删除该属性
     *  2. 编译期: 添加处理:当属性`data-noblock`值为`非true`时,元素添加加载状态.即设置`data-block="true"`
     *  3. 运行期: 添加处理:元素初始化完毕之后,即属性`data-x-inited`属性值为true时,元素放开加载状态.即设置`data-block="false"`
     *  4. 需要处理的元素，类似view、imagefill、qrcode等元素效果
    //*/
    /* @description 错误信息输出格式:
     *   $.wwclass.syslog(message,category,severity,from,opt);
     * 参数解释：
     *   message; // 必填: 日志信息
     *   from // 选填: 日志来源. 默认值为: 当前页地址
     *   category // 选填: category,日志类型(日志分类标识). 默认值为: fe,即 front end
     *   severity //  选填: severity,日志级别. 默认值为: debug.可选值为:emergency,alert,critical,error,warning,notice,info,debug
     *   opt //选填：参数为json格式的字符串
    //*/
    /*
     * @description 初始化每个元素
     * @param {jQuery object} $ele - 需要初始化的元素
     */

    var getId = function() {
        return (new Date().getTime()) * 1000 + Math.floor(Math.random() * 1001);
    };

    function traverseNode(node) {
        var name = $("#" + node.id).find(".title").text();
        var title = $("#" + node.id).find(".content").text();
        // var info = $("#" + node.id).find(".info").text();
        node.name = name;
        node.title = title;
        // node.info = info;

        // for(var key in node){
        //  var varname = key;
        //  node[varname] = $("#" + node.id).find("."+key).text();
        // }
        var childrenNode = $("#" + node.id).find("p");
        for (var i = 0; i < childrenNode.length; i++) {
            var varname = childrenNode[i].className;
            var keyname = varname.split(" ")
            node[keyname[1]] = $("#" + node.id).find("." + keyname[1]).text();
        }
        // console.log(node);
    }

    function traverseTree(node) {
        if (!node) {
            return;
        }
        traverseNode(node);
        if (node.children && node.children.length > 0) {
            var i = 0;
            for (i = 0; i < node.children.length; i++) {
                traverseTree(node.children[i]);
            }
        }
    }



    function processElement($ele) {
        var nodearray = [];
        var orgid = $ele.attr("data-orgid") || '#chart-container';
        var $chartContainer = $(orgid);
        var datascource = {};
        // console.log($ele.attr("data--addparent"));
        var datas = $ele.attr("data-addparent");
        // console.log(datas);
        if (datas) {
            datascource = JSON.parse(datas.split("\n").join("<br/>"))
        }


        var optionsObj = {
            'data': datascource,
            // 'nodeContent': 'title',
            // // 排序方向
            // 'direction': 'l2r',
            // // 移动，缩放
            // 'pan': true,
            // 'zoom': true,
            // //拖拽
            'draggable': false,
            // // 拖拽合并
            // 'dropCriteria': function($draggedNode, $dragZone, $dropZone) {
            //     return true;
            // },
            // // 导出图片
            // 'exportButton': true,
            // 'exportFilename': 'MyOrgChart',
            "exportFileextension": "png",
            // // true：箭头一侧有动作，false：节点同辈元素都有动作
            // 'toggleSiblingsResp': true,
            // 'createNode': function($node, data) {
            //     $node[0].id = getId();
            //     $node.on('click', function(event) {
            //         $.wwclass.helper.anijsTrigger($ele, "clicknode");
            //     });
        }
        if ($ele.attr("data-nodecontent") == "true") {
            optionsObj.nodeContent = "title";
        }
        optionsObj.direction = "t2b";
        if ($ele.attr("data-pan")) {
            optionsObj.pan = true;
        }
        if ($ele.attr("data-zoom")) {
            optionsObj.zoom = true;
        }
        if ($ele.attr("data-draggable")) {
            optionsObj.draggable = true;
        }
        optionsObj.chartClass = $ele.attr("data-orgid");

        if (!optionsObj.draggable) {
            optionsObj.dropCriteria = function($draggedNode, $dragZone, $dropZone) {
                return false;
            }
        } else {
            optionsObj.dropCriteria = function($draggedNode, $dragZone, $dropZone) {
                return true;
            }
        }
        optionsObj.createNode = function($node, data) {
            $node[0].id = getId();
            for (var key in data) {

                if (key != "title" && key != "name" && key != "relationship" && key != "" && key != "undefined" && key != "children") {
                    $node.find("." + key).remove();
                    $node.find(".title").after("<p class='hidden " + key + "'>" + data[key] + "</p>")
                }
            }

            $node.on('click', function(event) {
                $.wwclass.helper.anijsTrigger($ele, "clicknode");
                if (data.name) {
                    $.wwclass.helper.updateProp($ele, "data-x-nodename", data.name);
                } else {
                    $.wwclass.helper.updateProp($ele, "data-x-nodename", "");
                    $ele.removeAttr("data-x-nodetitle");
                }
                if (data.title) {
                    $.wwclass.helper.updateProp($ele, "data-x-nodetitle", data.title);
                } else {
                    $.wwclass.helper.updateProp($ele, "data-x-nodetitle", "");
                    $ele.removeAttr("data-x-nodetitle");
                }
                if (data.info) {
                    $.wwclass.helper.updateProp($ele, "data-x-nodeinfo", data.info);
                } else {
                    $.wwclass.helper.updateProp($ele, "data-x-nodeinfo", "");
                    $ele.removeAttr("data-x-nodetitle");
                }
                for (var i = 0; i < nodearray.length; i++) {
                    $ele.removeAttr("data-x-" + nodearray[i]);
                }
                for (var key in data) {
                    $ele.removeAttr("data-x-" + key);
                    // $ele.removeAttr("data-x-"+key);
                    if (key != "title" && key != "name" && key != "relationship" && key != "" && key != "undefined" && key != "children") {
                        nodearray.push(key);
                        $.wwclass.helper.updateProp($ele, "data-x-" + key, data[key]);
                    } else {
                        $ele.removeAttr("data-x-" + key);
                    }
                }
                $.wwclass.helper.updateProp($ele, "data-x-nodeid", $node[0].id);
                var newjson = $ele.data("value");
                newjson = JSON.parse(newjson.split("\n").join("<br/>"));
                if (newjson.id == $node[0].id) {
                    $.wwclass.helper.anijsTrigger($ele, "firstnode");
                }
                // var selecttext =  $('.selected-node').val();

            });
            // console.log($node);
        }
        if ($ele.attr("data-exportButton")) {
            optionsObj.exportButton = true;
        }

        optionsObj.exportFilename = $ele.attr("data-exportFilename") || 'MyOrgChart';
        if ($ele.attr("data-toggleSiblingsResp")) {
            optionsObj.toggleSiblingsResp = true;
        }

        /* 如果本元素废弃, 请解开此处注释, 并完成代码
        console.error("扩展元素(" + $ele.attr("data--wwclass") + ")已废弃, 找对应产品更换为xxx实现本功能", $ele);
        //*/
        // 对 $ele 元素做对应处理
        /* @TODO:重要提示:在元素初始化完毕时，需要更新属性`data-x-inited`的值为true，初始值(默认)为false，并同时发出事件wwinited
        $.wwclass.helper.updateProp($ele, "data-x-inited", true);
        $.wwclass.helper.anijsTrigger($ele, "wwinited");
        //*/
        /* @TODO:所有正式发布的元素，请认真排查代码:不要带测试输出，只有出现异常，才允许输出错误.需要输出时，请解开此处注释，并完成代码。函数说明请查看上方
        $.wwclass.syslog(message,category,severity,from,opt);
        //*/
        // optionsObj.data = $ele.attr("data-data");

        var oc = $chartContainer.orgchart(optionsObj);
        $ele.data("oc", oc)
        oc.$chart.on('nodedropped.orgchart', function(event, extraParams) {
            setTimeout(function() {
                $ele.removeAttr("data-x-newdata");
                var hierarchy = oc.getHierarchy();
                traverseTree(hierarchy);
                var newdata = JSON.stringify(hierarchy);
                $.wwclass.helper.updateProp($ele, "data-x-newdata", newdata);
                $ele.data("value", newdata);
            }, 100)
        });
        var bgcolor = $ele.attr("data-bgcolor");
        if (bgcolor) {
            $ele.find(".orgchart").css("background", bgcolor);
        }
        var exporttext = $ele.attr("data-exporttext") || "下载图片";
        $ele.find(".oc-export-btn").html(exporttext);
        oc.$chartContainer.on('click', '.node', function() {
            var $this = $(this);
            var nodevalue = $('.selected-node').val($this.find('.title').text()).data('node', $this);;
            var selecttext = $('.selected-node').val();
        });
        oc.$chartContainer.on('click', '.orgchart', function(event) {
            if (!$(event.target).closest('.node').length) {
                $('.selected-node').val('');
                $.wwclass.helper.anijsTrigger($ele, "noselect");
            }
        });


        // 输出新数据
        if (datas) {
            setTimeout(function() {
                $.wwclass.helper.updateProp($ele, "data-x-inited", true);
                $ele.removeAttr("data-x-newdata");
                var hierarchy = oc.getHierarchy();
                traverseTree(hierarchy);
                var newdata = JSON.stringify(hierarchy)
                $.wwclass.helper.updateProp($ele, "data-x-newdata", newdata);
                $ele.data("value", newdata);
            }, 100);
        }
        // 
        if ($ele.attr("data-arrowtop") != "false") {
            $ele.find(".topEdge").addClass("hidden")
            $ele.find(".rightEdge").addClass("hidden")
            $ele.find(".leftEdge").addClass("hidden")
        }

    }

    /*
     * @description 析构每个元素, 也就是该元素该删除时的处理代码
     * @param {jQuery object} $ele - 需要处理的元素
     */
    function finalizeElement($ele) {
        // 对 $ele 元素做对应处理
        /*
        @TODO: 销毁元素，destroy
        @TODO: 存入$ele.data()中的值清空。
        $ele.data("存入的键","");
        //*/
    }

    // BEGIN: 监听属性处理
    /*
     * @description 监听函数, 元素的控制属性(data--)改变时处理
     * @param {jQuery object} $ele - 控制属性改变的元素
     * @param {string} attribute - 控制属性的名称
     * @param {string} value - 控制属性改变为何值
     */
    var evtInHandler = function($ele, attribute, value) {
        var $node;
        var oc = $ele.data("oc");
        var orgid = $ele.attr("data-orgid") || '#chart-container';
        var $chartContainer = $(orgid);

        function getnewvalue() {
            if ($ele.attr("data-addparent") || value) {
                $ele.removeAttr("data-x-newdata");
                var hierarchy = oc.getHierarchy();
                traverseTree(hierarchy);
                var newdata = JSON.stringify(hierarchy)
                $.wwclass.helper.updateProp($ele, "data-x-newdata", newdata);
                $ele.data("value", newdata);
            }
        }
        switch (attribute) {
            case "data--addparents":
                // 处理动作
                // console.log(JSON.parse(value))
                if (value) {
                    $node = $('.selected-node').data('node');
                    //     var orgid = $ele.attr("data-orgid") || '#chart-container';
                    // var $chartContainer = $(orgid);

                    var newValue = JSON.parse(value.split("\n").join("<br/>"));
                    // console.log(newValue);
                    if (!$chartContainer.children('.orgchart').length) {
                        optionsObj.data = newValue;
                        optionsObj.parentNodeSymbol = "fa-th-large"
                        oc = $chartContainer.orgchart(optionsObj);
                        oc.$chart.addClass('view-state');
                    } else {
                        newValue.ID = getId();
                        oc.addParent($chartContainer.find('.node:first'), newValue);
                    }
                    getnewvalue();
                }
                break;
            case "data--addsource":
                // 处理动作
                // console.log(JSON.parse(value))
                if (value) {
                    var data = JSON.parse(value.split("\n").join("<br/>"))
                    oc.init({ "data": data });
                    var bgcolor = $ele.attr("data-bgcolor");
                    if (bgcolor) {
                        $ele.find(".orgchart").css("background", bgcolor);
                    }
                    oc.$chart.on('nodedropped.orgchart', function(event, extraParams) {
                        setTimeout(function() {
                            $ele.removeAttr("data-x-newdata");
                            var hierarchy = oc.getHierarchy();
                            traverseTree(hierarchy);
                            var newdata = JSON.stringify(hierarchy);
                            $.wwclass.helper.updateProp($ele, "data-x-newdata", newdata);
                            $ele.data("value", newdata);
                        }, 100)
                    });
                    getnewvalue();
                }
                break;
            case "data--addsiblings":
                // 处理动作
                if (value) {

                    $node = $('.selected-node').data('node');
                    // console.log($node);
                    if ($node !== undefined) {
                        var newValue = JSON.parse(value.split("\n").join("<br/>"));
                        newValue.ID = getId();
                        newValue.relationship = "110"
                        oc.addSiblings($node, {
                            'siblings': [newValue]
                        });
                    } else {
                        alert("请先选定一个节点");
                        return;
                    }
                    getnewvalue();
                }
                break;
            case "data--addchildren":
                // 处理动作
                if (value) {

                    $node = $('.selected-node').data('node');
                    // console.log($node);
                    if ($node !== undefined) {
                        var hasChild = $node.parent().attr('colspan') > 0 ? true : false;
                        var newValue = JSON.parse(value.split("\n").join("<br/>"));
                        // console.log(newValue);
                        newValue.ID = getId();
                        newValue.relationship = "100"
                        if (!hasChild) {
                            oc.addChildren($node, {
                                'children': [newValue]
                            });
                        } else {
                            oc.addSiblings($node.closest('tr').siblings('.nodes').find('.node:first'), { 'siblings': [newValue] });
                        }
                    } else {
                        alert("请先选定一个节点");
                        return;
                    }
                    getnewvalue();
                }
                break;
            case "data--removenodes":
                // 处理动作
                if (value) {
                    var $node = $('.selected-node').data('node');
                    if (!$node) {
                        alert('请先选定一个节点');
                        return;
                    } else if ($node[0] === $('.orgchart').find('.node:first')[0]) {
                        if (!window.confirm('您确定要删除整个图表吗?')) {

                            return;
                        } else {
                            oc.removeNodes($node);
                            $('.selected-node').val('').data('node', null);
                            $ele.removeAttr("data-x-newdata");
                            $.wwclass.helper.updateProp($ele, "data-x-newdata", "");
                            return;
                        }
                    }
                    oc.removeNodes($node);
                    $('.selected-node').val('').data('node', null);
                    getnewvalue();
                }
                break;
            case "finalize":
                finalizeElement($ele);
                break;
            default:
                console.info("监听到 \"" + $ele.attr("data-wwclass") + "\" 元素的 \"" + attribute + "\" 属性值改变为 \"" + value + "\", 但是无对应处理动作.");
        }

        if ($ele.attr("data-arrowtop") != "false") {
            $ele.find(".topEdge").addClass("hidden")
            $ele.find(".rightEdge").addClass("hidden")
            $ele.find(".leftEdge").addClass("hidden")
        }


    };
    // END: 监听属性处理

    // 以下部分不需要修改
    if (!$.wwclass) {
        console.error("Can not use without wwclass.js");
        return false;
    }

    var ret = /*INSBEGIN:WWCLSHANDLER*/
        function(set) {
            if (set.length > 0) {
                loadDependence(function() {
                    init();
                    $(set).each(function(index, targetDom) {
                        processElement($(targetDom));
                    });
                });
            }
        }
    /*INSEND:WWCLSHANDLER*/
    ;

    return ret;

}));
