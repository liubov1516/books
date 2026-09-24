import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation', () => {
  it('required', () => {
    expect(Validation.required('  ')).to.equal(Validation.REQUIRED);
    expect(Validation.required('x')).to.equal(null);
  });
  it('userId accepts only digits', () => {
    expect(Validation.userId('123')).to.equal(null);
    expect(Validation.userId('12a')).to.be.a('string');
    expect(Validation.userId('')).to.equal(Validation.REQUIRED);
  });
  it('year accepts only valid years', () => {
    expect(Validation.year('2004')).to.equal(null);
    expect(Validation.year('1999')).to.equal(null);
    expect(Validation.year('abc')).to.be.a('string');
    expect(Validation.year('99')).to.be.a('string');
    expect(Validation.year('3000')).to.be.a('string');
  });
  it('validateBook returns errors per field', () => {
    const errors = Validation.validateBook({ title: '', author: 'A', year: '2000' });
    expect(errors).to.have.all.keys('title');
  });
});
