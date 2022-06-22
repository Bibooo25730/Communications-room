import React,{ useState,useEffect } from 'react'
import "./jion.css"
import Room from "../../components/Room/Room"
import Filetxt from "../../components/File/Filetxt";
import {Peer} from "peerjs";

let connect =null;
let call = null;
let Pid = '';
function JionConnection(){
    let [isShow,setIsshow] = useState(false);
    let [file,setFile] = useState({});
    let peer = new Peer();
    let refInp = React.createRef();

    function handleSend(Reftext){
        let title = Reftext.current.value;
            if(connect){
                connect.send(title)
                let ul = document.getElementById('chatObj');
                let NewNode = document.createElement('li');
                NewNode.innerHTML = '<div class=\'message_send\'>\n' +
                    ' <div class=\'message\'>'+ title + '</div>\n' +
                    ' </div>'
                ul.appendChild(NewNode)
            }else{
               alert('没连接')
        }
        }
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
   peer.on('call',(call)=>{
       console.log(call)
   })
    if(connect){
        connect.on('call',(call)=>{
            console.log(call)
        })
    }


      function handleConnect(){
        let id = refInp.current.value;
        Pid = id;
          connect = peer.connect(id);
          connect.on('open',function (){
              setIsshow(true)
              connect.send('连接成功')
          })
          connect.on('data',function (data){

              if(Object.prototype.toString.call(data) === '[object Object]'){
                  let content =data.resule;
                  let  blod =  dataURLtoBlob(content);
                  let a =  document.createElement('a');
                  let url = URL.createObjectURL(blod)
                  a.href = url;
                  a.download = blod.type;
                  a.click();
              }else{
                  let ul = document.getElementById('chatObj');
                  let NewNode = document.createElement('li');
                  NewNode.innerHTML = '<div class=\'message_receive\'>\n' +
                      ' <div class=\'message\'>'+ data + '</div>\n' +
                      ' </div>'
                  ul.appendChild(NewNode);
              }

          })

          peer.on('error',function (error){
              refInp.current.value = error
          })
       }
      function handleBreak(){
          peer.disconnect();
          peer = null;
          connect = null;
          setIsshow(false)
    }
      function Connect(props){
         let {isShow} = props;
        return (
            isShow?<div className='Connect'>
                    <input type="text" placeholder='连接成功' disabled ref={refInp}/> <div className='btnflex'>
                    <button onClick={handleBreak}>断开</button>
                </div>
                </div>:<div className='Connect'>
                <input type="text" placeholder='输入ID连接你的老友吧！！！' ref={refInp}/> <div className='btnflex'>
                <button onClick={handleConnect}>连接</button>
                <button onClick={handleBreak}>断开</button>
            </div>
            </div>)

      }
      function handleFile(file){
        console.log(file)
          setFile(file);
      }
      function handleSendFile(file){
        let files = file.get('file')
          console.log(files)
        let FileTs = new File([files],file.name,{
            type:files.type});
        console.log(FileTs)
          let svg = document.createElement("svg");
          let span = document.createElement("span");
          svg.file = file;
          let preview = document.getElementById('preview');
          preview.appendChild(svg);
          preview.appendChild(span);
          let reader = new FileReader();
          reader.onload =  (function(aImg) { return function(e) {
              //前面的类型
              let type = e.currentTarget.result.split(';')[0];
              span.innerHTML = type;
              svg.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#95B8B4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`
              let file = {};
              file.type = type;
              file.resule = e.currentTarget.result
              connect.send(file)
          }; })(svg);
          reader.readAsDataURL(FileTs);
      }
    return (<div>
            <Room handleSend={handleSend} connect={connect} handleFile={handleFile} Pid={Pid}></Room>
            <Connect isShow={isShow}></Connect>
            <Filetxt handleFile={file} handleSendFile={handleSendFile}></Filetxt>
            <div id='preview'></div>
    </div>
       )
}

export default JionConnection;
