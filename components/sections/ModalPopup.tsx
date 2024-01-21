import ReactModal from 'react-modal';
import {FaTimes} from "react-icons/fa";
import {useEffect} from "react";

const Modal = ({isOpen, onClose, message}: any) => {

    useEffect(() => {
        let timeoutId: any;

        if (isOpen) {
            timeoutId = setTimeout(() => {
                onClose();
            }, 3000);
        }

        return () => clearTimeout(timeoutId);

    }, [isOpen, onClose]);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Popup Modal"
            className="modal-content fixed bottom-10 left-10 bg-white px-5 py-3 rounded-xl text-black"
            overlayClassName="modal-overlay"
        >
            <div className="font-sans">
                <div className="flex justify-end pb-3">
                    <button onClick={onClose}>
                        <FaTimes className=""/>
                    </button>
                </div>
                <p className="pb-2">{message}</p>
            </div>
        </ReactModal>
    );
};

export default Modal;
