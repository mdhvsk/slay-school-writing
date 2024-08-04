import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className="flex justify-between items-center mb-8">
            <Link className="text-2xl font-semibold" href={'/landing'}>Slay</Link>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">Writing Assistant</div>
        </header>)
}

export default Header