'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface CocktailDetails {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strGlass: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

export default function Page() {
  const [cocktail, setCocktail] = useState<CocktailDetails | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const formattedName = (id as string);
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${formattedName}`)
        .then(response => response.json())
        .then(data => setCocktail(data.drinks[0]))
        .catch(error => console.error('Error fetching cocktail details:', error));
    }
  }, [id]);

  if (!cocktail) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="flex items-center bg-black min-h-screen text-white font-alchemist p-4">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width={500} height={500} className="rounded-lg object-cover border-4 border-amber-500 shadow-lg" />
          </motion.div>
          <motion.div
            className="flex flex-col justify-center p-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl text-center sm:text-4xl md:text-5xl md:text-left font-bold text-amber-500 mb-8">{cocktail.strDrink}</h1>
            <p className="text-lg mb-2"><strong>Category:</strong> {cocktail.strCategory}</p>
            <p className="text-lg mb-2"><strong>Glass:</strong> {cocktail.strGlass}</p>
            <p className="text-lg mb-8"><strong>Instructions:</strong> {cocktail.strInstructions}</p>
            <Link href="/catalogue">
              <button className="bg-amber-500 text-black p-2 rounded hover:bg-amber-600 w-full">Back to catalogue</button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}