import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-amber-900 text-amber-100 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Alchemist's Den
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-amber-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/catalogue" className="hover:text-amber-300">
              Elixirs
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}