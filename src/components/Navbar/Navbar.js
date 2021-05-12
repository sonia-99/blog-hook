import { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';

const NavbarContainer = styled.div`
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	border: 1px solid grey;
	height: 64px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	background: white;
`;
const LeftContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Brand = styled.div`
	font-size: 1.4rem;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 0.5rem;
`;
const NavbarList = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 4rem;
`;
const Nav = styled(Link)`
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	color: black;
	text-decoration: none;
	${(props) => props.$active && `background:rgba(0,0,0,0.1)`}
`;

function Navbar() {
	const location = useLocation();
	const { user, setUser, isGettingUser } = useContext(AuthContext);
	const history = useHistory();
	const handleLogoutClick = () => {
		setAuthToken('');
		setUser(null);
		if (location.pathname !== '/') {
			history.push('/');
		}
	};
	return (
		<NavbarContainer>
			<LeftContainer>
				<Brand>A SIMPLE BLOG</Brand>
				<NavbarList>
					<Nav to="/" $active={location.pathname === '/'}>
						HOME
					</Nav>
					{user && (
						<Nav to="/new-post" $active={location.pathname === '/new-post'}>
							+POST
						</Nav>
					)}
				</NavbarList>
			</LeftContainer>
			<NavbarList>
				{isGettingUser || user ? (
					<Nav onClick={handleLogoutClick}>LOGOUT</Nav>
				) : (
					<Nav to="/login" $active={location.pathname === '/login'}>
						LOGIN
					</Nav>
				)}
			</NavbarList>
		</NavbarContainer>
	);
}

export default Navbar;
