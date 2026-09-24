import { expect } from 'chai';
import { Library } from '../src/services/Library';

describe('Library', () => {
  let lib: Library<{ id: string; name: string }>;
  beforeEach(() => {
    lib = new Library([{ id: '1', name: 'a' }]);
  });

  it('adds items', () => {
    lib.add({ id: '2', name: 'b' });
    expect(lib.getAll()).to.have.length(2);
  });
  it('rejects duplicate ids', () => {
    expect(() => lib.add({ id: '1', name: 'x' })).to.throw();
  });
  it('removes items', () => {
    expect(lib.remove('1')).to.equal(true);
    expect(lib.remove('1')).to.equal(false);
    expect(lib.getAll()).to.be.empty;
  });
  it('finds by id and by predicate', () => {
    expect(lib.findById('1')?.name).to.equal('a');
    expect(lib.findById('9')).to.equal(undefined);
    expect(lib.search((i) => i.name === 'a')).to.have.length(1);
  });
});
