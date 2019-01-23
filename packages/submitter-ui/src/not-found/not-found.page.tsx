import React, { Component } from "react";
import { history } from "../core/history.const";

/**
 * Simple 404 page redirecting
 * the user to contract input.
 */
export class NotFoundPage extends Component {
	public componentDidMount() {
		history.push("/set-contract");
	}

	public render() {
		return <>404</>;
	}
}
