import { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'

function Home() {

    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(()=>{
        getNotes();
    },[])

    const getNotes = () => {
        api.get("/api/notes")
        .then((response)=> response.data)
        .then((data) => { setNotes(data); console.log(data) })
        .catch((err) => alert(err)) 
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((response)=> {
            if(response.status === 204) alert("Nota deletada!")
            else alert("Falha ao deletar nota.")
            getNotes()
        })
        .catch((error)=> alert(error))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post('/api/notes/', {content, title})
            .then((response) => {
                if(response.status===201) alert ("Nota criada!")
                else alert ("Falha ao criar a nota.")
                getNotes()
        }).catch((error) => alert(error))
    }

    return <div> 
        <div>
            <h2>Notas</h2>
            {notes.map((note)=> {
                return <Note note={note} onDelete={deleteNote} key={note.id}/> 
            })}
        </div>
        <h2>Criar uma nota</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Título: </label>
            <br/>
            <input type="text" id='title' name='title' 
            required 
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />
            <br/>
            <label htmlFor="content">Conteúdo:</label>
            <textarea name="content" id="content" required value={content} 
            onChange={(e)=>setContent(e.target.value)}></textarea>
            <br />
            <input type="submit" value="Criar"/>
        </form>
    </div>

}

export default Home