import React, { Component, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';

let bigArray = [];
for (let j = 1; j <= 10000; j++) {
	bigArray.push('Item No' + j);
}

const inputField = createRef();
const barField = createRef();

class App extends Component {
	state = {
		array: bigArray,
		countedArray: [],
		searchPattern: [],
		inputValue: '',
		amount: 100,
		visible: false,
	};

	searchPattern = () => {
		let { searchPattern } = this.state;
		return new RegExp(searchPattern.map((e) => `(?=.*${e})`).join(''), 'i');
	};

	handleChange = (e) => {
		let { array, amount } = this.state;
		let value = e.target.value;
		if (value.length) {
			barField.current.scrollTop = 0;
			this.setState(
				{
					inputValue: value,
					searchPattern: value.split(' '),
					visible: true,
				},
				() => {
					let filteredArray = array.filter((item) =>
						item.match(this.searchPattern())
					);
					this.setState({
						countedArray: filteredArray.slice(0, amount),
					});
				}
			);
		} else {
			this.setState({ inputValue: '', searchPattern: [], visible: false });
		}
	};

	handleFocus = (e) => {
		let { inputValue, amount, array } = this.state;
		this.handleChange(e);
		if (!inputValue && document.activeElement === inputField.current) {
			this.setState({ countedArray: array.slice(0, amount), visible: true });
		}
		barField.current.scrollTop = 0;
	};

	handleBlur = () => {
		this.setState({ visible: false });
	};

	handleScroll = () => {
		let { amount, countedArray, array } = this.state;
		let filteredArray = array.filter((item) =>
			item.match(this.searchPattern())
		);
		if (
			barField.current.scrollTop + barField.current.clientHeight + 500 >=
			barField.current.scrollHeight
		) {
			this.setState({
				countedArray: (filteredArray.length > 0
					? filteredArray
					: array
				).slice(0, countedArray.length + amount),
			});
		}
	};

	render() {
		let { countedArray, visible } = this.state;
		console.log(this.state);

		return (
			<div className="container">
				<TextField
					inputRef={inputField}
					className="regInputField"
					id="inputBar"
					size="small"
					variant="outlined"
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={() => {
						setTimeout(() => {
							this.handleBlur();
						}, 100);
					}}
				/>
				<div
					className={visible ? 'show' : 'hide'}
					id="listbar"
					ref={barField}
					onScroll={this.handleScroll}
				>
					{countedArray.map((item, i) => (
						<div
							key={i}
							onClick={() => {
								this.setState({ visible: false });
								inputField.current.value = item;
							}}
						>
							{item}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;
