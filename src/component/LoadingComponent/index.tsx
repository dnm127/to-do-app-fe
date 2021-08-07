import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingComponent() {
  return (
    <div style={{ textAlign: 'center', padding: 10 }}>
      <CircularProgress />
    </div>
  );
}
