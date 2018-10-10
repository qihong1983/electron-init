import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


export default class Image extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			imageUrl: ''
		}
	}

	componentDidMount() {
		ipcRenderer.on('image', (event, arg) => {
			console.log(event, arg);
			this.setState({
				imageUrl: arg
			});
		})
	}

	render() {
		return (
			<div>
				<img src={this.state.imageUrl} style={{maxWidth: "1024px"}} />
			</div>
		);
	}
}