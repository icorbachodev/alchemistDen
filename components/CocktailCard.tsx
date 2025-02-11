"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface CocktailCardProps {
  id: string
  name: string
  image: string
}

export default function CocktailCard({ id, name, image }: CocktailCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-amber-50 rounded-lg shadow-md overflow-hidden border-2 border-amber-700"
    >
      <Link href={`/catalogue/${id}`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-amber-900">{name}</h3>
        </div>
      </Link>
    </motion.div>
  )
}