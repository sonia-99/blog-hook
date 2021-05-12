import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts, deletePost } from '../../WebAPI';

const Root = styled.div`
	width: 80%;
	margin: 0 auto;
`;
const PostContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 1rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
const PostTitle = styled(Link)`font-size: 1.2rem;color:#333;text-decoration:none;`;
const PostRight = styled.div`display: flex;`;
const PostTime = styled.div`color: rgba(0, 0, 0, 0.8);`;

function Post({ post }) {
	const handleDelete = () => {
		deletePost(post.id).then((res) => {
			alert(`Deleting the post: ${post.title}.`);
		});
	};
	return (
		<Root>
			<PostContainer>
				<PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
				<PostRight>
					<PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
					<div>
						<button onClick={handleDelete}>Delete</button>
					</div>
				</PostRight>
			</PostContainer>
		</Root>
	);
}
Post.propTypes = {
	post: PropTypes.object
};
function HomePage() {
	const [ posts, setPosts ] = useState(null);
	useEffect(
		() => {
			getPosts().then((posts) => setPosts(posts));
		},
		[ posts ]
	);
	return <Root>{posts && posts.map((post) => <Post key={post.id} post={post} />)}</Root>;
}

export default HomePage;
