$(document).ready(function() {
    console.log("document ready ApplHome new");
    setTimeout(registerKeyBoardHandler, 4000);
});


var keyRegistry = new Array();
keyRegistry.push("UP");
keyRegistry.push("DOWN");


function registerKeyBoardHandler() {
    var component = AdfPage.PAGE.findComponentByAbsoluteId("d1");
//    console.log("component:"+component);
    for (var i = keyRegistry.length - 1; i >= 0; i--)
    {
      var keyStroke = AdfKeyStroke.getKeyStrokeFromMarshalledString(keyRegistry[i]);
      AdfRichUIPeer.registerKeyStroke(component, keyStroke, callBack);
    }
}
function registerKeyBoardHandler2() {
    var component = AdfPage.PAGE.findComponentByAbsoluteId("d1");
    for (var i = keyRegistry.length - 1; i >= 0; i--)
    {
      var keyStroke = AdfKeyStroke.getKeyStrokeFromMarshalledString(keyRegistry[i]);
      AdfRichUIPeer.registerKeyStroke(component, keyStroke, callBack2);
    }
}
function callBack2(keyCode){
    console.log('.... busy ....');
}
function callBack(keyCode){
    if(AdfPage.PAGE.isSynchronizedWithServer()){
        var ac = AdfPage.PAGE.getActiveComponent();
        var marshalledKeyCode = keyCode.toMarshalledString(keyCode);
    
        var componentType = ac.getComponentType();
        if(marshalledKeyCode == "UP" || marshalledKeyCode == "DOWN"){
          if(componentType=='oracle.adf.RichSelectOneChoice' || ac.getProperty("rows")>1)
          {
            return false;
          } else {
            var parent = ac.getParent();
            while (parent)  {
              if (parent instanceof AdfRichTable) {
                  break;
              }
              parent = parent.getParent();
              console.log(' *** parent new: ' + parent);
            }
            if (parent instanceof AdfRichTable) {
              var clientId = ac.getClientId().match("(.*):([0-9]+)(:[^:]+)");
              var newRowKey;
              var tablePeer  = parent.getPeer();
              tablePeer.bind(parent);
              switch (marshalledKeyCode) {
                case "UP":
                    newRowKey = tablePeer._getPreviousRowKeyAndRow(clientId[2]).rowKey;
                    break;
                case "DOWN":
                    newRowKey = tablePeer._getNextRowKeyAndRow(clientId[2]).rowKey;            
                    break;
              }
                if(newRowKey == null){
                    registerKeyBoardHandler2();
                }
//                console.log('--------------------------------------------------');
                tablePeer._handleTableBodyArrowUpDown(marshalledKeyCode == "UP", false, false);
                var timeOut = 0;
                var interval = setInterval(function () {
                  if(timeOut++ < 300 ){
                      if(newRowKey == null){
                          switch (marshalledKeyCode) {
                            case "UP":
                                newRowKey = tablePeer._getPreviousRowKeyAndRow(clientId[2]).rowKey;
                                break;
                            case "DOWN":
                                newRowKey = tablePeer._getNextRowKeyAndRow(clientId[2]).rowKey; 
                                console.log('id:' + newRowKey);
                                break;
                          }
                      }
                      //console.log('time:' + timeInterval + ' , id:' + clientId[2] + clientId[3] + ',   id N:'+ newRowKey + clientId[3]);
                      var newComp = AdfPage.PAGE.findComponent(clientId[1] + ':' + newRowKey + clientId[3]);
                      if(newComp != null){
                          clearInterval(interval);
                          registerKeyBoardHandler();
                          newCompPeer = newComp.getPeer();
                          newCompPeer.bind(newComp);
                          var inputElem = newCompPeer.getDomContentElement().firstElementChild;
                          inputElem.focus();
                          inputElem.select();
                          console.log('----- select , ' +  marshalledKeyCode + ' , ' + clientId[2] + ' , ' + newRowKey);
                      }
                  }else{
                    console.log('time Out Error...');
                    registerKeyBoardHandler();
                    clearInterval(interval);
                  }
                },50);
                return true;
            }
        }
      }
      return false;
    }
}

