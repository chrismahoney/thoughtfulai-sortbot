import { sortProps, PackageProps } from './SortbotLib';

describe('SortBot', () => {
  // Valid values for returned stack
  const stackNames = /[standard|special|rejected]/;

  it('should return a valid stack name as string', () => {
    const packageProps: PackageProps = {
      width: 10,
      height: 10,
      length: 10,
      mass: 10,
    };

    expect(sortProps(packageProps)).toMatch(stackNames);
  });

  it('should detect non-bulky, non-heavy packages as "standard"', () => {
    const packageProps: PackageProps = {
      width: 10,
      height: 10,
      length: 10,
      mass: 10,
    };

    expect(sortProps(packageProps)).toEqual('standard');
  });

  it('should detect bulky/not heavy packages as "special"', () => {
    const packageProps: PackageProps = {
      width: 1000,
      height: 1000,
      length: 10,
      mass: 10,
    };

    expect(sortProps(packageProps)).toEqual('special');
  });

  it('should detect heavy/not bulky packages as "special"', () => {
    const packageProps: PackageProps = {
      width: 10,
      height: 10,
      length: 10,
      mass: 1000,
    };

    expect(sortProps(packageProps)).toEqual('special');
  });

  it('should detect bulky AND heavy packages as "rejected"', () => {
    const packageProps: PackageProps = {
      width: 1000,
      height: 1000,
      length: 1000,
      mass: 1000,
    };

    expect(sortProps(packageProps)).toEqual('rejected');
  });
});
