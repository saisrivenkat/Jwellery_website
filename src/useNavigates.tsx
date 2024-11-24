
import { useNavigate } from 'react-router-dom'

interface useNavigates{
    to?:string
}

export function useNavigates({to}:useNavigates) {
    const navigate = useNavigate()
    navigate(`/${to}`);
}


