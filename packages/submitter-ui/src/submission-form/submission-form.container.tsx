import React, { Component } from 'react';
import { Steps, Card } from 'antd';
import WriteContainer from './write.container';
import { ViewState } from './view-state.enum';
import CheckContainer from './check.container';
import { AppState } from '../shared/state/app.state';
import { SubmissionFormState } from './submission-form.state';
import SubmitContainer from './submit.container';
import { destroyStream } from '../shared/lifecycle/destroy-stream.decorator';
import { stateFromStore } from '../shared/state/state-from-store.decorator';
import { push } from 'connected-react-router';
import { Store } from 'redux';
const { Step } = Steps;

/**
 * Container for whole complaint
 * submission process.
 */
// TODO:Refactor / SRP, extract components.
@destroyStream()
@stateFromStore((state: AppState) => state.submissionForm)
export class SubmissionFormContainer extends Component<
	any,
	SubmissionFormState
> {
	private _store!: Store<AppState>;

	constructor(props: any) {
		super(props);
	}

	private async assertContract() {
		if (!this._store.getState().contract.instance)
			throw new Error('No contract instance.');
	}

	public async componentDidMount() {
		try {
			await this.assertContract();
		} catch (err) {
			this._store.dispatch(push('/invalid-contract'));
		}
	}

	public render() {
		const state = this.state;
		const isSubmitting =
			[
				ViewState.SubmittingIPFS,
				ViewState.SubmittingContract,
				ViewState.SubmittedAll,
				ViewState.SubmitFailed
			].indexOf(state.viewState) >= 0;
		const viewStateToIndex = new Map();
		viewStateToIndex.set(ViewState.Write, 0);
		viewStateToIndex.set(ViewState.Check, 1);
		viewStateToIndex.set(ViewState.SubmittingIPFS, 2);
		viewStateToIndex.set(ViewState.SubmittingContract, 2);
		viewStateToIndex.set(ViewState.SubmittedAll, 2);
		viewStateToIndex.set(ViewState.SubmitFailed, 2);
		const currentState = viewStateToIndex.get(state.viewState);
		let stepStatus: 'finish' | 'process' | 'error' | 'wait' =
			state.viewState == ViewState.SubmittedAll ? 'finish' : 'process';
		stepStatus =
			state.viewState == ViewState.SubmitFailed ? 'error' : stepStatus;
		return (
			<>
				<h2 style={{ fontWeight: 'bold' }}>Write Your Complaint</h2>
				<span>
					Please write your complaint into the text box below.
				</span>
				<Card style={{ width: '50%', marginTop: '32px', marginBottom: '64px' }}>
					<Steps
						current={currentState}
                        status={stepStatus}
						style={{ marginBottom: '24px' }}
					>
						<Step title="Write" />
						<Step title="Check" />
						<Step title="Submit" />
					</Steps>
					{state.viewState == ViewState.Write && <WriteContainer />}
					{state.viewState == ViewState.Check && <CheckContainer />}
					{isSubmitting && <SubmitContainer />}
				</Card>
			</>
		);
	}
}
