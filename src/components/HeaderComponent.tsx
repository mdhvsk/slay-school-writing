import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

const HeaderComponent = () => {
    return (
        <header className="flex justify-between items-center mb-8">
            <Link className="text-2xl font-semibold hover:bg-gray-500 py-2 px-4 rounded-full" href={'/landing'}>                       
            <Image src="/slay-white.png" alt="Slay Logo" width={64} height={32} />
            </Link>
            <div className="px-3 py-1 rounded-full text-md">Writing Assistant</div>
        </header>)
}

export default HeaderComponent