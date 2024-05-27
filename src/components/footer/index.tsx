import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { WindowSizeContext } from '../../utils/context/Responsive'
import { socialMediaProfiles } from '../../utils/api/Consts';

function Footer() {
  const actualYear = new Date().getFullYear()
  const winSize = useContext(WindowSizeContext);
  const footerClass = winSize > 768 ? 'flex flex-row justify-between items-center animate__animated animate__fadeIn animate__slow mt-[12rem] mb-3 ml-3 lg:ml-[5rem] lg:mr-[5rem]' : 'fixed justify-center items-center animate__animated animate__fadeIn animate__slow mb-[5rem]'  

  return (
    <Container>      
      <footer className={footerClass}>
        <span className='text-slate-400 select-none'>Luis Thalys {actualYear} &copy; Todos os Direitos Reservados </span>
        {winSize > 768 && (
          <ul className='flex flex-row gap-2'>
            {socialMediaProfiles.map((profile, index) => (
              <li key={index}>
                <a href={profile.link} target='_blank' rel='noreferrer'>
                  {React.cloneElement(profile.icon, { className: 'text-slate-400 hover:text-yellow-200 transition-all select-none text-2xl' },)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </Container>
  )
}

export default Footer