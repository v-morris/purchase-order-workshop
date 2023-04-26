import React from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  Select, TextInput, Header, Title, Button, Grid,
} from '@mantine/core';

export default function CreateOrder() {
  const [searchValue, setSearchValue] = React.useState('');
  const [vendors, setVendors] = React.useState([]);

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

  React.useEffect(() => {
    const fetchVendors = async () => {
      const response = await fetch('http://localhost:9000/vendors');
      const isContentTypeJson = response.headers.get('content-type')?.includes('application/json');

      /** Handle error response from backend or send generic error details */
      const responseData = isContentTypeJson
        ? await response.json()
        : { status: response.status, statusText: response.statusText };

      if (!response.ok) {
        return Promise.reject(responseData);
      }

      return Promise.resolve(responseData);
    };

    fetchVendors()
      .then((response) => setVendors(response))
      .catch((error) => console.error('Logging Error', error));
  }, []);

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
            data={vendors}
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
