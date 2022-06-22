import { Peer } from "peerjs";
import Room from "../../components/Room/Room"
import React, {useEffect, useState} from "react";
import Filetxt from "../../components/File/Filetxt";
import "./prew.css"
let peers = new Peer();
let Pid = '';
let NewNode = document.createElement('li');
peers.on('open',function (id){
    Pid = id;
    // navigator.mediaDevices.getUserMedia({video:{ width: 1280, height: 720 }}).then((stream)=>{

        // let video = document.querySelector('video');
        // video.srcObject = stream;
        // video.onloadedmetadata = function(e) {
        //     video.play();
        // };

        // peers.on('call', function(call) {
        //     navigator.mediaDevices.getUserMedia({video:{ width: 1280, height: 720 }}).then((stream)=>{
        //         call.answer(stream);
        //     })
        //     // Answer the call, providing our mediaStream
        //
        // });

            // `stream` is the MediaStream of the remote peer.
            // Here you'd add it to an HTML video/canvas element.
        // });
    NewNode.innerHTML = '<div class=\'message_receive\'>\n' +
        ' <div class=\'message\'>快把id：'+ id + '发给老友吧！！！</div>\n' +
        ' </div>'
})
let conns = null;
function Receiver(){
    let [conns1,setConns] = useState(null);
    let [isShow,setIsshow] = useState(false);
    let [file,setFile] = useState({});
    useEffect(() =>{
        let ul = document.getElementById('chatObj');
        ul.appendChild(NewNode);
        return()=>{
             // 注销
             peers = null;
             conns = null;
        }
    },[])
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    peers.on("call",function (call){
        call.answer()
        call.on("stream", (remoteStream) => {
            console.log(1)
            console.log(remoteStream)
            // 当我们收到远程流时，播放它
            document.getElementById("video1").srcObject = remoteStream;
            document.getElementById("video1").play();
        });
    })
    peers.on("connection",(conn)=>{
        let textArea = document.getElementById('comment');
        textArea.defaultValue = '开始发送信息吧';
        textArea.disabled = false
        conns = conn;
        setConns(conns)
       conn.on('data',function (data){
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
               NewNode.innerHTML = '<div class=\'message_send\'>\n' +
                   ' <div class=\'message\'>'+ data + '</div>\n' +
                   ' </div>'
               ul.appendChild(NewNode)
           }

        })
    })
    function handleSend(refValue){
        let value = refValue.current.value;
        if(!conns){
             alert('没连接')
        }else{
            conns.send(value)
            let ul = document.getElementById('chatObj');
            let NewNode = document.createElement('li');
            NewNode.innerHTML = '<div class=\'message_receive\'>\n' +
                ' <div class=\'message\'>'+ value + '</div>\n' +
                ' </div>'
            ul.appendChild(NewNode);
        }
         }
    function handleFile(file){
        setFile(file);
    }
    function handleSendFile(file){
        let files = file.get('file')
        let FileTs = new File([files],file.name,{
            type:files.type});
        let svg = document.createElement("svg");
        let span = document.createElement("span");
        svg.file = file;
        let preview = document.getElementById('previe');
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
            conns.send(file)
        }; })(svg);
        reader.readAsDataURL(FileTs);
    }

    return (
        <div>
            <div className='video'>
                <Room handleSend={handleSend} handleFile={handleFile} connect={conns} Pid={Pid} peers={peers}></Room>
                <video id="video1"></video>

            </div>
            <Filetxt handleFile={file} handleSendFile={handleSendFile}></Filetxt>
            <div id='previe'></div>
        </div>
    )
}


export default Receiver
