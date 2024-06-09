import { useState, useEffect, useCallback } from 'react';
import css from './CoinItem.module.css';
import React from 'react';

const CoinItemComponent = ({ name, setFavoritesIcons, favoritesIcons }) => {
  const [favorites, setFavorites] = useState(false);

  const handleFavorites = useCallback(() => {
    const coinName = name;
    const isFavorite = favoritesIcons.includes(coinName);
    if (isFavorite) {
      setFavoritesIcons(favoritesIcons.filter((coin) => coin !== coinName));
    } else {
      setFavoritesIcons([...favoritesIcons, coinName]);
    }
  }, [setFavoritesIcons, favoritesIcons, name]);

  useEffect(() => {
    const isFavorite = favoritesIcons.includes(name);
    setFavorites(isFavorite);
  }, [favoritesIcons, name]);

  return (
    <li className={css.coin}>
      <button onClick={handleFavorites} className={css.favorites_btn}>
        <span
          className={`codicon ${
            favorites ? 'codicon-star-full' : 'codicon-star-empty'
          } ${css.icon_star}`}
        ></span>
      </button>
      {name}
    </li>
  );
};

const CoinItem = React.memo(CoinItemComponent);

export default CoinItem;
