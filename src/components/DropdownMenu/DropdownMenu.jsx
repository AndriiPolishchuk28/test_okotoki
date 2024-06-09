import { useEffect, useState, useCallback } from 'react';
import css from './DropdownMenu.module.css';
import CoinItem from '../CoinItem/CoinItem';
import { nanoid } from 'nanoid';

const DropdownMenu = ({ buttonRef, menuRef, coins }) => {
  const [menuStyle, setMenuStyle] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [favoritesIcons, setFavoritesIcons] = useState([]);
  const [activeTab, setActiveTab] = useState(2);
  const normalizedQuery = value.toLocaleLowerCase();

  useEffect(() => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    setMenuStyle({
      top: `${buttonRect.bottom}px`,
      left: `${buttonRect.right - 300}px`,
    });
    setIsVisible(true);
  }, [buttonRef]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    let filter = [];
    if (activeTab === 1) {
      filter = favoritesIcons.filter((item) =>
        item.toLocaleLowerCase().includes(normalizedQuery)
      );
    } else if (activeTab === 2 || normalizedQuery === '') {
      filter = coins.filter((item) =>
        item.toLocaleLowerCase().includes(normalizedQuery)
      );
    }
    setFiltered(filter);
  }, [value, activeTab, coins, favoritesIcons, normalizedQuery]);

  const handleSetFavoritesIcons = useCallback((updatedFavorites) => {
    setFavoritesIcons(updatedFavorites);
  }, []);

  return (
    <div
      ref={menuRef}
      className={`${css.dropdown_menu} ${isVisible ? css.show : ''}`}
      style={menuStyle}
    >
      <div className={css.input_wrapper}>
        <label htmlFor="search">
          <span className={`codicon codicon-search ${css.icon}`}></span>
        </label>
        <input
          type="text"
          id="search"
          name="search"
          className={css.search_input}
          placeholder="Search..."
          onChange={handleChange}
          value={value}
        />
        {value && (
          <span
            onClick={() => setValue('')}
            className={`codicon codicon-close ${css.close}`}
          ></span>
        )}
      </div>
      <ul className={css.menu_list}>
        <li
          onClick={() => handleTabClick(1)}
          className={`${css.menu_item} ${
            activeTab === 1 ? css.active_tab : ''
          }`}
        >
          <span className={`codicon codicon-star-full ${css.icon_star}`}></span>
          Favorites
        </li>
        <li
          onClick={() => handleTabClick(2)}
          className={`${css.menu_item} ${
            activeTab === 2 ? css.active_tab : ''
          }`}
        >
          All Coins
        </li>
      </ul>
      <ul className={css.coins_list}>
        {filtered.length &&
          filtered.map((item) => (
            <CoinItem
              key={nanoid()}
              setFavoritesIcons={handleSetFavoritesIcons}
              favoritesIcons={favoritesIcons}
              name={item}
            />
          ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
