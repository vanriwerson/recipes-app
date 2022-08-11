import React from 'react';
import { useHistory } from 'react-router-dom';
import { Martini, ForkKnife } from 'phosphor-react';

function Footer() {
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <footer
      className="footer-container"
      data-testid="footer"
    >

      <button
        type="button"
        value="foods"
        disabled={ pathname.includes('foods') }
        onClick={ () => history.push('/foods') }
      >
        <ForkKnife size={ 23 } weight="duotone" />
        Foods
      </button>

      <button
        type="button"
        value="drinks"
        disabled={ pathname.includes('drinks') }
        onClick={ () => history.push('/drinks') }
      >
        <Martini size={ 23 } weight="duotone" />
        Drinks
      </button>

    </footer>
  );
}

export default Footer;
