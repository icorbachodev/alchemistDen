'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface FilterOption {
  strCategory?: string;
  strGlass?: string;
  strAlcoholic?: string;
}

export default function Catalogue() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [glasses, setGlasses] = useState<string[]>([]);
  const [alcoholicOptions, setAlcoholicOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedGlass, setSelectedGlass] = useState<string>('');
  const [selectedAlcoholic, setSelectedAlcoholic] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(response => response.json())
      .then(data => setCategories(data.drinks.map((drink: FilterOption) => drink.strCategory)));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
      .then(response => response.json())
      .then(data => setGlasses(data.drinks.map((drink: FilterOption) => drink.strGlass)));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
      .then(response => response.json())
      .then(data => setAlcoholicOptions(data.drinks.map((drink: FilterOption) => drink.strAlcoholic)));
  }, []);

  useEffect(() => {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
    if (selectedCategory){ url += `c=${selectedCategory}&`} else { url += 'i=Gin&'; };
    if (selectedGlass) { url += `g=${selectedGlass}&` };
    if (selectedAlcoholic) { url += `a=${selectedAlcoholic}&` };
    if (searchQuery) { url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}` };

    fetch(url)
      .then(response => response.json())
      .then(data => setCocktails(data.drinks));
  }, [selectedCategory, selectedGlass, selectedAlcoholic, searchQuery]);

  const handleCocktailClick = (cocktailName: string) => {
    const formattedName = cocktailName.toLowerCase()
    router.push(`/catalogue/${formattedName}`);
  };

  return (
    <div className="bg-black min-h-screen text-white font-alchemist p-4">
      <Header onSearch={setSearchQuery} />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-amber-500">Cocktail Catalogue</h1>
        <div className="flex flex-col sm:flex-row justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={selectedGlass}
            onChange={(e) => setSelectedGlass(e.target.value)}
          >
            <option value="">All Glasses</option>
            {glasses.map((glass) => (
              <option key={glass} value={glass}>{glass}</option>
            ))}
          </select>
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={selectedAlcoholic}
            onChange={(e) => setSelectedAlcoholic(e.target.value)}
          >
            <option value="">All Types</option>
            {alcoholicOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cocktails.map(cocktail => (
            <motion.div
              key={cocktail.idDrink}
              className="bg-transparent p-6 rounded-lg shadow-lg items-center text-center flex flex-col cursor-pointer transition-transform duration-300 border border-amber-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCocktailClick(cocktail.strDrink)}
            >
              <Image src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width={300} height={300} className="rounded-lg mb-4 object-cover border border-amber-500" />
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-amber-400">{cocktail.strDrink}</h3>
              <p className="text-gray-300">Click to see more details</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}