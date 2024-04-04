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

const checkHeavy = (mass: number): boolean => {
  return mass >= 20.0;
}

const checkBulky = (width: number, height: number, length: number): boolean => {
  // Volume >= 1,000,000 cm^3
  const volume = width * height * length;
  const isTooBig = volume >= 1000000.0;

  // Check all dimensions for length >= 150 cm
  const isTooLong = longestDimension(width, height, length) >= 150.0;

  return (isTooBig || isTooLong);
}

/**
 * longestDimension: Given a package's width, height, and length,
 *   return the value of the longest dimension.
 */
const longestDimension = (width: number, height: number, length: number): number => {
  return Math.max(width, length, height);
}
