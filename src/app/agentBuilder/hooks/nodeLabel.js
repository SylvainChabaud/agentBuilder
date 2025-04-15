import { AppIcon } from './styles';
import { APPS_SVG } from '../constants';

const NodeLabel = ({ name, app, expertise, fileName, isMixerEnabled }) => {
  // const hasMixerValue = isMixerEnabled === 'true' || isMixerEnabled === true;

  console.info('NodeLabel', isMixerEnabled);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        position: 'relative',
      }}
    >
      {APPS_SVG[app] && <AppIcon src={APPS_SVG[app]} alt={app} />}
      <span>{name}</span>
      {expertise && (
        <span style={{ fontSize: '0.8em', color: '#888' }}>{expertise}</span>
      )}
      {fileName && (
        <span style={{ fontSize: '0.5em', color: '#333' }}>{fileName}</span>
      )}
      {isMixerEnabled && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            left: '-35px',
            fontSize: '0.8em',
            color: 'OliveDrab',
            // transform: 'translateX(10px)', // Décale légèrement vers la droite pour plus de clarté
          }}
        >
          MIX
        </span>
      )}
    </div>
  );
};

export default NodeLabel;
