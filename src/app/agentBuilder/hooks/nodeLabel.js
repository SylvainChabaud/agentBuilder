// NodeLabel.jsx
import { AppIcon } from './styles';
import { APPS_SVG } from '../constants';

const NodeLabel = ({ name, app, expertise, fileName }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    {APPS_SVG[app] && <AppIcon src={APPS_SVG[app]} alt={app} />}
    <span>{name}</span>
    {expertise && (
      <span style={{ fontSize: '0.8em', color: '#888' }}>{expertise}</span>
    )}
    {fileName && (
      <span style={{ fontSize: '0.5em', color: '#333' }}>{fileName}</span>
    )}
  </div>
);

export default NodeLabel;
