export interface PackageProps
{
  width: number;
  height: number;
  length: number;
  mass: number;
}

/**
 * sort: Generate a PackageProps definition of a package's volume
 *   and mass, passing to sortProps.
 * @param width Package width (cm)
 * @param height Package height (cm)
 * @param length Package length (cm)
 * @param mass Weight of package (kg)
 * @returns String matching 'standard', 'special', or 'rejected'
 */
export function sort(width: number, height: number, length: number, mass: number): string
{
  const packageProps = { width, height, length, mass };
  return sortProps(packageProps);
}

/**
 * sortProps: Provided a PackageProps definition of a package volume/mass,
 *   determine its package type and return a string indicating
 *   the stack it belongs in.
 *   - Package attributes:
 *     - Package is 'bulky' if volume >= 1M cm^3, or if one dimension
 *       is >= 150cm
 *     - Package is 'heavy' if mass >= 20kg
 *   - Package Stacks:
 *     - STANDARD: Not bulky or heavy, can be handled normally.
 *     - SPECIAL: Heavy or bulky, cannot be handled automatically.
 *     - REJECTED: Heavy and bulky, cannot be handled at all.
 * @param packageProps Package volume/mass properties
 * @returns String matching 'standard', 'special', or 'rejected'
 */
export function sortProps(packageProps: PackageProps): string {
  validatePackageProps(packageProps);

  const isHeavy = checkHeavy(packageProps.mass);
  const isBulky = checkBulky(packageProps.width, packageProps.height, packageProps.length);

  if (isHeavy && isBulky)
  {
    return 'rejected';
  }
  else if (isHeavy || isBulky)
  {
    return 'special';
  }
  else
  {
    return 'standard';
  }
}

const validatePackageProps = (packageProps: PackageProps): boolean => {
  if ((packageProps.width <= 0) ||
      (packageProps.height <= 0) ||
      (packageProps.length <= 0))
  {
    throw new Error('Invalid package dimensions!');
  }
  if ((packageProps.mass <= 0))
  {
    throw new Error('Invalid package mass!');
  }

  return true;
}

export const checkHeavy = (mass: number): boolean => {
  return mass >= 20.0;
}

export const checkBulky = (width: number, height: number, length: number): boolean => {
  // Volume >= 1,000,000 cm^3
  const volume = getVolume(width, height, length);
  const isTooBig = volume >= 1000000.0;

  // Check all dimensions for length >= 150 cm
  const isTooLong = longestDimension(width, height, length) >= 150.0;

  return (isTooBig || isTooLong);
}

export const getVolumeFromProps = (props: PackageProps): number => {
  return getVolume(props.width, props.height, props.length);

}

export const getVolume = (width: number, height: number, length: number): number => {
  return width * height * length;
}

export const longestDimensionFromProps = (props: PackageProps): number => {
  return longestDimension(props.width, props.height, props.length);
}

export const longestDimension = (width: number, height: number, length: number): number => {
  return Math.max(width, length, height);
}
