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

async function fetchWithTimeout(url: string, timeout = 10000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function getRandomCocktails(count = 6): Promise<Cocktail[]> {
  const cocktails: Cocktail[] = []
  const seenIds = new Set<string>()

  while (cocktails.length < count) {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/random.php`)
      const data = await response.json()
      const cocktail = data.drinks[0]

      if (!seenIds.has(cocktail.idDrink)) {
        seenIds.add(cocktail.idDrink)
        cocktails.push(cocktail)
      }
    } catch (error) {
      console.error("Error fetching random cocktail:", error)
      break
    }
  }

  return cocktails
}

export async function getCocktailsByCategory(category: string): Promise<Cocktail[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/filter.php?c=${category}`)
    const data = await response.json()
    return data.drinks || []
  } catch (error) {
    console.error("Error fetching cocktails by category:", error)
    return []
  }
}

export async function getCocktailsByGlass(glass: string): Promise<Cocktail[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/filter.php?g=${glass}`)
    const data = await response.json()
    return data.drinks || []
  } catch (error) {
    console.error("Error fetching cocktails by glass:", error)
    return []
  }
}

export async function getCocktailDetails(id: string): Promise<Cocktail | null> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/lookup.php?i=${id}`)
    const data = await response.json()
    return data.drinks ? data.drinks[0] : null
  } catch (error) {
    console.error("Error fetching cocktail details:", error)
    return null
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/list.php?c=list`)
    const data = await response.json()
    return data.drinks ? data.drinks.map((item: { strCategory: string }) => item.strCategory) : []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getGlasses(): Promise<string[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/list.php?g=list`)
    const data = await response.json()
    return data.drinks ? data.drinks.map((item: { strGlass: string }) => item.strGlass) : []
  } catch (error) {
    console.error("Error fetching glasses:", error)
    return []
  }
}

export async function getCocktailsByAlcoholic(alcoholic: string): Promise<Cocktail[]> {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/filter.php?a=${alcoholic}`)
    const data = await response.json()
    return data.drinks || []
  } catch (error) {
    console.error("Error fetching cocktails by alcoholic content:", error)
    return []
  }
}

export async function getAlcoholicFilters(): Promise<string[]> {
  return ["Alcoholic", "Non alcoholic", "Optional alcohol"]
}