import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Share = () => {
	const router = useRouter()
	useEffect(()=>{
		router.push('/list')
	},[])
}
export default Share

