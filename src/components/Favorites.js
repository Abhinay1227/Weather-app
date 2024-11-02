import React, { useState, useEffect } from 'react';

const Favorites = ({ currentCity }) => {
   const [favorites, setFavorites] = useState([]);

   useEffect(() => {
       const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
       setFavorites(storedFavorites);
   }, []);

   const removeFavorite = (city) => {
       const updatedFavorites = favorites.filter(fav => fav !== city);
       setFavorites(updatedFavorites);
       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
   };

   const addFavorite = () => {
       if (currentCity && !favorites.includes(currentCity)) { // Use currentCity here
           const updatedFavorites = [...favorites, currentCity];
           setFavorites(updatedFavorites);
           localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
       }
   };

   return (
       <div>
           <h3>Favorite Cities</h3>
           <ul className="favorites-list"> {/* Add the class here */}
               {favorites.map(city => (
                   <li key={city}>
                       <span>{city}</span> {/* Wrap city in a span for styling */}
                       <button className="remove-favorite" onClick={() => removeFavorite(city)}>Remove</button>
                   </li>
               ))}
           </ul>
           <button className="add-favorite" onClick={addFavorite}>Add Current City to Favorites</button> {/* Button to add current city */}
       </div>
   );
};

export default Favorites;
