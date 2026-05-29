import React from 'react'

const AuthLayout = ( { children } : any) => {
    return (
        <main className='w-full h-screen flex items-center justify-center'>
            { children }
        </main>
    )
}

export default AuthLayout