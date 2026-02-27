import { Link } from 'react-router-dom'
import logo from '../../assets/logo_navbar.png'
import { LinkedinIcon, PortfolioIcon, MailIcon, LocationIcon, GithubIcon } from '../common/Icons';
import { handleScrollToTop } from '../../utils/ScrollUtils';
import './Footer.css'



function Footer() {


	return(
		<div className='footer-container'>
			<div className='footer-content'>
				<div className='footer-top'>
				<div className='footer-box first-box'>
				<Link to='/' onClick={handleScrollToTop}><img className='logo-img' src={logo} /><p className='logo-first-part'>GUITAR</p><p className='logo-second-part'>ZONE</p></Link>
				<p id='lem'>El mejor sonido al mejor precio</p>
				<p id='location'>
          <span id='location-icon'><LocationIcon/></span> 
          Concepción | Bío-Bío
        </p>
				</div>

        <div className='mobile-divider'></div>

				<div className='footer-box second-box'>	
					<p>
            Nuestra misión es ofrecer a guitarristas de todos los niveles una experiencia de compra especializada y confiable, con equipamiento de calidad que potencie su sonido.
					</p>
				</div>

        <div className='mobile-divider'></div>
        
				<div className='footer-box third-box'>
					<Link to='/about'  onClick={handleScrollToTop}>Acerca De</Link>
					<Link to='/legal' onClick={handleScrollToTop}>Información Legal</Link>
				</div>

        <div className='mobile-divider'></div>

				<div className='footer-box fourth-box'>
					<h3>Contáctanos</h3>
					<div className='footer-links'>
						<a href='https://www.linkedin.com/in/ra%C3%BAl-ram%C3%ADrez-sanhueza/'> <div id='linkedin-icon'><LinkedinIcon/></div> LinkedIn</a>
						<a href='mailto:raul.ramirez1401@gmail.com'> <div id='mail-icon'><MailIcon/> </div> Correo</a>
						<a href='https://raul240sx.github.io/'> <div id='mail-icon'><PortfolioIcon/> </div> Portfolio</a>
						<a href='https://github.com/raul240sx'> <div id='mail-icon'><GithubIcon/> </div> Github</a>
					</div>
					
				</div>
				</div>
				<hr />
				<div className='footer-bottom'>
					<p id='creator-name'>© 2026 Raúl Ignacio Ramírez Sanhueza</p>
					<p>Arquitectura basada en microservicios con Django, PostgreSQL y Docker.</p>
					<p>Frontend desarrollado con React y Vite.</p>
					<p>Proyecto con fines demostrativos.</p>	
				</div>

			</div>
			
		</div>
	)

}

export default Footer;