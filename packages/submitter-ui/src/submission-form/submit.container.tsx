import React, { Component } from "react";
import { AppState } from "../shared/state/app.state";
import { SubmissionFormState } from "./submission-form.state";
import { destroyStream } from "../shared/lifecycle/destroy-stream.decorator";
import { stateFromStore } from "../shared/state/state-from-store.decorator";
import { ViewState } from "./view-state.enum";
import { Button } from "antd";
import { Store } from "redux";

/**
 * Container for complaint
 * submission status.
 */
@destroyStream()
@stateFromStore((state: AppState) => state.submissionForm)
class SubmitContainer extends Component<any, SubmissionFormState> {

    private _store!: Store<AppState>;

    constructor(props: any) {
        super(props);
    }

    private onResetClick() {
        this._store.dispatch({ type: 'Reset' })
    }

    private onRetryClick() {
        const state = this.state;
        this._store.dispatch({ type: 'SubmitFormData', payload: { text: state.text } });
    }

    public render() {
        const isReceiptDisplayEnabled = false;
        const state = this.state;
        return (
            <div style={{height: '128px'}}>
                {state.viewState == ViewState.SubmittingIPFS && <div>
                    <h2>Submitting complaint to IPFS...</h2>
                </div>}
                {state.viewState == ViewState.SubmittingContract && <div>
                    <h2>Submitting complaint to blockchain...</h2>
                </div>}
                {state.viewState == ViewState.SubmittedAll && <div>
                    <h2 style={{ color: 'green' }}>Your complant was successfully submitted!</h2>
                </div>}
                {state.viewState == ViewState.SubmitFailed && <div>
                    <h2 style={{ color: 'red' }}>Submit Failed!</h2>
                </div>}
                {isReceiptDisplayEnabled && state.viewState == ViewState.SubmittedAll && !!state.receipt && <div>
                    <h2>Receipt</h2>
                    <span style={{ fontSize: '12px', color: 'black', fontWeight: 'bold' }}>Id: </span>
                    <span style={{ fontSize: '12px', color: 'black' }}>{state.receipt.id}</span>
                </div>}
           
                {[ViewState.SubmittedAll, ViewState.SubmitFailed].indexOf(state.viewState) >= 0 && <div style={{marginTop: '24px'}}>
                    <Button onClick={() => this.onResetClick()} type="primary"
                        size="large">Start Over</Button>
                    {state.viewState != ViewState.SubmittedAll && <Button onClick={() => this.onRetryClick()} type="primary"
                        size="large" style={{marginLeft: '16px'}}>Retry</Button>}
          
                </div>}
            </div>
        );
    }



}

export default SubmitContainer;
