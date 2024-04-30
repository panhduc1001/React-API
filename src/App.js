import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function App() {
	const [selectedTab, setSelectedTab] = useState("");
	const [apiResponse, setApiResponse] = useState("");
	const [content, setContent] = useState(false);

	// Define API URLs for each button
	const apiUrls = {
		post: "https://jsonplaceholder.typicode.com/posts",
		comments: "https://jsonplaceholder.typicode.com/comments",
		albums: "https://jsonplaceholder.typicode.com/albums",
		photos: "https://jsonplaceholder.typicode.com/photos",
		todos: "https://jsonplaceholder.typicode.com/todos",
		users: "https://jsonplaceholder.typicode.com/users",
	};

	const handleClickBtn = async (tab) => {
		try {
			const response = await fetch(apiUrls[tab]);
			const data = await response.json();
			setApiResponse(JSON.stringify(data, null, 2));
			setSelectedTab(tab);
		} catch (error) {
			console.error(error);
			setSelectedTab("");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await handleClickBtn("post");
			setContent(true);
		};

		fetchData();
	}, []);

	const toggleContent = () => {
		setContent(!content);
	};

	useEffect(() => {
		toggleContent();
	}, []);

	return (
		<div className="App">
			<Button type="button" className="btn btn-primary" onClick={toggleContent}>
				Toggle
			</Button>
			<div className="container">
				{Object.keys(apiUrls).map((tab) => (
					<Button
						key={tab}
						onClick={() => handleClickBtn(tab)}
						className={"btn btn-info " + (selectedTab === tab ? "active" : "")}
					>
						{tab}
					</Button>
				))}
			</div>
			<div className="content">{content ? <pre>{apiResponse}</pre> : null}</div>
		</div>
	);
}

export default App;
