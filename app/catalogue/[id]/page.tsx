import Image from "next/image"
import Header from "@/components/Header"
import { getCocktailDetails, type Cocktail } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function ElixirDetail({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const cocktail: Cocktail | null = await getCocktailDetails(id)

  if (!cocktail) {
    notFound()
  }

  const ingredients = Object.entries(cocktail)
    .filter(([key, value]) => key.startsWith("strIngredient") && value)
    .map(([key, value]) => {
      const index = key.replace("strIngredient", "")
      return {
        ingredient: value as string,
        measure: cocktail[`strMeasure${index}` as keyof Cocktail] as string | undefined,
      }
    })

  return (
    <div className="min-h-screen bg-amber-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-amber-50 rounded-lg shadow-md p-6 border-2 border-amber-700">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Image
                src={cocktail.strDrinkThumb || "/placeholder.svg"}
                alt={cocktail.strDrink}
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h1 className="text-3xl font-bold mb-4 text-amber-900">{cocktail.strDrink}</h1>
              {cocktail.strCategory && (
                <p className="mb-4 text-amber-800">
                  <span className="font-semibold">Category:</span> {cocktail.strCategory}
                </p>
              )}
              {cocktail.strGlass && (
                <p className="mb-4 text-amber-800">
                  <span className="font-semibold">Vessel:</span> {cocktail.strGlass}
                </p>
              )}
              {cocktail.strAlcoholic && (
                <p className="mb-4 text-amber-800">
                  <span className="font-semibold">Type:</span> {cocktail.strAlcoholic}
                </p>
              )}
              <h2 className="text-xl font-semibold mb-2 text-amber-900">Ingredients:</h2>
              <ul className="list-disc list-inside mb-4 text-amber-800">
                {ingredients.map(({ ingredient, measure }, index) => (
                  <li key={index}>{measure ? `${measure} ${ingredient}` : ingredient}</li>
                ))}
              </ul>
              {cocktail.strInstructions && (
                <>
                  <h2 className="text-xl font-semibold mb-2 text-amber-900">Alchemical Process:</h2>
                  <p className="text-amber-800">{cocktail.strInstructions}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}