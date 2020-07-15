var Utils = (function () {
    var time = 0;
    var timeManage = {};
    var ids = 0;
    return {
        timeStart: function () {
            if (time) return;
            time = new Date().getTime();
        },
        timeEnd: function () {
            var timeInterval = new Date().getTime() - time;
            time = 0;
            return timeInterval;
        },
        timeS: function () {
            ids++;
            timeManage[ids] = new Date().getTime();
            return ids;
        },
        timeE: function (id) { 
            if(!timeManage[id]) return "id错误";
            var temp = new Date().getTime()-timeManage[id];
            delete timeManage[id];
            return temp;
        },


        color: function () {
            var col = "#";
            for (var i = 0; i < 6; i++) {
                col += Math.floor(Math.random() * 16).toString(16);
            }
            return col;
        },

        // 在某个父元素中创建某种样式的子元素
        createDocumentElem:function(type,style,parent){
            var elem = document.createElement(type);
            for(let item in style){
                elem.style[item] = style[item];
            }
            if(typeof parent === "string") parent = document.querySelector(parent);
            if(parent){
                parent.appendChild(elem);
            }
            return elem;
        }
    }
})()