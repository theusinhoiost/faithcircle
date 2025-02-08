export default function Footer() {
    return (
      <footer className="bg-dark text-light py-4 mt-auto border-top">
        <div className="container text-center">
          <div className="row">
            {/* Sobre o FaithCircle */}
            <div className="col-md-4 mb-3">
              <h5>FaithCircle</h5>
              <p>Conectando pessoas através da fé.</p>
            </div>
  
            {/* Navegação */}
            <div className="col-md-4 mb-3">
              <h5>Navegação</h5>
              <ul className="list-unstyled">
                <li><a href="#home" className="text-light text-decoration-none">Início</a></li>
                <li><a href="#sobre" className="text-light text-decoration-none">Sobre</a></li>
                <li><a href="#contato" className="text-light text-decoration-none">Contato</a></li>
              </ul>
            </div>
  
            {/* Redes Sociais */}
            <div className="col-md-4 mb-3">
              <h5>Siga-nos</h5>
              <a href="https://facebook.com" className="text-light me-3">
                <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a href="https://instagram.com" className="text-light me-3">
                <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a href="https://twitter.com" className="text-light">
                <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
              </a>
            </div>
          </div>
  
          {/* Direitos Autorais */}
          <div className="mt-3">
            <small>&copy; {new Date().getFullYear()} FaithCircle. Todos os direitos reservados.</small>
          </div>
        </div>
      </footer>
    );
  }
  