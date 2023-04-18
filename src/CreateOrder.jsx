import React from 'react';
import { useForm } from '@mantine/form';
import {
  Select, TextInput, Stack, Header, Title, Button, Grid,
} from '@mantine/core';

export default function CreateOrder() {
  const [searchValue, onSearchChange] = React.useState('');

  const form = useForm({
    initialValues: {
      vendor: '',
      orderTitle: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack spacing="xl">
        <Grid justify="center">
          <Grid.Col span={12}>
            <Header height={60} pt="xs">
              <Title order={1} size="h2">Create Order</Title>
            </Header>
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              searchable
              clearable
              withAsterisk
              label="Vendor"
              maxDropdownHeight={280}
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              nothingFound="Vendor Not Found"
              data={['React', 'Angular', 'Svelte', 'Vue']}
              size="md"
              {...form.getInputProps('vendor')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              size="md"
              label="Order Title"
              {...form.getInputProps('orderTitle')}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Button type="submit" size="md" fullWidth>
              Next
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </form>
  );
}
