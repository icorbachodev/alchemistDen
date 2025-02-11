"use client"

import { useState } from "react"

interface FilterProps {
  categories: string[]
  glasses: string[]
  types: string[]
  onFilterChange: (filters: { category: string; glass: string; type: string }) => void
}

export default function Filter({ categories, glasses, types, onFilterChange }: FilterProps) {
  const [category, setCategory] = useState("")
  const [glass, setGlass] = useState("")
  const [type, setType] = useState("")

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
    onFilterChange({ category: e.target.value, glass, type })
  }

  const handleGlassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGlass(e.target.value)
    onFilterChange({ category, glass: e.target.value, type })
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
    onFilterChange({ category, glass, type: e.target.value })
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={category}
        onChange={handleCategoryChange}
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
        onChange={handleGlassChange}
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
        onChange={handleTypeChange}
        className="p-2 border-2 border-amber-700 rounded-md bg-amber-50 text-amber-900"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  )
}