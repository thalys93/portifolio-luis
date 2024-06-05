import { CheckCircle, Envelope, IdentificationCard } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { WindowSizeContext } from '../../utils/context/Responsive'
import { Formik } from 'formik'
import emailJS from '@emailjs/browser'
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'
import Navigation from '../../components/navbar'


interface formProps {
  name: string
  email: string
  message: string
}

function Contact() {
  const winSize = useContext(WindowSizeContext)
  const actualYear = new Date().getFullYear()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const initialValues: formProps = {
    name: '',
    email: '',
    message: ''
  }

  const handleSendEmail = (values: formProps) => {
    setIsLoading(true)


    const mappedValues = {
      'from_name': values.name,
      'from_email': values.email,
      'message': values.message
    }

    emailJS.send('service_cnjxc0i', 'template_vq5rzgv', mappedValues, 'HswrHwcyyMGpwmoR4')
      .then((res) => {
        if (res.status === 200) {
          setIsSuccess(true)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })

    setTimeout(() => {
      setIsSuccess(false)
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <Parallax>
        <Navigation />
        <Container>
          <Row className='bg-slate-50 lg:mt-[7rem] mb-3 lg:mb-0 rounded flex justify-center items-center lg:ml-[5rem] lg:mr-[5rem] pb-2'>
            <section className='animate__animated animate__fadeIn -z-50'>
              <ParallaxBannerLayer image="/public/jpg/parallax4.jpg" speed={-30} className='opacity-10 ' />
            </section>
            <Col xs={winSize > 768 ? 5 : 10}>
              <img src='/svg/contact-art.svg' alt='Contact Art' className='animate__animated animate__fadeInLeft'/>
            </Col>

            <Col xs={winSize > 768 ? 3 : 10}>
              <section className='flex flex-col animate__animated animate__fadeIn'>
                <h1 className='font-bold font-monts'> Vamos conversar <br /> sobre seu projeto?</h1>
                <h3 className='text-sm'>entre em contato conosco e <br /> transforme seu sonho em <br /> realidade.</h3>
                <Formik initialValues={initialValues} onSubmit={(values) => handleSendEmail(values)}>
                  {({ values, handleChange, handleSubmit }) => (
                    <Form className='flex flex-col gap-3 mt-4'>
                      <InputGroup >
                        <InputGroup.Text className='bg-slate-50'>
                          <IdentificationCard />
                        </InputGroup.Text>
                        <Form.Control type='text' placeholder='Seu Nome' name="name" value={values.name} onChange={handleChange} />
                      </InputGroup>

                      <InputGroup>
                        <InputGroup.Text className='bg-slate-50'>
                          <Envelope />
                        </InputGroup.Text>
                        <Form.Control type='email' placeholder='Seu Email' name="email" value={values.email} onChange={handleChange} />
                      </InputGroup>
                      <Form.Control as='textarea' placeholder='Assunto' name="message" value={values.message} onChange={handleChange} />
                      {isLoading ? (
                        <button className='bg-slate-400 text-white font-bold uppercase py-2 px-4 rounded cursor-not-allowed gap-3 flex flex-row items-center justify-center'>
                          <Spinner animation='border' size='sm' />
                          Enviando...
                        </button>
                      ) : (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleSubmit();
                          }}
                          type='button'
                          className={isSuccess ? 'bg-emerald-500 transition-all hover:bg-green-400 text-white uppercase font-bold py-2 px-4 rounded flex flex-row items-center justify-center gap-2' : 'bg-blue-500 transition-all hover:bg-sky-400 text-white font-bold uppercase py-2 px-4 rounded flex flex-row items-center justify-center gap-2'}>
                          {isSuccess && <CheckCircle weight='fill' />}
                          {isSuccess ? 'Enviado!' : 'Enviar Email'}
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
              </section>
            </Col>
          </Row>
          {winSize < 768 && (
            <div className='flex flex-row justify-center mb-3'>
              <span className='text-slate-400 select-none'>Luis Thalys {actualYear} &copy; Todos os Direitos Reservados </span>
            </div>
          )}
        </Container>
      </Parallax>
    </>
  )
}

export default Contact