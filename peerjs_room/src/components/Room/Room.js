import React from 'react';
import "../Room.css"
import {Peer} from "peerjs";

let peer =new Peer();
class Room extends React.PureComponent{
    constructor(props) {
        super(props);
        this.refValue = React.createRef();
        this.refFile = React.createRef();
        this.handleSend = this.handleSend.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
    }
    handleSend(){
       this.props.handleSend(this.refValue)
    }
    handleFile(){
        if(this.props.connect){
            this.refFile.current.click()
            this.refFile.current.addEventListener("change",()=>{
                this.props.handleFile(this.refFile.current.files)
            })
        }else{
            alert('没连接')
        }

    }
    handleVideo(){
        if(this.props.connect){
            navigator.mediaDevices.getUserMedia({audio:true,video:{ width: 960, height: 601 }}).then((stream)=>{
              let call = peer.call(this.props.Pid, stream);
                call.on("data", (stream) => {
                    console.log(stream)

                    // document.querySelector('video').play();
                });
                call.on("stream", (stream) => {
                    console.log(stream)

                });

              //   call.on("错误", (err) => {
              //       console.log(err);
              //   });
                // call.on('close', () => {
                //     endCall()
                // })
                // console.log(call)
            })

        }else{
            alert('没连接')
        }
    }

    render(){
        return (
            <div className='Room_container'>
                <input type="file" style={{display:'none'}} ref={this.refFile}/>
            <div className='Room_top'>
                <svg className="icon" aria-hidden="true" onClick={this.handleVideo}>
                    <use xlinkHref="#icon-shipin1"></use>
                </svg>
            </div>
            <div className='Room_body clearfix'>
                <div className='time'> {new Date().toLocaleString()}</div>
                <ul id='chatObj'>
                </ul>
            </div>
            <div className='Room_footer'>
                <svg className="icon" aria-hidden="true" onClick={this.handleFile}>
                    <use xlinkHref="#icon-jiarufangjian-01"></use>
                </svg>
                <textarea id="comment" ref={this.refValue}  rows="1"></textarea>
                <svg className="icon" aria-hidden="true" onClick={this.handleSend}>
                    <use xlinkHref="#icon-fasong"></use>
                </svg>
            </div>

        </div>)
    }
}
export default Room;
