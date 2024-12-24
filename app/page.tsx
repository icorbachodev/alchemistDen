'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white font-alchemist p-4">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image src="/AlchemistDenLogo.png" alt="Alchemist Den Logo" width={150} height={150} />
      </motion.div>
      <motion.div 
        className="text-3xl sm:text-5xl mb-4 text-amber-500 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Alchemist Den
      </motion.div>
      <motion.div 
        className="text-lg sm:text-xl mb-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Discover the art of cocktail making
      </motion.div>
      <Link href="/catalogue">
        <button className="bg-amber-500 text-black p-2 rounded hover:bg-amber-600">Enter the Den</button>
      </Link>
    </div>
  );
}