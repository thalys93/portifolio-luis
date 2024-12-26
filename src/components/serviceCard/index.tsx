import { Card } from 'react-bootstrap'
import { IconMapper } from '@/utils/mappers/icon.map'
import { Button } from '../ui/button'
import { Pen, Trash } from 'lucide-react'

interface serviceCard {
    id: number | string,
    title: string,
    short_description: string,
    icon: string,
    type: string
    onEditAction?: () => void
    onDeleteAction?: () => void
}

function ServiceCard({ ...props }: serviceCard) {
    switch (props.type) {
        case "user":
            return (
                <Card className='bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[15rem] select-none group transition-all hover:bg-slate-500 '>
                    <Card.Header className='flex flex-col justify-center items-center mb-2'>
                        {IconMapper(props.icon)}
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
        case "admin":
            return (
                <Card className='bg-slate-950 border-slate-500 rounded-none text-slate-50 w-[15rem] h-[15rem] select-none group transition-all hover:bg-slate-500 '>
                    <Card.Header className='flex flex-col justify-envenly mb-2'>
                        <div className='flx flex-row items-center justify-start'>
                            <Button className='bg-blue-500 text-stone-50 rounded-full w-[2rem] mr-2' size="sm" onClick={props.onEditAction}><Pen size={15} /></Button>
                            <Button className='bg-red-500 text-stone-50 w-[2rem] rounded-full' size="sm" onClick={props.onDeleteAction}><Trash size={15} /></Button>
                        </div>
                        <div className='flex justify-center items-center'>
                            {IconMapper(props.icon)}
                        </div>
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
}

export default ServiceCard