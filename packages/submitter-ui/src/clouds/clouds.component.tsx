import React, { Component } from 'react';
import './clouds.component.css';

/**
 * Displays moving clouds.
 * Best feature ever!
 */
export class CloudsComponent extends Component<any> {
	public render() {
		return (
			<div id="background-wrap">
				<div className="x1">
					<div className="cloud" />
				</div>

				<div className="x2">
					<div className="cloud" />
				</div>

				<div className="x3">
					<div className="cloud" />
				</div>

				<div className="x4">
					<div className="cloud" />
				</div>

				<div className="x5">
					<div className="cloud" />
				</div>
			</div>
		);
	}
}
