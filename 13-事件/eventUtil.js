var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false)
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler)
        }else{
            element['on'+type]=handler
        }
    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false)
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler)
        }else{
            element['on'+type]=handler;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement
    },
    getRelatedTarget:function(event){
        // 在发生mouseover和mouseout事件时，才会涉及相关元素
        if(event.relatedTarget){
            return event.relatedTarget
        }else if(event.toElement){
            return event.toElement
        }else if(event.fromElement){
            return event.fromElement
        }else{
            return null
        }
    },
    getButton:function(event){
        // 对于mousedown和mouseup事件来说，则在event对象上存在一个button属性
        if(document.implementation.hasFeature('MouseEvents','2.0')){
            return event.button
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                return 0;
                case 2:
                case 6:
                return 2;
                case 4:
                return 1
            }
        }
        // 在使用onmouseup 事件处理程序时，button的值表示释放的是哪个按钮。
    },
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera <9.5?-event.wheelDelta:event.wheelDelta)
        }else{
            return -event.detail*40
        }
    },
    // 跨浏览器方式取得字符编码
    getCharCode:function(event){
        if(typeof event.charCode=='number'){
            return event.charCode
        }else{
            return event.keyCode
        }
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation()
        }else{
            event.cancelBubble=true;
            
        }
    }
}

var result = this.$get("http://manto.daily.taobao.net/workshop/searchCat.do", {
    count: 1
  }, {
    type: 'jsonp'
  });
  result.then((value) => {
    if (value.success) {
      this.viewState.firstCategoryList = new Array();
      value.model.forEach((item => {
        this.viewState.firstCategoryList.push(item.name)
      }))
    } else {
      throw (new Error("数据有误"));
    }
  })
  console.log(this.viewState.firstCategoryList)