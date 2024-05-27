import { Col, Container, Figure, Row } from 'react-bootstrap'
import { socialMediaProfiles } from '../../utils/api/Consts'

function Home() {
  const hoverConst = 'hover:text-yellow-200 font-bold transition-all select-none'
  
  return (
    <Container>
      <Row className='m-2 pt-[3rem] lg:m-5 lg:pt-10 '>
        <Col sm>
          <section className='justify-center items-center flex lg:mt-[15rem] select-none animate__animated animate__fadeInDown'>
            <article>
              <h1 className='text-slate-50 font-monts font-light text-4xl mb-3'> Seu projeto em <b className='text-slate-400 font-medium font-redsans hover:text-yellow-200 transition-all'>Boas Mãos</b></h1>
              <span className='text-slate-100 font-light font-redsans'> Garantindo soluções <b className={hoverConst}>práticas</b> e <b className={hoverConst}>uteis</b> para o seu negócio</span>
            </article>
          </section>
        </Col>        
        <Col sm>          
          <section className='justify-center items-center flex select-none lg:mt-[5rem]'>
            <article className='mt-2'>
              <a href={socialMediaProfiles[2].link} target='_blank' rel='noreferrer'  >
                <Figure className='items-center flex mt-5 gap-3 lg:mt-[7rem] flex-col animate__animated animate__fadeInDown'>
                  <Figure.Image
                    src={socialMediaProfiles[0].image}
                    roundedCircle width={200} />
                  <Figure.Caption className='animate__animated animate__fadeInDown animate__slow animate__delay-1s flex flex-col'>
                    <span className='text-slate-50 font-monts font-light text-sm mb-3 hover:text-yellow-200 transition-all text-center'>Luis Thalys Rodrigues <br /> 
                    <span className='text-[0.7rem] font-redsans font-extralight'>Desenvolvedor Full-Stack</span> </span>                    
                  </Figure.Caption>
                </Figure>
              </a>
            </article>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Home