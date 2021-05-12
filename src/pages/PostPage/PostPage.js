import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPost } from '../../WebAPI';
const Root = styled.div`
	width: 80%;
	margin: 0 auto;
`;
const PostItem = styled.div``;
const PostTitle = styled.h2``;
const PostTime = styled.div`color: rgba(0, 0, 0, 0.6);`;
const PostContent = styled.div`
	white-space: pre-line;
	margin-bottom: 70px;
`;
function PostPage() {
	let { id } = useParams();
	const [ post, setPost ] = useState(null);
	useEffect(() => {
		getPost(id).then((data) => setPost(data));
		// eslint-disable-next-line
	}, []);
	return (
		<Root>
			{post && (
				<PostItem>
					<PostTitle>{post.title}</PostTitle>
					<PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
					<PostContent>{post.body}</PostContent>
				</PostItem>
			)}
		</Root>
	);
}

export default PostPage;
