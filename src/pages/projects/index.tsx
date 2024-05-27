import { Card, Col, Container, Row } from 'react-bootstrap'
import { CompaniesThatIWorked, CompaniesThatIWorkedInterface, projects } from '../../utils/api/Consts'
import ProjectCard from '../../components/projectCard'

function Projects() {

  function limitedTimeline(array: CompaniesThatIWorkedInterface[], start: number, end: number) {
    return array.slice(start, end)
  }

  return (
    <Container fluid>
      <Row className='bg-darkSection mt-5 pt-2'>
        <section className='flex flex-col justify-center items-center pb-[1rem] select-none'>
          <h1 className='text-xl underline underline-offset-4 uppercase text-yellow-200 font-monts z-10'>
            Projetos
          </h1>
          <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-65'>
            Projetos
          </span>
        </section>
        <Col sm className="flex flex-row lg:grid lg:grid-rows-2 lg:grid-flow-col gap-[1.3rem] justify-center items-center flex-wrap pb-5">
          {projects.map((pj) => (
            <ProjectCard
              key={pj.id}
              id={pj.id}
              name={pj.name}
              type={pj.type}
              link={pj.link}
              image={pj.image}
              description={pj.description}
            />
          ))}
        </Col>
      </Row>

      <Row className='mt-5 pt-2'>
        <section className='flex flex-col justify-center items-center pb-[1rem] select-none'>
          <h1 className='text-xl underline underline-offset-4 uppercase text-yellow-200 font-monts z-10'>
            Experiência
          </h1>
          <span className='text-3xl relative top-[-1.2rem] uppercase tracking-[0.3rem] opacity-65'>
            Experiência
          </span>
        </section>

        <section className='flex flex-col justify-center items-center pl-[5rem]'>
         
        </section>
      </Row>
    </Container>
  )
}

export default Projects