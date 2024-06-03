import { Copy } from '@phosphor-icons/react'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

type InfoKey = 'fullName' | 'birthDate' | 'email' | 'phone' | 'address' | 'city' | 'idioms' | 'freelancer'

interface InfoButtonProps {
    infoKey: InfoKey
    infoValue: string
    copyValue: string    
}

function InfoButton({ infoKey, infoValue, copyValue }: InfoButtonProps) {
    const [showPopup, setShowPopup] = React.useState(false)

    const commonClass = "flex flex-row gap-1 items-center text-slate-400 select-none cursor-pointer hover:text-emerald-200 transition-all group"

    function copyToClipboard(text: string) {
        setShowPopup(true)
        navigator.clipboard.writeText(text)

        setTimeout(() => {
            setShowPopup(false)
        }, 2000)
    }

    const informationsMap: Record<InfoKey, string> = {
        'fullName': 'Nome Completo',
        'birthDate': 'Data de Nascimento',
        'email': 'Email',
        'phone': 'Telefone',
        'address': 'Endereço',
        'city': 'Cidade',
        'idioms': 'Idiomas',
        'freelancer': 'Freelancer'
    }

    const Toast = (text: string) => (
        <Tooltip>
            Copiado {text}
        </Tooltip>
    )

    return (
        <OverlayTrigger
            placement='right'
            show={showPopup}
            overlay={Toast(informationsMap[infoKey])}
            onToggle={() => setShowPopup(!showPopup)}
            trigger={'click'}
        >
            <button className={commonClass} onClick={() => copyToClipboard(copyValue)}>
                <Copy />
                <b>{informationsMap[infoKey]}</b>
                <span className='text-slate-500 group-hover:text-emerald-300'>{infoValue}</span>
            </button>

        </OverlayTrigger>
    )
}

export default InfoButton