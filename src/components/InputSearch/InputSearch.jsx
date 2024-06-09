import { useState, useRef, useEffect } from 'react';
import '@vscode/codicons/dist/codicon.css';
import css from './InputSearch.module.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { fetсhCoins } from '../../api/api';

const InputSearch = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [coins, setCoins] = useState([]);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const getCoins = async () => {
      const response = await fetсhCoins();
      setCoins(response);
    };
    getCoins();
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleClickOutside = (event) => {
    const { current } = menuRef;
    if (
      current &&
      !current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuVisible]);

  return (
    <nav className={css.navbar}>
      <button ref={buttonRef} className={css.search_btn} onClick={toggleMenu}>
        <span className={`codicon codicon-search ${css.icon}`}></span>
        Search
      </button>
      {isMenuVisible && (
        <DropdownMenu coins={coins} buttonRef={buttonRef} menuRef={menuRef} />
      )}
    </nav>
  );
};

export default InputSearch;
