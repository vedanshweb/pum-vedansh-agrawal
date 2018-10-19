import React, { Fragment } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import '../../assets/styles/css/AlertModal.css';
import Languages from '../../common/Languages';

/**
 * Alert Modal, to get various types of alert boxes
 */
const AlertModal = (type, message, onConfirmation) => {
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <Fragment>
                    {(() => {
                        switch (type) {
                            case 'confirm':
                                return <div className="confirmation-alert">
                                    <h1>{message}</h1>
                                    <button onClick={onClose}>{Languages.No}</button>
                                    <button onClick={() => {
                                        onConfirmation()
                                        onClose()
                                    }}>{Languages.Yes}</button>
                                </div>
                            case 'alert':
                                return <div className="confirmation-alert">
                                    <h1>{message}</h1>
                                    <button onClick={onClose}>{Languages.Error}</button>
                                </div>
                            default:
                                return <div className="confirmation-alert">
                                    <h1>{message}</h1>
                                    <button onClick={onClose}>{Languages.Error}</button>
                                </div>
                        }
                    })()}
                </Fragment>
            )
        }
    });
};

export default AlertModal;