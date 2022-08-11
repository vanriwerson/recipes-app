import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { MagnifyingGlass, UserCircle } from 'phosphor-react';
import SearchBar from './SearchBar';

function Header({ pageTitle }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const mustRenderSearchIcon = () => {
    const noSearchIconTitles = ['Profile', 'Done Recipes', 'Favorite Recipes'];
    const mustRender = !noSearchIconTitles.some((title) => title === pageTitle);
    return mustRender;
  };

  const redirectToProfile = () => {
    history.push('/profile');
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <header className="header-container">
      <h1 data-testid="page-title">{ pageTitle }</h1>
      <div className="buttons-header">
        {mustRenderSearchIcon() && (
          <button
            type="button"
            onClick={ toggleSearchBar }
            data-testid="search-btn"
          >
            <MagnifyingGlass size={ 32 } />
          </button>
        )}
        <button
          type="button"
          onClick={ redirectToProfile }
          data-testid="profile-btn"
          disabled={ pathname.includes('profile') }
        >
          <UserCircle size={ 32 } />
        </button>
      </div>
      {isSearchBarVisible && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
