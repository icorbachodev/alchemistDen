const API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1"

export interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strCategory?: string
  strAlcoholic?: string
  strGlass?: string
  strInstructions?: string
  [key: string]: string | undefined
}

export async function getRandomCocktails(count = 6): Promise<Cocktail[]> {
  const cocktails: Cocktail[] = []
  const seenIds = new Set<string>()

  while (cocktails.length < count) {
    const response = await fetch(`${API_BASE_URL}/random.php`)
    const data = await response.json()
    const cocktail = data.drinks[0]

    if (!seenIds.has(cocktail.idDrink)) {
      seenIds.add(cocktail.idDrink)
      cocktails.push(cocktail)
    }
  }

  return cocktails
}

export async function getCocktailsByCategory(category: string): Promise<Cocktail[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`)
  const data = await response.json()
  return data.drinks
}

export async function getCocktailsByGlass(glass: string): Promise<Cocktail[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?g=${glass}`)
  const data = await response.json()
  return data.drinks
}

export async function getCocktailDetails(id: string): Promise<Cocktail> {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`)
  const data = await response.json()
  return data.drinks[0]
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/list.php?c=list`)
  const data = await response.json()
  return data.drinks.map((item: { strCategory: string }) => item.strCategory)
}

export async function getGlasses(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/list.php?g=list`)
  const data = await response.json()
  return data.drinks.map((item: { strGlass: string }) => item.strGlass)
}

export async function getCocktailsByAlcoholic(alcoholic: string): Promise<Cocktail[]> {
  const response = await fetch(`${API_BASE_URL}/filter.php?a=${alcoholic}`)
  const data = await response.json()
  return data.drinks
}

export async function getAlcoholicFilters(): Promise<string[]> {
  return ["Alcoholic", "Non alcoholic", "Optional alcohol"]
}