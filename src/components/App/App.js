import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContext } from '../../contexts';
import { getAuthToken } from '../../utils';
import { getMe } from '../../WebAPI';

import Navbar from '../Navbar';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import PostPage from '../../pages/PostPage';
import NewPostPage from '../../pages/NewPostPage';

const Root = styled.div`padding-top: 64px;`;

function App() {
	const [ user, setUser ] = useState(null);
	const [ isGettingUser, setIsGettingUser ] = useState(() => {
		if (getAuthToken()) {
			return true;
		}
		return false;
	});
	useEffect(() => {
		const token = getAuthToken();
		if (token) {
			getMe().then((res) => {
				if (res.ok) {
					setUser(res.data);
					setIsGettingUser(false);
					return;
				}
			});
		}
	}, []);
	return (
		<AuthContext.Provider value={{ user, setUser, isGettingUser }}>
			<Root>
				<Router>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/posts/:id">
							<PostPage />
						</Route>
						<Route path="/new-post">
							<NewPostPage />
						</Route>
					</Switch>
				</Router>
			</Root>
		</AuthContext.Provider>
	);
}

export default App;
