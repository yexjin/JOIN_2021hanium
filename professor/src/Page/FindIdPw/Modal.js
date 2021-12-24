import React from "react";
import "./modal.css";

const Modal = (props) => {
    
    const { open, close, header, submit } = props;
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="close" onClick={close}> 취소 </button>
                        <button className="submit" onClick={submit}> 확인 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    );
};

export default Modal;
