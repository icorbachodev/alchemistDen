'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Header({ onSearch }: { onSearch: (query: string) => void }) {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <nav className="flex sticky top-0 items-center justify-between p-4 bg-black text-white">
            <div className="flex-1"></div>
            {!isSearchActive ? (
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center flex-1 space-x-2 items-center"
                    >
                        <Image src={'/AlchemistDenLogo.png'} width={50} height={50} alt="Logo" />
                        <h1 className="text-lg font-bold text-yellow-500 font-alchemist hidden lg:block">Alchemist Den</h1>
                    </motion.div>
                </Link>
            ) : null}
            <div className="flex-1 flex justify-end">
                {!isSearchActive ? (
                    <button
                        onClick={() => setIsSearchActive(true)}
                        className="text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path stroke="white" d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                        </svg>
                    </button>
                ) : (
                    <form onSubmit={handleSearch}>
                        <motion.div
                            initial={{ width: 0, x: "50%" }}
                            animate={{ width: "100%", x: "0%" }}
                            exit={{ width: 0, x: "50%" }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-0 right-0 mx-auto flex justify-center"
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search cocktails..."
                                className="w-3/5 p-2 bg-gray-200 text-black rounded-full"
                                autoFocus
                                onBlur={() => setIsSearchActive(false)}
                            />
                        </motion.div>
                    </form>
                )}
            </div>
        </nav>
    );
}
