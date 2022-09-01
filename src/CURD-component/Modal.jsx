import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import Button from './Button'

const StyledModalRoot = styled.div`
 position: fixed;
 left: 0;
 top: 0;
 display: grid;
 place-items: center;
 width: 100%;
 height: 100%;
 background: rgba( 0, 0, 0, 0.2 );

 >.modal-content {
  position: relative;
  width: 30%;
  height: 25%;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12);

  .modal-content-header {
    height:20%;
    padding:16px 24px;

    .modal-content-title {
        font-size:16px;
        font-weight:500;
    }  
  }
  .modal-content-main {
    height:60%;
    border-top:1px solid #f0f0f0;
    border-bottom:1px solid #f0f0f0;
    padding:40px 30px;
    .modal-content-form {
        .modal-content-input {
            width:70%;
            padding:4px 11px;
            border:1px solid #d9d9d9;
            border-radius:2px;
            margin-left:10px;
        }
    }
  }
  .modal-content-footer {
    height:20%;
    text-align:right;
    padding:10px;
  }
 }
 `



// display: grid;place-items: center;
export default function Modal({ visible, onClose, onOk, title }) {
    const [keyWords, setKeyWords] = useState('')

    const handleChange = e => { setKeyWords(e.target.value) }

    return visible && ReactDOM.createPortal(
        //给modal container绑定onClose事件，为了onblur时，关闭modal （container的宽高为100%）
        <StyledModalRoot onClick={onClose}>
            {/* modal content阻止冒泡 */}
            <div className="modal-content" onClick={(e) => { e.stopPropagation() }}>
                <header className="modal-content-header">
                    <h1 className="modal-content-title">{title}</h1>
                </header>
                <main className="modal-content-main">
                    <div className="modal-content-form">
                        {`${title}:`}
                        <input onChange={handleChange} className="modal-content-input" type="text" name="" id="" />
                    </div>
                </main>
                <footer className="modal-content-footer">
                    <Button style={{ margin: "0 8px 0 0", }} onClick={onClose}>Close</Button>
                    <Button style={{ margin: "0" }} type='primary' onClick={() => { onOk(keyWords) }}>Ok</Button>
                </footer>
            </div>
        </StyledModalRoot>, document.body)
}

