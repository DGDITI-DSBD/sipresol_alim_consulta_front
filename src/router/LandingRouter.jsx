
import { Header } from './components/Header';
import { MainHero } from './components/MainHero';
import { Footer } from './components/Footer';

export const LandingRouter = () => {
  return (

    <div className={`bg-white w-full`} >
          <Header />
            <MainHero />
          <Footer/>
    </div>

  )
}
