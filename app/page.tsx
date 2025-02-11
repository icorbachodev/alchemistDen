import Link from "next/link"
import Header from "@/components/Header"
import { getRandomCocktails } from "@/lib/api"
import CocktailCard from "@/components/CocktailCard"

export default async function Home() {
  const randomCocktails = await getRandomCocktails(6)

  return (
    <div className="min-h-screen bg-amber-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-900">Welcome to the Alchemist's Den</h1>
        <p className="text-xl text-center mb-8 text-amber-800">
          Discover and explore a wide variety of magical elixirs
        </p>
        <div className="text-center mb-8">
          <Link
            href="/catalogue"
            className="bg-amber-700 text-amber-100 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-800 transition-colors"
          >
            Explore Elixirs
          </Link>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-amber-900">Featured Concoctions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {randomCocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              id={cocktail.idDrink}
              name={cocktail.strDrink}
              image={cocktail.strDrinkThumb}
            />
          ))}
        </div>
      </main>
    </div>
  )
}