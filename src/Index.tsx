import { Outlet } from 'react-router-dom'
import Footer from './components/footer'
import Navigation from './components/navbar'

function Index() {
  return (
    <>
      <Navigation/>
      <Outlet/>    
      <Footer/>
    </>
  )
}

export default Index
