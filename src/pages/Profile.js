import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SignOut, Check, Heart } from 'phosphor-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import ProfileScreenAnimation from '../animations/ProfileScreenAnimation';

function Profile() {
  // history
  const history = useHistory();
  const { email } = useContext(RecipesContext);

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header pageTitle="Profile" />
      <div className="profile-container">
        <div className="profile-animation">
          <ProfileScreenAnimation />
        </div>
        <p data-testid="profile-email">{`Email: ${email}`}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          <Check size={ 32 } weight="fill" />
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <Heart size={ 32 } weight="fill" />
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          <SignOut size={ 32 } weight="fill" />
          Logout
        </button>

      </div>
      <Footer />
    </>
  );
}

export default Profile;
