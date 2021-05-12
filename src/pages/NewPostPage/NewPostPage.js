import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { newPost } from '../../WebAPI';
import styled from 'styled-components';
const Root = styled.div`
	width: 80%;
	margin: 0 auto;
`;

function PostPage() {
	const [ title, setTitle ] = useState('');
	const [ content, setContent ] = useState('');
	const history = useHistory();
	const handlePostSubmit = (e) => {
		e.preventDefault();
		if (title && content) {
			newPost(title, content).then((res) => {
				if (res.ok === 0) {
					return alert(res.message);
				}
				alert(`Post submitted.`);
				setTitle('');
				setContent('');
				history.push('/');
			});
		}
	};
	return (
		<Root>
			<form onSubmit={handlePostSubmit}>
				<div>
					Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div>
					Content: <textarea rows="20" value={content} onChange={(e) => setContent(e.target.value)} />
				</div>
				<button>Submit</button>
			</form>
		</Root>
	);
}

export default PostPage;
