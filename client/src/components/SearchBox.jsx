import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/shop?keyword=${keyword}`);
        } else {
            navigate('/shop');
        }
    };

    return (
        <form onSubmit={submitHandler} style={{ display: 'flex', flexGrow: 1, maxWidth: '600px', margin: '0 20px' }}>
            <input
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Luxe Commerce...'
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px 0 0 4px',
                    border: 'none',
                    outline: 'none',
                }}
            />
            <button
                type='submit'
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#febd69',
                    border: 'none',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}
            >
                <i className='fas fa-search'></i>
            </button>
        </form>
    );
};

export default SearchBox;
