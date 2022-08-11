// para setar e recuperar mealsToken e cocktailsToken
export function setTokenInLocalStorage(key, token = 1) {
  localStorage.setItem(key, token);
}

// export function getTokenFromLocalStorage(key) {
//   localStorage.getItem(key);
// }

// para setar e recuperar o usuário
export const setProfileInLocalStorage = (profile) => {
  localStorage.setItem('user', JSON.stringify(profile));
};

export const getProfileFromLocalStorage = () => {
  const profile = localStorage.getItem('user')
   && JSON.parse(localStorage.getItem('user'));
  return profile?.email;
};

// para setar e recuperar receitas
export const setRecipeInLocalStorage = (key, recipe) => {
  localStorage.setItem(key, JSON.stringify(recipe));
};

export const getRecipeFromLocalStorage = (key) => {
  const recipes = localStorage.getItem(key)
   && JSON.parse(localStorage.getItem(key));
  return recipes || [];
};
