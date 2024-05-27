import { Circuitry, List } from '@phosphor-icons/react'
import { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { WindowSizeContext } from '../../utils/context/Responsive'

function Navigation() {
    const options = [
        { name: "Sobre", link: "/about" },
        { name: "Projetos", link: "/projects" },
        { name: "Contato", link: "/contact" },
    ]

    const winSize = useContext(WindowSizeContext)

    return winSize < 768 ? (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand >
                    <Link to='/home' className='flex flex-row gap-1 items-center text-slate-200 hover:text-yellow-200 transition-all font-monts'>
                        <Circuitry className='text-2xl' />
                        Luis Thalys Rodrigues
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle>
                    <List className='text-slate-200 hover:text-yellow-200 transition-all' />
                </Navbar.Toggle>
                <Navbar.Collapse>
                    <ul className='flex flex-col gap-2 justify-end items-end mt-3'>
                        {options.map((opt, index) => (
                            <Link to={opt.link} key={index}>
                                <span className='text-slate-200 hover:text-yellow-200 transition-all font-monts'>
                                    {opt.name}
                                </span>
                            </Link>
                        ))}
                    </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    ) : (
        <Container>
            <nav className='flex flex-row justify-between pt-3 ml-3 lg:ml-[5rem] lg:mr-[5rem]'>
                <div className='flex flex-row gap-2 items-center text-slate-200 hover:text-yellow-200 transition-all font-monts'>
                    <Circuitry className='text-2xl' />
                    <Link to='/home' className=''>Luis Thalys Rodrigues</Link>
                </div >
                <div className='flex flex-row gap-2'>
                    {options.map((opt, index) => (
                        <Link to={opt.link} key={index}>
                            <span className='text-slate-200 hover:text-yellow-200 transition-all font-monts'>
                                {opt.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav >
        </Container >
    )
}

export default Navigation