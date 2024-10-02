import { Badge } from 'react-bootstrap';

interface progressChipProps {
    title: string;
    color: string;
    icon?: JSX.Element;
}

function ProgressChip({ ...details }: progressChipProps) {
    return (
        <Badge bg={details.color}>
            <section className='flex flex-row gap-2 items-center'>
                <span>{details.icon}</span>
                <span className='font-medium font-robt tracking-wider'>{details.title}</span>
            </section>            
        </Badge>
    )
}

export default ProgressChip