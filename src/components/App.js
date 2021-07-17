import { useState } from "react";
import Editor from "./Editor";
import axios from 'axios';

function App() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [active, setActive] = useState(0)

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

  let srcDoc = `
  <html>
    <style>${css}</style>
    <body>${html}</body>
    <script>${js}</script>
  </html>
  `

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
            params.append("api_dev_key", "d359139791f1e74cd953415ba705f7c5")
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
