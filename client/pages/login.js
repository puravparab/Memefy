import LoginBtn from '../components/LoginBtn.js'
import styles from '../styles/login.module.css'

const LoginPage = () => {
	return (
		<div className={styles.loginPageContainer}>
			<div className={styles.loginInterface}>
				<h1>Memefy</h1>
				<LoginBtn />
			</div>
		</div>
	)
}

export default LoginPage