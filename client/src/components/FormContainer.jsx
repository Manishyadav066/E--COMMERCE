import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '500px' }}>
                {children}
            </div>
        </div>
    );
};

export default FormContainer;
