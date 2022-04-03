import '../styles/Banner.css'
import logo from '../assets/logo.png'

function Banner() {
  const title = 'E-commerce PFA'

  return (
    <div className='banner'>
            <img src={logo} alt='EMSI' className='logo' />
            <h1 className='title'>{title}</h1>
        </div>
  );
}

export default Banner;
