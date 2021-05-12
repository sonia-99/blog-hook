import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';

const Root = styled.div``;
const ErrorMessage = styled.div`color: red;`;
function LoginPage() {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errMsg, setErrMsg ] = useState('');
	let history = useHistory();
	const { setUser } = useContext(AuthContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		setErrMsg('');
		if (username && password) {
			login(username, password).then((data) => {
				if (data.ok === 0) {
					return setErrMsg(data.message);
				}
				if (data.ok === 1) {
					// Save token to localStorage
					setAuthToken(data.token);
					// Authenticate and get user info, then keep it in state
					getMe().then((res) => {
						if (res.ok === 1) {
							setUser(res.data);
							alert('Logged in successfully.');
							history.push('/');
						} else {
							setUser(null);
							setAuthToken(null);
							setErrMsg('Failed to login....');
						}
					});
				}
			});
		}
	};
	return (
		<Root>
			<form onSubmit={handleSubmit}>
				<div>
					Username:{' '}
					<input
						type="text"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</div>
				<div>
					Password:{' '}
					<input
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				{errMsg && <ErrorMessage>*{errMsg}</ErrorMessage>}
				<button>Login</button>
			</form>
		</Root>
	);
}

export default LoginPage;
