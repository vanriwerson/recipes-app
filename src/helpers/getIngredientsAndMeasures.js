export default function getIngredientsAndMeasures(recipe) {
  const ingredients = Object.entries(recipe).filter(
    (ingredient) => ingredient[0].includes('Ingredient')
    && ingredient[1] !== '' && ingredient[1] !== null,
  ).map((ingredient) => ingredient[1]);

  const measures = Object.entries(recipe).filter(
    (measure) => measure[0].includes('Measure') && measure[1] !== ' ',
  ).map((measure) => measure[1]);

  return { ingredients, measures };
}
