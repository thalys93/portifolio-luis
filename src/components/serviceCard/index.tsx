import { Card } from 'react-bootstrap'
import React from 'react'

interface serviceCard {
    id: number,
    title: string,
    short_description: string,
    icon: JSX.Element,
}

function ServiceCard({ ...props }: serviceCard) {
    return (
        <Card className='bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[15rem] select-none group transition-all hover:bg-slate-500 hover:scale-95'>
            <Card.Header className='flex flex-col justify-center items-center mb-2'>
                {React.cloneElement(props.icon, { className: 'text-4xl' })}
            </Card.Header>
            <Card.Title>                
                <h1 className='text-center text-[0.8rem] font-monts'>{props.title}</h1>
            </Card.Title>
            <Card.Body className='flex flex-col justify-center items-center'>
                <Card.Text className='text-slate-300 font-robt font-light text-center text-[0.9rem]'>
                    {props.short_description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ServiceCard