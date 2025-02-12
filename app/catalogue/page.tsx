"use client"

import { useState, useEffect, Suspense } from "react"
import Header from "@/components/Header"
import Filter from "@/components/Filter"
import {
  getCocktailsByCategory,
  getCocktailsByGlass,
  getCocktailsByAlcoholic,
  getCategories,
  getGlasses,
  getAlcoholicFilters,
} from "@/lib/api"
import dynamic from "next/dynamic"

const CocktailCard = dynamic(() => import("@/components/CocktailCard"), {
  loading: () => <p>Loading...</p>,
})

interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

interface FilterOptions {
  category: string
  glass: string
  type: string
}

export default function Catalogue() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [glasses, setGlasses] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [categoriesData, glassesData, typesData, initialCocktails] = await Promise.all([
          getCategories(),
          getGlasses(),
          getAlcoholicFilters(),
          getCocktailsByCategory("Ordinary Drink"),
        ])
        setCategories(categoriesData)
        setGlasses(glassesData)
        setTypes(typesData)
        setCocktails(initialCocktails)
        setError(null)
      } catch (err) {
        console.error("Error fetching initial data:", err)
        setError("Failed to load initial data. Please try again later.")
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  const handleFilterChange = async ({ category, glass, type }: FilterOptions) => {
    setLoading(true)
    setError(null)
    try {
      let filteredCocktails: Cocktail[]
      if (category) {
        filteredCocktails = await getCocktailsByCategory(category)
      } else if (glass) {
        filteredCocktails = await getCocktailsByGlass(glass)
      } else if (type) {
        filteredCocktails = await getCocktailsByAlcoholic(type)
      } else {
        filteredCocktails = await getCocktailsByCategory("Ordinary Drink")
      }
      setCocktails(filteredCocktails)
    } catch (err) {
      console.error("Error applying filters:", err)
      setError("Failed to apply filters. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-amber-900">Elixir Catalogue</h1>
        <Filter categories={categories} glasses={glasses} types={types} onFilterChange={handleFilterChange} />
        {loading ? (
          <p className="text-center text-amber-800">Brewing elixirs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={<p>Loading...</p>}>
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
        )}
      </main>
    </div>
  )
}