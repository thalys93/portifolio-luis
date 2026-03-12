import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { SnowEffect } from '@/components/SnowEffect'
import { ChristmasDecorations } from '@/components/ChristmasDecorations'
import { DocumentHead } from '@/components/DocumentHead'
import React from 'react'

type layoutProps = {
    children: React.ReactNode
}

function PublicLayout({ children }: layoutProps) {
    return (
        <main className="min-h-screen bg-background text-foreground relative">
            <DocumentHead />
            <SnowEffect />
            <ChristmasDecorations />
            <Navigation/>
                {children}
            <Footer/>
        </main>
    )
}

export default PublicLayout