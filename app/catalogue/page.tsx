import { Suspense } from "react"
import Header from "@/components/Header"
import Filter from "@/components/Filter"
import CocktailCard from "@/components/CocktailCard"
import { getCocktailsByCategory, getCategories, getGlasses, getAlcoholicFilters } from "../../lib/api"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Catalogue() {
  const [categories, glasses, types, initialCocktails] = await Promise.all([
    getCategories(),
    getGlasses(),
    getAlcoholicFilters(),
    getCocktailsByCategory("Ordinary Drink"),
  ])

  return (
    <div className="min-h-screen bg-amber-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-900">Elixir Catalogue</h1>
        <Filter categories={categories} glasses={glasses} types={types} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense fallback={<p>Loading elixirs...</p>}>
            {initialCocktails.map((cocktail) => (
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