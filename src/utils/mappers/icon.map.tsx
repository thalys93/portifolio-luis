import { Browser, DeviceMobile, Devices, Envelope, GithubLogo, InstagramLogo, LinkedinLogo, PipeWrench, Users, WebhooksLogo, WhatsappLogo } from '@phosphor-icons/react';

export function IconMapper(icon: string) {
    switch (icon) {
        case "Github" :
            return <GithubLogo className='text-4xl'/>
        case "Linkedin" :
            return <LinkedinLogo className='text-4xl' />
        case "Instagram" :
            return <InstagramLogo className='text-4xl' />
        case "Whatsapp" :
            return <WhatsappLogo className='text-4xl' />
        case "Geral" :
            return <Users className='text-4xl' />
        case "Webhooks" :
            return <WebhooksLogo className='text-4xl' />
        case "Email" :
            return <Envelope className='text-4xl' />
        case "Outros" :
            return <PipeWrench className='text-4xl' />
        case "Celular" :
            return <DeviceMobile className='text-4xl' />
        case "Desktop" :
            return <Browser className='text-4xl' />
        case "Tablet" :
            return <Devices className='text-4xl' />
    }
}