import React from 'react';

const Message = ({ variant, children }) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'danger': return '#f8d7da';
            case 'success': return '#d4edda';
            case 'info': return '#d1ecf1';
            default: return '#e2e3e5';
        }
    };

    const getColor = () => {
        switch (variant) {
            case 'danger': return '#721c24';
            case 'success': return '#155724';
            case 'info': return '#0c5460';
            default: return '#383d41';
        }
    };

    return (
        <div
            style={{
                padding: '1rem',
                backgroundColor: getBackgroundColor(),
                color: getColor(),
                borderRadius: '5px',
                margin: '1rem 0',
            }}
        >
            {children}
        </div>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
