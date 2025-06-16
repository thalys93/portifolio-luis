import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'

type layoutProps = {
    children: React.ReactNode
}

function PublicLayout({ children }: layoutProps) {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navigation/>
                {children}
            <Footer/>
        </main>
    )
}

export default PublicLayout