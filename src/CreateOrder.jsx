import React from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  Select, TextInput, Stack, Header, Title, Button, Grid,
} from '@mantine/core';

export default function CreateOrder() {
  const [searchValue, setSearchValue] = React.useState('');

  const validationSchema = z.object({
    vendor: z.string({ invalid_type_error: 'Vendor is required' })
      .trim().min(1, { message: 'Vendor is required' })
      .max(50, { message: 'Vendor cannot be more than 50 characters in length' }),
    orderTitle: z.string()
      .trim().min(1, { message: 'Order Title is required' })
      .max(50, { message: 'Order Title cannot be more than 50 characters in length' }),
  });

  const form = useForm({
    initialValues: {
      vendor: '',
      orderTitle: '',
    },
    validate: zodResolver(validationSchema),
  });

  return (
    <form>
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
              onSearchChange={setSearchValue}
              searchValue={searchValue}
              nothingFound="Vendor Not Found"
              data={['React', 'Angular', 'Svelte', 'Vue']}
              size="md"
              clearButtonProps={{ 'aria-label': 'Clear select field' }}
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
            <Button
              type="button"
              size="md"
              fullWidth
              onClick={() => form.validate()}
            >
              Next
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </form>
  );
}
