import { Suspense } from "react"
import Header from "@/components/Header"
import Filter from "@/components/Filter"
import CocktailCard from "@/components/CocktailCard"
import {
  getCocktailsByCategory,
  getCocktailsByGlass,
  getCocktailsByAlcoholic,
  getCategories,
  getGlasses,
  getAlcoholicFilters,
  type Cocktail,
} from "@/lib/api"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function getFilteredCocktails(params: { [key: string]: string | string[] | undefined }): Promise<Cocktail[]> {
  let cocktails: Cocktail[] = []

  if (params.category) {
    cocktails = await getCocktailsByCategory(params.category as string)
  }

  if (params.glass) {
    const glassCocktails = await getCocktailsByGlass(params.glass as string)
    cocktails = cocktails.length
      ? cocktails.filter((c) => glassCocktails.some((gc) => gc.idDrink === c.idDrink))
      : glassCocktails
  }

  if (params.type) {
    const typeCocktails = await getCocktailsByAlcoholic(params.type as string)
    cocktails = cocktails.length
      ? cocktails.filter((c) => typeCocktails.some((tc) => tc.idDrink === c.idDrink))
      : typeCocktails
  }

  if (!cocktails.length) {
    cocktails = await getCocktailsByCategory("Ordinary Drink")
  }

  return cocktails
}

export default async function Catalogue({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [categories, glasses, types] = await Promise.all([getCategories(), getGlasses(), getAlcoholicFilters()])
  const params = await searchParams

  const cocktails = await getFilteredCocktails(params)

  return (
    <div className="min-h-screen bg-amber-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-900">Elixir Catalogue</h1>
        <Filter
          categories={categories}
          glasses={glasses}
          types={types}
          initialCategory={(params.category as string) || ""}
          initialGlass={(params.glass as string) || ""}
          initialType={(params.type as string) || ""}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense fallback={<p>Brewing elixirs...</p>}>
            {cocktails.map((cocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                id={cocktail.idDrink}
                name={cocktail.strDrink}
                image={cocktail.strDrinkThumb}
              />
            ))}
          </Suspense>
        </div>
      </main>
    </div>
  )
}