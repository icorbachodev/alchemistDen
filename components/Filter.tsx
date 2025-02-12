"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface FilterProps {
  categories: string[]
  glasses: string[]
  types: string[]
}

export default function Filter({ categories, glasses, types }: FilterProps) {
  const [category, setCategory] = useState("")
  const [glass, setGlass] = useState("")
  const [type, setType] = useState("")
  const router = useRouter()

  const handleFilterChange = () => {
    const searchParams = new URLSearchParams()
    if (category) searchParams.append("category", category)
    if (glass) searchParams.append("glass", glass)
    if (type) searchParams.append("type", type)
    router.push(`/catalogue?${searchParams.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border-2 border-amber-700 rounded-md bg-amber-50 text-amber-900"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={glass}
        onChange={(e) => setGlass(e.target.value)}
        className="p-2 border-2 border-amber-700 rounded-md bg-amber-50 text-amber-900"
      >
        <option value="">All Vessels</option>
        {glasses.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border-2 border-amber-700 rounded-md bg-amber-50 text-amber-900"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button
        onClick={handleFilterChange}
        className="bg-amber-700 text-amber-100 px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  )
}