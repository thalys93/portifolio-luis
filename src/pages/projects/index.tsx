import { Col, Container, Row } from 'react-bootstrap'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { CompaniesThatIWorked, projects } from '../../utils/api/Consts'
import ProjectCard from '../../components/projectCard'

import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import Navigation from '../../components/navbar';
import { STATUSES } from '../../utils/enums';

function Projects() {
  const colorList = ['yellow', 'purple', 'orange', 'pink', 'cyan', 'teal', 'lime', 'lightBlue']


  const statusPriority: { [key: string]: number } = {
    [STATUSES.DONE]: 4,
    [STATUSES.PAUSED]: 3,
    [STATUSES.DEVELOPING]: 2,
    [STATUSES.DESIGN]: 1,
    [STATUSES.NEW]: 0,
  }

  return (
    <>
      <Parallax>
        <Navigation />
        <Container>
          <Row className='mt-5 pt-2'>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image="/jpg/parallax3.jpg" speed={-25} className='opacity-20' />
            </section>
            <section className='flex flex-col justify-center items-center pb-[1rem] select-none'>
              <h1 className='text-xl underline underline-offset-4 uppercase text-sky-200 font-monts z-10 animate__animated animate__fadeInDown'>
                Projetos
              </h1>
              <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-65 animate__animated animate__fadeIn animate__slower'>
                Projetos
              </span>
            </section>

            <Col sm className="flex flex-row lg:grid lg:grid-rows-2 lg:grid-flow-col gap-[1.3rem] justify-center items-center flex-wrap pb-5">
              {projects.sort((a, b) => statusPriority[a.status as keyof typeof statusPriority] - statusPriority[b.status]).map((pj) => (
                <ProjectCard
                  key={pj.id}
                  id={pj.id}
                  name={pj.name}
                  type={pj.type}
                  projectLive={pj.projectLive}
                  image={pj.image}
                  description={pj.description}
                  details={pj.details}
                  status={pj.status}
                />
              ))}
            </Col>
          </Row>

          <Row className='mt-2 pt-2'>
            <section className='flex flex-col justify-center items-center pb-[1rem] select-none pt-[1rem]'>
              <h1 className='text-xl underline underline-offset-4 uppercase text-sky-200 font-monts z-10'>
                Experiência
              </h1>
              <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-65'>
                Experiência
              </span>
            </section>


            <section className='flex flex-col select-none'>
              <Timeline position='alternate'>
                {CompaniesThatIWorked.map((company, index) => {
                  const randomColor = colorList[Math.floor(Math.random() * colorList.length)]
                  return (
                    <TimelineItem key={index} >
                      <TimelineSeparator>
                        <TimelineDot style={{ padding: 7, backgroundColor: randomColor }} />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h2 className='text-slate-200 font-monts font-bold'>{company.name}</h2>
                        <span className='text-slate-300 font-monts font-medium'>{company.position}</span>
                        <p className='text-slate-400 font-monts font-light'>{company.startDate} a {company.endDate}</p>
                        <p className='text-slate-500 font-monts font-light normal-case'>{company.description}</p>
                      </TimelineContent>
                    </TimelineItem>
                  )
                })}
              </Timeline>
            </section>
          </Row>
        </Container >
      </Parallax >
    </>
  )
}

export default Projects