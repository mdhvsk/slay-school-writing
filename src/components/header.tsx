import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

const Header = () => {
    return (
        <header className="flex justify-between items-center mb-8">
            <Link className="text-2xl font-semibold" href={'/landing'}>                       
            <Image src="/slay-white.png" alt="Slay Logo" width={64} height={32} />
            </Link>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">Writing Assistant</div>
        </header>)
}

export default Header