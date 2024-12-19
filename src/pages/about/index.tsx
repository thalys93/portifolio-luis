import React, { useContext } from 'react'
import { Col, Container, Figure, ProgressBar, Row, Spinner } from 'react-bootstrap'
import { languageThatIuse, languagesInterface, myInformations, servicesThatIProvide, socialMediaProfiles } from '../../utils/api/Consts'
import InfoButton from '../../components/infobutton';
import ServiceCard from '../../components/serviceCard';
import { WindowSizeContext } from '../../utils/context/Responsive';
import { MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax';
import Navigation from '../../components/navbar';

function About() {
  const [loading, setLoading] = React.useState({
    curriculumButton: false,
    skillButtonAdd: false,
    skillButtonRemove: false
  })
  const winSize = useContext(WindowSizeContext)
  const [defaultCount, setDefaultCount] = React.useState(6)

  function getRandomElements(array: languagesInterface[], count: number) {
    let shuffled = array.slice(0), i = array.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    return shuffled.slice(min);
  }


  function downloadCurriculum() {
    setLoading({
      ...loading,
      curriculumButton: true
    })

    setTimeout(() => {
      setLoading({
        ...loading,
        curriculumButton: false
      })
    }, 2000)

    setTimeout(() => {
      const link = document.createElement('a')
      link.href = 'pdf/curriculo.pdf'
      link.download = 'Curriculo_Luis.pdf'
      link.click()
    }, 1000)
  }

  function getLimitedLanguages(array: languagesInterface[], limit: number) {
    return array.slice(0, limit)
  }

  const setNewLimit = (limit: number, type: string) => {
    if(type === 'add')
      {
        setLoading({
          ...loading,
          skillButtonAdd: true,                
        })
      } else if(type === 'remove')
      {
        setLoading({
          ...loading,
          skillButtonRemove: true,                
        })
      }

    setTimeout(() => {
      setDefaultCount(limit)
      setLoading({
        ...loading,
        skillButtonAdd: false,
        skillButtonRemove: false
      })
    }, 650)
  }

  return (
    <>
      <Parallax>
        <Navigation />
        <Container>
          <Row className='mt-5 pt-2'>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image='/jpg/parallax1.jpg' speed={-30} className='opacity-10' />
            </section>
            <section className='flex flex-col justify-center items-center pb-[1rem] select-none'>
              <h1 className='text-xl underline underline-offset-4 uppercase text-emerald-300 font-monts z-10 animate__animated animate__fadeInDown'>
                Sobre Mim
              </h1>
              <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-25 animate__animated animate__fadeIn animate__slower'>
                Sobre Mim
              </span>
            </section>
            <Col sm className='animate__animated animate__fadeInLeft animate__slow'>
              <Figure className='flex justify-center items-center lg:pl-[10rem] mb-[3rem]'>
                <Figure.Image
                  src={socialMediaProfiles[0].image}
                  alt='Foto de perfil'
                  rounded
                  className='w-[15rem] h-[20rem] object-cover'
                />
              </Figure>
            </Col>
            <Col sm className='animate__animated animate__fadeInRight animate__slow'>
              {myInformations.map((info, i) => (
                <section key={i}>
                  <h1 className='text-slate-200 font-monts'>Olá!, Me Chamo {info.fullName.slice(5, 12)}</h1>
                  <h3 className='font-redsans text-emerald-300 font-medium'> Desenvolvedor Full-Stack </h3>
                  <p className='font-redsans text-slate-200'> Sou um desenvolvedor full-stack com expertise em <br /> diversas tecnologias sendo algumas delas:</p>
                  {getRandomElements(languageThatIuse, 5).map((lang, index, array) => (
                    <span className='text-emerald-300 font-medium'>{lang.name}{index < array.length - 1 ? ', ' : ''}</span>
                  ))}
                  <article>
                    <InfoButton
                      infoKey='fullName'
                      infoValue={info.fullName}
                      copyValue={info.fullName}
                    />

                    <InfoButton
                      infoKey='birthDate'
                      infoValue={info.birthday}
                      copyValue={info.birthday}
                    />

                    <InfoButton
                      infoKey='email'
                      infoValue={info.email}
                      copyValue={info.email}
                    />

                    <InfoButton
                      infoKey='phone'
                      infoValue={info.cellphone}
                      copyValue={info.cellphone}
                    />

                    <InfoButton
                      infoKey='city'
                      infoValue={info.city}
                      copyValue={info.city}
                    />

                    <InfoButton
                      infoKey='idioms'
                      infoValue={info.idioms}
                      copyValue={info.idioms}
                    />

                    <InfoButton
                      infoKey='freelancer'
                      infoValue={info.freelancer ? 'Sim' : 'Não'}
                      copyValue={info.freelancer ? 'Disponivel para Trabalho' : 'Não Disponivel para Trabalho'}
                    />
                  </article>
                </section>
              ))}

              <section className={winSize < 768 ? 'flex justify-center' : ''}>
                {loading.curriculumButton ? (
                  <button className='w-[6.2rem] m-5 p-2 bg-emerald-200 text-slate-800 rounded-lg uppercase font-robt font-bold hover:bg-sky-400 hover:text-sky-50 transition-all hover:rounded-md'>
                    <Spinner animation='border' className='text-sm' size="sm" />
                  </button>
                ) : (
                  <button onClick={() => downloadCurriculum()} className='m-5 p-2 bg-emerald-200 text-slate-800 rounded-lg uppercase font-monts font-bold hover:bg-sky-400 hover:text-sky-50 transition-all hover:rounded-md'>
                    Baixar CV
                  </button>
                )}
              </section>

            </Col>
          </Row>
          <Row className='pb-4'>
            <section className='flex flex-col justify-center items-center pb-[1rem] select-none'>
              <h1 className='text-xl underline underline-offset-4 uppercase text-emerald-300 font-monts z-10 animate__animated animate__fadeInDown'>
                Serviços
              </h1>
              <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-25 animate__animated animate__fadeIn animate__slower'>
                Serviços
              </span>
            </section>

            <Col sm className='flex flex-row lg:grid lg:grid-rows-2 lg:grid-flow-col gap-[1.3rem] justify-center items-center flex-wrap'>
              {servicesThatIProvide.map((service) => (
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  short_description={service.short_description}
                  icon={service.icon}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <section className='flex flex-col justify-center items-center pb-[1rem] select-none'>
              <h1 className='text-xl underline underline-offset-4 uppercase text-emerald-300 font-monts z-10 animate__animated animate__fadeInDown'>
                Minhas Skills
              </h1>
              <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-25 animate__animated animate__fadeIn animate__slower'>
                Minhas Skills
              </span>
            </section>

            <Col sm >
              <section className='flex flex-col justify-center items-center lg:ml-[10rem]'>
                <article className='animate__animated animate__fadeInLeft'>
                  <h1 className='text-slate-300 font-monts uppercase mb-3 text-lg'> Todas as minhas Habilidades <br /> Mencionadas Acima </h1>
                  <span className='text-slate-600 font-redsans uppercase text-sm'>Aqui você tem uma visão detalhada das <br /> minhas habilidades e linguagens que atuo, <br /> também é possivel ver o nível de expertise da <br /> mesma</span>
                </article>

                <article className='flex flex-row gap-2 flex-wrap lg:ml-[6rem] mt-6 mb-5 animate__animated animate__fadeInUp'>
                  {languageThatIuse.map((lang) => (
                    <div className='p-2 bg-slate-50 rounded-full'>
                      <a href={lang.icon} target='_blank'>
                        <img src={lang.icon} alt={lang.name} className='w-[2rem] h-[2rem] hover:scale-95 transition-all' />
                      </a>
                    </div>
                  ))}
                </article>
              </section>
            </Col>

            <Col sm>
              <section>
                <article>
                  {getLimitedLanguages(languageThatIuse, defaultCount).map((lang) => (
                    <div>
                      <div className='flex flex-row gap-2 items-center mb-1'>
                        <img src={lang.icon} alt={lang.name} className='w-[1rem] h-[1rem] hover:scale-95 transition-all' />
                        <h1 className='font-monts text-slate-200'>{lang.name}</h1>
                      </div>
                      <div className='flex flex-row gap-2 items-center'>
                        <ProgressBar now={lang.percent} variant='success' className='mb-2 w-[35rem] h-[0.9rem]' />
                        <span className='text-sm font-monts text-slate-200 mb-2'>{lang.percent}% </span>
                      </div>
                    </div>
                  ))}
                  <div className='flex flex-row justify-end items-end mr-[8rem] mt-4 gap-3 mb-5'>
                    <button onClick={() => setNewLimit(defaultCount + 3 , 'add')} className='bg-emerald-300 w-[2.3rem] h-[2.3rem] text-slate-800 p-2 rounded-lg uppercase font-robt font-bold hover:bg-yellow-400 transition-all hover:rounded-md'>
                      {!loading.skillButtonAdd ? <PlusCircle className='w-5 h-5 text-stone-700' weight='bold' /> : <Spinner animation='border' size="sm" className='w-5 h-5' />}
                    </button>
                    <button onClick={() => setNewLimit(defaultCount - 3, 'remove')} className='bg-emerald-300 w-[2.3rem] h-[2.3rem] text-slate-800 p-2 rounded-lg uppercase font-robt font-bold hover:bg-yellow-400 transition-all hover:rounded-md'>
                      {!loading.skillButtonRemove ? <MinusCircle className='w-5 h-5 text-stone-700' weight='bold' /> : <Spinner animation='border' size="sm" className='w-5 h-5' />}
                    </button>
                  </div>
                </article>
              </section>
            </Col>
          </Row>
        </Container>
      </Parallax >
    </>
  )
}

export default About