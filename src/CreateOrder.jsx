import React from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  Select, TextInput, Header, Title, Button, Grid,
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
    <form
      name="create-order"
      data-testid="form"
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <Grid justify="center">
        <Grid.Col span={12}>
          <Header height={60} pt="xs">
            <Title order={1} size="h2">Create Order</Title>
          </Header>
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            data-testid="vendor-select"
            searchable
            clearable
            withAsterisk
            label="Vendor"
            name="vendor"
            maxDropdownHeight={280}
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            nothingFound="Vendor Not Found"
            data={[
              'The Paper Supply Co.',
              'Beef Jerky Inc.',
              'Boxes & More',
            ]}
            size="md"
            clearButtonProps={{ 'aria-label': 'Clear select field' }}
            {...form.getInputProps('vendor')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            withAsterisk
            size="md"
            name="orderTitle"
            label="Order Title"
            {...form.getInputProps('orderTitle')}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            type="submit"
            size="md"
            fullWidth
          >
            Next
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}
