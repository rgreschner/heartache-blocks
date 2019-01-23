import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import { Store } from 'redux';
import { AppState } from '../shared/state/app.state';
import { SubmissionFormState } from './submission-form.state';
import { ViewState } from './view-state.enum';
import { destroyStream } from '../shared/lifecycle/destroy-stream.decorator';
import { stateFromStore } from '../shared/state/state-from-store.decorator';
const { TextArea } = Input;

/**
 * Container for complaint
 * text input.
 */
@destroyStream()
@stateFromStore((state: AppState) => state.submissionForm)
class WriteContainer extends Component<any, SubmissionFormState> {
	private _store!: Store<AppState>;

	constructor(props: any) {
		super(props);
	}

	private onTextChange(text: string) {
		this._store.dispatch({ type: 'SetText', payload: { text } });
	}

	private async onButtonClick() {
		this._store.dispatch({
			type: 'SetViewState',
			payload: { value: ViewState.Check }
		});
	}

	public render() {
		const state = this.state;
		return (
				<Form layout="vertical" style={{ width: '100%' }}>
					<Form.Item>
						<TextArea
							rows={8}
							value={state.text}
							onChange={(e: any) =>
								this.onTextChange(e.nativeEvent.target.value)
							}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
                            size="large"
                            style={{float: 'right'}}
							disabled={state.text.length < 1}
							onClick={() => this.onButtonClick()}
						>
							Check your complaint
						</Button>
					</Form.Item>
				</Form>
		);
	}
}

export default WriteContainer;
