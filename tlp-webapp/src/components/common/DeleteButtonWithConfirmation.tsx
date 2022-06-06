import { Button, Group, Modal, Space, Text } from '@mantine/core';
import { useState } from 'react';
import { Trash } from 'tabler-icons-react';

export interface DeleteButtonProps {
  label: string;
  callback: () => void;
}

export default function DeleteButtonWithConfirmation({ label, callback }: DeleteButtonProps) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Are you sure?">
        <Text>This item will be deleted irrecoverably.</Text>
        <Space h="md" />
        <Group spacing="xs">
          <Button variant="filled" color="red" onClick={() => callback()}>
            Yes, I am sure
          </Button>
          <Button variant="subtle" color="dark" onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Button
        variant="subtle"
        color="red"
        leftIcon={<Trash />}
        onClick={() => setModalOpened(true)}
      >
        {label}
      </Button>
    </>
  );
}
