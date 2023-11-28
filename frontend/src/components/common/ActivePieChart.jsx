import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 15) * cos;
	const my = cy + (outerRadius + 15) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: '14px' }}>
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 5}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" style={{ fontSize: '12px' }}>
				{`${value} g`}
			</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999"
				style={{ fontSize: '12px' }}
			>
				{`${(percent * 100).toFixed(2)}%`}
			</text>
		</g>
	);
};

export default class ActivePieChart extends PureComponent {
	state = {
		activeIndex: 0
	};

	onPieEnter = (_, index) => {
		this.setState({
			activeIndex: index
		});
	};

	render () {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<PieChart width="200px" height="200px" style={{ filter: 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2))' }}>
					<Pie
						activeIndex={this.state.activeIndex}
						activeShape={renderActiveShape}
						data={this.props.ingredients}
						cx="50%"
						cy="50%"
						innerRadius={55}
						outerRadius={70}
						fill="rgb(72, 209, 204)"
						dataKey="value"
						onMouseEnter={this.onPieEnter}
					/>
				</PieChart>
			</ResponsiveContainer>
		);
	}
}
