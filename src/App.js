import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // state
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaactual] = useState(1);
  const [totalpaginas, guardarTotalpaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async() => {
      if(busqueda === '') return;   
      const imagenesPorPagina = 30;
      const key = "17280063-69b6fe2ed04a6a915f89cdb87";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalpaginas(calcularTotalPaginas);

      // mover la pagina al la parte superior
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior:"smooth"})
    } 
    consultarApi();     
  },[busqueda,paginaactual]);

  // define la pgina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;    
    guardarPaginaactual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual >  totalpaginas) return;    
    guardarPaginaactual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>

        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
      </div>

      {(paginaactual === 1) ? null:(
        <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}
        >&laquo;Anterior


        </button>
      )}      

      {(paginaactual === totalpaginas) ? null : (
        <button
          type="button"
          className="bbtn btn-info"     
          onClick={paginaSiguiente}   
        >Siguiente &raquo;


        </button>
      )}
      
    </div>
  );
}

export default App;
