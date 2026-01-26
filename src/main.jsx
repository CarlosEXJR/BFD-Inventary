import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Ponto de Entrada da Aplicação
 * * 1. Busca o elemento 'root' no arquivo index.html.
 * 2. Cria a raiz do React (createRoot).
 * 3. Renderiza o componente principal <App /> dentro dessa raiz.
 */
createRoot(document.getElementById('root')).render(
  /**
   * <StrictMode>
   * É uma ferramenta do React para destacar problemas potenciais na aplicação. 
   * Ele ajuda a encontrar bugs durante o desenvolvimento (não afeta o build final).
   */
  <StrictMode>
    <App />
  </StrictMode>,
)