import { Alert, Box } from '@mantine/core';
import { AlertTriangle } from 'tabler-icons-react';

export interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <Box sx={{ maxWidth: 'max-content' }}>
      <Alert
        p="lg"
        icon={<AlertTriangle size={24} />}
        variant="filled"
        title="Oops, something went wrong"
        color="red"
      >
        {error.name}: {error.message}
      </Alert>
    </Box>
  );
}
