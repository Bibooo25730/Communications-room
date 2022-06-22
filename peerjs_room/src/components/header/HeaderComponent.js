import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import addID from "../../redux/action";
import { connect } from "react-redux";
import { animated, useSpring} from '@react-spring/web'
import './Header.css'

function  HeaderComponent(props){
    let Navigate =  useNavigate();
    const [state, toggle] = useState(true);
    const { x } = useSpring({
        from: { x: 0 },
        x: state ? 1 : 0,
        config: { duration: 1000 },
    })
    // 加入房间
    function handleJOinRoom() {
       Navigate('/jionconect')
    }
    // 创建房间
    function  handleCreatRoom(){
        // const peer = new Peer();
        // const peers = new Peer('someid', {
        //     host: 'localhost',
        //     port: 9000,
        //     path: '/peerjs/myapp'
        // });
        // peer.on('open',function (id){
        //     console.log(id)
        //     if(!id){
        //         alert('没有发送 id')
        //     }else{
        //         props.addID({
        //            ids:id
        //         })
                Navigate('/receivenin')
        //     }
        //
        // })
    }
    return (<header id='header_container'>
        <div className='container'>
            <div className='advertising' onClick={() => toggle(!state)}>
                <animated.div  style={{
                    opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
                    scale: x.to({
                        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                        output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                    }),
                }}>
                    <div id='logo'>P2Chat</div>
                    <div className='title'>基于 Peerjs 实现的 .对.的聊天室，工作摸鱼，吹牛，的场所</div>
                </animated.div>
            </div>
                <div className="btn_container">
                    <div className="btn btn-six" onClick={handleCreatRoom}>
                        <span>创建房间</span>
                    </div>
                </div>
                <div className="btn_container">
                    <div className="btn btn-six" onClick={handleJOinRoom}>
                        <span>加入房间</span>
                    </div>
                </div>
        </div>
    </header>)
}
export  default  connect(null,{addID})(HeaderComponent);
