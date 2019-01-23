import { Subject } from "rxjs";
import { Component } from "react";

/**
 * Decorator for destructor stream.
 */
export const destroyStream = () => <T extends { new(...args: any[]): Component }>(constructor: T) => {
  return class extends constructor {
    protected readonly _destroySource = new Subject();
    protected readonly _destroy$ = this._destroySource.asObservable();

    constructor(...args: any[]) {
      super(...args);
    }

    public componentWillUnmount() {
      if (!!super.componentWillUnmount) super.componentWillUnmount();
      this._destroySource.next(true);
    }
  }
}
