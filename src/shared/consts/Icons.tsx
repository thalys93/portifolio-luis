import { Code, Computer, DollarSign, Globe, Image, List, Rocket, Palette, Server, Database, Zap, Smartphone } from "lucide-react";

export const IconsSelect = [
    {
        value: "code",
        label: "Code",
        icon: <Code className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "dollar-sign",
        label: "DollarSign",
        icon: <DollarSign className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "globe",
        label: "Globe",
        icon: <Globe className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "rocket",
        label: "Rocket",
        icon: <Rocket className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "list",
        label: "List",
        icon: <List className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "image",
        label: "Image",
        icon: <Image className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "computer",
        label: "Computer",
        icon: <Computer className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "pallete",
        label: "Pallete",
        icon: <Palette className='w-5 h-5 mr-1 inline-block' />        
    },
    {
        value: "server",
        label: "Server",
        icon: <Server className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "database",
        label: "Database",
        icon: <Database className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "zap",
        label: "Zap",
        icon: <Zap className='w-5 h-5 mr-1 inline-block' />
    },
    {
        value: "mobile",
        label: "Mobile",
        icon: <Smartphone className='w-5 h-5 mr-1 inline-block' />
    },
]

export function getIcon(value: string) {
    const icon = IconsSelect.find((x) => x.value === value)
    return icon?.icon
}