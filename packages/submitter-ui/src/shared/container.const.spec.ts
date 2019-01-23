import {expect} from 'chai';
import { container } from './container.const'

/**
 * Tests for container + config from Inversify.
 */
describe('container', () => {
    it('should work', () => {
        expect(container).to.be.not.null;
    });

    it('should bind', () => {
        const fooSymbol = Symbol('foo');
        expect(() => container.get(fooSymbol)).to.throw();
        container.bind(fooSymbol).toConstantValue(42);
        expect(() => container.get(fooSymbol)).to.not.throw();
        expect(container.get(fooSymbol)).to.equal(42);
    });
});