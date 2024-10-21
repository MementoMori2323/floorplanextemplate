// components/SmplrSpaceViewer.js
import { useEffect } from 'react';

import { loadSmplrJs, Smplr } from '@smplrspace/smplr-loader';

export function initSpace(smplr: Smplr) {
  const space = new smplr.Space({
    spaceId: 'fbbf5027-cfd0-46c5-bca6-ddb5437f9b01',
    clientToken: 'pub_1d268106651947fc96f78d8782eb349c',
    containerId: 'smplr-viewer',
  });
  space.startViewer({
    preview: true,
    onReady: () => console.log('Viewer is ready'),
    onError: (error) => console.error('Could not start viewer', error),
  });
}

const SmplrSpaceViewer = () => {
  useEffect(() => {
    loadSmplrJs('umd')
      .then((smplr) => initSpace(smplr))
      .catch((error) => console.error(error));
  }, []);

  return <div id="smplr-viewer" style={{ width: '100%', height: '600px' }} />;
};

export default SmplrSpaceViewer;
