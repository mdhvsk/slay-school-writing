import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Slay</h1>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">Writing Tool</div>
        </header>)
}

export default Header