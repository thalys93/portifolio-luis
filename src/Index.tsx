import { Outlet } from 'react-router-dom'
import Footer from './components/footer'

function Index() {  
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

export default Index
