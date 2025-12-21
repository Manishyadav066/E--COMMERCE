import React from 'react';

const Loader = () => {
    return (
        <div
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
                border: '10px solid #f3f3f3',
                borderRadius: '50%',
                borderTop: '10px solid #3498db',
                animation: 'spin 2s linear infinite',
            }}
        >
            <style>
                {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
            </style>
        </div>
    );
};

export default Loader;
