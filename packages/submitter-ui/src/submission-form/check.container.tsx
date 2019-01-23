import React, { Component } from 'react';
import { Button, Input, message, Form } from 'antd';
import { Store } from 'redux';
import { AppState } from '../shared/state/app.state';
import { SubmissionFormState } from './submission-form.state';
import { destroyStream } from '../shared/lifecycle/destroy-stream.decorator';
import { stateFromStore } from '../shared/state/state-from-store.decorator';
import { ViewState } from './view-state.enum';
const { TextArea } = Input;

/**
 * Container for review of
 * complaints before submit.
 */
@destroyStream()
@stateFromStore((state: AppState) => state.submissionForm)
class CheckContainer extends Component<any, SubmissionFormState> {
	private _store!: Store<AppState>;

	constructor(props: any) {
		super(props);
	}

	public render() {
		const state = this.state;
		return (
			<Form layout="vertical" style={{ width: '100%' }}>
				<Form.Item>
					<TextArea
						rows={8}
						value={state.text}
						readOnly={true}
						style={{ backgroundColor: '#F5F5F5' }}
					/>
				</Form.Item>
				<Form.Item>
					<div style={{ float: 'right' }}>
						<Button
							type="primary"
							size="large"
							onClick={() => this.onGoBackButtonClick()}
							style={{ marginRight: '16px' }}
						>
							Edit
						</Button>
						<Button
							type="primary"
							size="large"
							onClick={() => this.onButtonClick()}
						>
							Submit
						</Button>
					</div>
				</Form.Item>
			</Form>
		);
	}
	private onGoBackButtonClick(): any {
		this._store.dispatch({
			type: 'SetViewState',
			payload: { value: ViewState.Write }
		});
	}

	private onButtonClick() {
		const state = this.state;
		this._store.dispatch({
			type: 'SubmitFormData',
			payload: { text: state.text }
		});
	}
}

export default CheckContainer;
