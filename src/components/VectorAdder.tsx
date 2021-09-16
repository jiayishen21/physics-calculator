import React, { Fragment, useState } from 'react';

import { Vector } from './Vector';

interface Props {
	
}

interface Vector {
	index: number
	magnitude: string,
	direction: string,
	key: number
}

export const VectorAdder: React.FC<Props> = () => {

	const [vectors, setVectors] = useState<Vector[]>([]);
	const [nextKey, setNextKey] = useState<number>(0);
	const [answer, setAnswer] = useState<string>("");

	const onChange = (index: number, value: string, change: number) => {
		let newVectors = [...vectors];

		if(change === 0) {
			newVectors[index].magnitude = value;
		}
		else if(change === 1){
			newVectors[index].direction = value;
		}

		setVectors(newVectors);
	};

	const createNewVector = () => {
		let newVectors = [...vectors];
		newVectors.push({index: vectors.length, magnitude: "0", direction: "0", key: nextKey});
		setNextKey(nextKey + 1);
		setVectors(newVectors);
	}

	const deleteVector = (index: number) => {
		let newVectors = [...vectors];
		for(let _i = index + 1; _i < vectors.length; _i ++) {
			newVectors[_i].index --;
		}
		newVectors.splice(index, 1);
		setVectors(newVectors);
	}

	const addVectors = () => {
		let x = 0;
		let y = 0;
		vectors.forEach(vector => {
			let magnitude = parseFloat(vector.magnitude);
			let direction = parseFloat(vector.direction);
			x += magnitude * Math.cos(direction * Math.PI / 180);
			y += magnitude * Math.sin(direction * Math.PI / 180);
		});

		let answerMagnitude = Math.sqrt(x * x + y * y);

		let direction = x === 0 ? (y === 0 ? 0 : (y > 0 ? 90 : 270)) : Math.abs(Math.atan(y / x)) / Math.PI * 180;

		let cardinal: string;

		if(direction % 90 === 0) {
			if(direction === 0) {
				cardinal = "E";
			}
			else if(direction === 90) {
				cardinal = "N";
			}
			else if(direction === 180) {
				cardinal = "W";
			}
			else {
				cardinal = "S";
			}
		}

		else if(x > 0) {
			if(y > 0) {
				cardinal = "E " + direction +"° N";
			}
			else {
				cardinal = "E " + direction +"° S";
			}
		}
		else {
			if(y > 0) {
				cardinal = "W " + direction +"° N";
			}
			else {
				cardinal = "W " + direction +"° S";
			}
		}

		setAnswer(answerMagnitude + " unit(s) [" +cardinal + "]");
	}

	const getClass = () => {
		return vectors.length === 0 ? "hidden" : "";
	}

	return (
		<Fragment>
			<div className="vector-adder">
				<button className="adder-button" onClick={createNewVector}>Create new vector</button>

				{ vectors.map(vector => (
					<Vector vector={vector} onChange={onChange} deleteVector={deleteVector} key={vector.key} />
				))}

				<span className={getClass()}>
					<button className="adder-button" onClick={() => addVectors()}>Add vectors</button>

					<div className="answer">{answer}</div>
				</span>
			</div>
		</Fragment>
	);

}