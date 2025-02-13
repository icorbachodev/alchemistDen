"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface FilterProps {
  categories: string[]
  glasses: string[]
  types: string[]
  initialCategory: string
  initialGlass: string
  initialType: string
}

export default function Filter({
  categories,
  glasses,
  types,
  initialCategory,
  initialGlass,
  initialType,
}: FilterProps) {
  const [category, setCategory] = useState(initialCategory || "")
  const [glass, setGlass] = useState(initialGlass || "")
  const [type, setType] = useState(initialType || "")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const updateFilters = async () => {
      const params = new URLSearchParams(searchParams.toString())
      setCategory(params.get("category") || "")
      setGlass(params.get("glass") || "")
      setType(params.get("type") || "")
    }
    updateFilters()
  }, [searchParams])

  const handleFilterChange = async (filterType: "category" | "glass" | "type", value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filterType === "category") setCategory(value)
    if (filterType === "glass") setGlass(value)
    if (filterType === "type") setType(value)

    if (value) {
      params.set(filterType, value)
    } else {
      params.delete(filterType)
    }

    router.push(`/catalogue?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
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
        onChange={(e) => handleFilterChange("glass", e.target.value)}
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
        onChange={(e) => handleFilterChange("type", e.target.value)}
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