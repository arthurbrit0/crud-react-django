import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/Form.css'
import LoadingIndicator from './LoadingIndicator'

function Form({route, method}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? "Login" : "Registro"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const response = await api.post(route, {username, password})
            if(method==="login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        }
        catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input 
            type="text" 
            className='form-input'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            placeholder="Usuário"
        />
        <input 
            type="password" 
            className='form-input'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Senha"
        />
        {loading && <LoadingIndicator/> }
        <button className="form-button" type="submit">{name}</button>
    </form>
}

export default Form;