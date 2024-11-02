import React from 'react';

const SearchHistory = ({ history }) => {
    return (
        <div>
            <h3>Search History</h3>
            <ul>
                {history.map(city => (
                    <li key={city}>{city}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHistory;
