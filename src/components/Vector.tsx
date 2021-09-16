import React, { Fragment } from 'react';

interface Props {
	vector: Vector,
	onChange: (index: number, value: string, change: number) => void,
	deleteVector: (index: number) => void
}

interface Vector {
	index: number
	magnitude: string,
	direction: string,
	key: number
}

export const Vector: React.FC<Props> = (props: Props) => {

	const { index, magnitude, direction } = props.vector;
	const { onChange, deleteVector } = props;

	const setFinal = (change: number) => {
		if(change === 0 && magnitude === "") {
			onChange(index, "0", 0);
		}
		else if(change === 1 && direction === "") {
			onChange(index, "0", 2);
		}
	};

	return (
		<Fragment>
			<div className="vector-container">
				<h3>Vector {index + 1}</h3>

				<span className="stat-container magnitude">
					<span>Magnitude:</span>
					<input
						type="number"
						name="magnitude"
						value={magnitude}
						onChange={e => onChange(index, e.target.value, 0)}
						onFocus={() => onChange(index, "", 0)}
						onBlur={() => setFinal(0)}
					/>
				</span>

				<span className="stat-container direction">
					<span>CCW Angle:</span>
					<input 
						type="number"
						name="direction"
						value={direction}
						onChange={e => onChange(index, e.target.value, 1)}
						onFocus={() => onChange(index, "", 1)}
						onBlur={() => setFinal(1)}
					/>
				</span>

				<span>
					<button onClick={() => deleteVector(index)}>Delete</button>
				</span>
			</div>
		</Fragment>
	);

}