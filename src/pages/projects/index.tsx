import { Col, Container, Row } from 'react-bootstrap'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { CompaniesThatIWorkedInterface, projectsInterface } from '../../utils/api/Consts'
import ProjectCard from '../../components/projectCard'

import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import Navigation from '../../components/navbar';
import { STATUSES } from '../../utils/enums';
import { useEffect } from 'react';
import { useFirebase } from '@/utils/context/FirebaseProvider';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import React from 'react';

function Projects() {
  const colorList = ['yellow', 'purple', 'orange', 'pink', 'cyan', 'teal', 'lime', 'lightBlue']
  const statusPriority: { [key: string]: number } = {
    [STATUSES.DONE]: 5,
    [STATUSES.DISCOUNTINUED]: 4,
    [STATUSES.PAUSED]: 3,
    [STATUSES.DEVELOPING]: 2,
    [STATUSES.DESIGN]: 1,
    [STATUSES.NEW]: 0,
  }

  const [projects, setProjects] = React.useState<projectsInterface[]>([])
  const [companiesThatWork, setCompaniesThatWork] = React.useState<CompaniesThatIWorkedInterface[]>([])

  const firebaseApp = useFirebase();
  const db = getFirestore(firebaseApp)

  useEffect(() => {
    async function handleGetExperiencies() {
      const projectsRef = collection(db, 'experiences');
      const q = query(projectsRef, orderBy("endDate", "desc"))    

      return await getDocs(q).then((res) => {
        const data = res.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            position: doc.data().position,
            description: doc.data().description,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate
          }
        })
        setCompaniesThatWork(data)
      }).catch((err) => {
        console.log(err)
      })
    }

    async function handleGetProjects() {
      const projectsRef = collection(db, 'projects');

      return await getDocs(projectsRef).then((res) => {
        const data = res.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            status: doc.data().status,
            type: doc.data().type,
            projectLive: doc.data().projectLive,
            projectRepository: doc.data().projectRepository,
            image: doc.data().image,
            conceptArt: doc.data().conceptArt,
            details: doc.data().details
          }
        })
        setProjects(data)
      }).catch((err) => {
        console.log(err)
      })
    }

    handleGetProjects()
    handleGetExperiencies()
  }, [projects.length, companiesThatWork.length])

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
              <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-25 animate__animated animate__fadeIn animate__slower'>
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
              <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-25'>
                Experiência
              </span>
            </section>


            <section className='flex flex-col select-none'>
              <Timeline position='alternate'>
                {companiesThatWork.map((company, index) => {
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