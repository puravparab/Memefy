import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Share = () => {
	const router = useRouter()
	useEffect(()=>{
		router.push('/circle')
	},[])
}
export default Share

