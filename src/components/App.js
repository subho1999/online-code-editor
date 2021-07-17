import { useState, useEffect } from "react";
import Editor from "./Editor";
import axios from 'axios';

function App() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [active, setActive] = useState(0)
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <style>${css}</style>
        <body>${html}</body>
        <script>${js}</script>
      </html>
      `)
    }, 500)

    return () => clearTimeout(timeout)
  }, [html,css,js])

  let arr = [
    {
      language: 'xml',
      fileName: 'index.html',
      value: html,
      onChange: setHtml
    },
    {
      language: 'css',
      fileName: 'index.css',
      value: css,
      onChange: setCss
    },
    {
      language: 'javascript',
      fileName: 'index.js',
      value: js,
      onChange: setJs
    }
  ]

  return (
  <div className='container'>
    <div className="pane top-pane">
      <div className="file-explorer">
        <button 
          className="btn"
          onClick={()=>{
            setActive(0)
          }}
        >
          index.html
        </button>
        <button 
          className="btn"
          onClick={()=>{
            setActive(1)
          }}
        >
          index.css
        </button>
        <button 
          className="btn"
          onClick={()=>{
            setActive(2)
          }}
        >
          index.js
        </button>
        <button 
          className="btn"
          onClick={() => {
            const params = new URLSearchParams();
            params.append("api_dev_key", "vUhNddOnZ5qkQEh6PYmjrcmQ8nvO-tRA")
            params.append("api_option", "paste")
            params.append("api_paste_code", srcDoc)
            let url = "https://hidden-bayou-27416.herokuapp.com/https://pastebin.com/api/api_post.php"
            try {
              let res = axios.post(url,params);
              console.log(res)
            } catch(e) {
              console.log(e)
            }
          }}
        >
          Share
        </button>
      </div>
      <Editor className='editor'
        obj={arr[active]}
      />
    </div>
    
    <div className="pane bottom-pane">
      <iframe
        srcDoc={srcDoc}
        title="output-render"
        sandbox='allow-scripts'
        frameBorder="1"
        width="100%"
        height="100%"
      />
    </div>
  </div>
  );
}

export default App;
