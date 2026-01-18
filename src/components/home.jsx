import '../csscomponents/home.css'

function Home({mudarTela}) {
    return (


        <div className="btshome"> 
            
                <h1>home</h1>
                
                <button onClick={() => mudarTela("inventario")}>Inventário</button>

                <button onClick={() => mudarTela("importar")}>Importar</button>

                <button onClick={() => mudarTela("exportar")}>Exportar</button>    
        </div>
        
    )
}

export default Home