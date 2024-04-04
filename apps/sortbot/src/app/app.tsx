// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';

import {
  sortProps,
  PackageProps,
  getVolumeFromProps,
  longestDimensionFromProps,
  checkBulky,
  checkHeavy,
} from '@sortbot/sortbot-lib';

import classNames from 'classnames';

export function App() {
  const [packageProps, setPackageProps] = useState<PackageProps>({
    width: 0,
    height: 0,
    length: 0,
    mass: 0
  });
  const [volume, setVolume] = useState<number>(0);
  const [longestDim, setLongestDim] = useState<number>(0);
  const [isBulky, setIsBulky] = useState<boolean>(false);
  const [isHeavy, setIsHeavy] = useState<boolean>(false);

  const [stack, setStack] = useState<string>('');

  const updateInterface = (props: PackageProps) => {
    setPackageProps(props);

    if (props.width > 0
        && props.height > 0
        && props.length > 0)
    {
      setVolume(getVolumeFromProps(props));
      setIsBulky(checkBulky(props.width, props.height, props.length));
      setLongestDim(longestDimensionFromProps(props));
    }
    if (props.mass) {
      setIsHeavy(checkHeavy(props.mass));
    }

    updateStack(props);
  };

  const updateStack = (props: PackageProps) => {
    if ((props.width <= 0 || props.height <= 0 || props.length <= 0)
        || (props.mass <= 0))
    {
      return;
    }
    setStack(sortProps(props));
  }

  const stackCellStyle = (stackName: string) => {
    return `${stack === stackName ? 'stackCellHighlight' : 'stackCell'}`;
  }

  return (
    <div>
      <div>
        <h1>SortBot</h1>
        <h2>Enter volume & weight to sort package below.</h2>
        <ul>
          <li>
            <label>
              Width (cm):
              <input type="text"
                value={packageProps.width}
                onChange={(e) => updateInterface({ ...packageProps, width: parseFloat(e.target.value) || 0 })}
              />
            </label>
          </li>
          <li>
            <label>
              Height (cm):
              <input type="text"
                value={packageProps.height}
                onChange={(e) => updateInterface({ ...packageProps, height: parseFloat(e.target.value) || 0 })}
              />
            </label>
          </li>
          <li>
            <label>
              Length (cm):
              <input type="text"
                value={packageProps.length}
                onChange={(e) => updateInterface({ ...packageProps, length: parseFloat(e.target.value) || 0 })}
              />
            </label>
          </li>
          <li>
            <label>
              Mass (kg):
              <input type="text"
                value={packageProps.mass}
                onChange={(e) => updateInterface({ ...packageProps, mass: parseFloat(e.target.value) || 0 })}
              />
            </label>
          </li>
        </ul>
      </div>
      <div className="stacks">
        <h3>Stack Destination:</h3>
        <div id="standard" className={stackCellStyle('standard')}>STANDARD</div>
        <div id="special" className={stackCellStyle('special')}>SPECIAL</div>
        <div id="rejected" className={stackCellStyle('rejected')}>REJECTED</div>
      </div>
      <div className="derivedInfo">
        <ul>
          <li>
            <em>Volume: {volume || 'N/A'} (cubic cm)</em>
          </li>
          <li>
            <em>Longest Dimension: {longestDim || 'N/A'} (cm)</em>
          </li>
          <li>
            <em className={isBulky ? 'alertText' : ''}>
              Bulky: {isBulky ? 'Yes' : 'No'}
            </em>
          </li>
          <li>
            <em className={isHeavy ? 'alertText' : ''}>
              Heavy: {isHeavy ? 'Yes' : 'No'}
            </em>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
