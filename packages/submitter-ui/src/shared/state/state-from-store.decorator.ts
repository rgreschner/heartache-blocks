import { container } from "../container.const";
import { AppStore } from "./app.store";
import { Store, AnyAction } from "redux";
import { AppState } from "./app.state";
import { Subject, Observable } from "rxjs";
import { Component } from "react";

/**
 * Decorator for easy store/state access.
 * @param selector State selector.
 */
// TODO: Check for easier/third-party solution
// for this!
export const stateFromStore = (selector: Function) => <T extends { new(...args: any[]): Component }>(constructor: T) => {

  const getStateFromSelector = (store: Store) => {
    return selector(store.getState());
  }

  return class extends constructor {

    protected readonly _nextStateSource = new Subject();
    protected _nextState$!: Observable<any>;
    protected _store: Store;
    protected _storeSubscription: Function = () => { };

    constructor(...args: any[]) {
      super(...args);
      this._store = container.get<Store<AppState, AnyAction>>(AppStore);
      this.state = getStateFromSelector(this._store);
    }

    public componentWillMount() {
      if (!!super.componentWillMount) super.componentWillMount();
      if (!!this._nextState$) "";
      this._nextState$ = this._nextStateSource.asObservable();
      this._nextState$.subscribe((nextState) => this.setState(nextState));
      this._storeSubscription = this._store.subscribe(() => this._nextStateSource.next(getStateFromSelector(this._store)));
    }

    public componentWillUnmount() {
      if (!!super.componentWillUnmount) super.componentWillUnmount();
      this._nextStateSource.complete();
      this._storeSubscription();
    }

  }
}
