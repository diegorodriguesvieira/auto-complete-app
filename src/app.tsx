import { AutoComplete } from 'components/auto-complete';
import { Card } from 'components/card';
import { Container } from 'components/container';
import { Label } from 'components/label';
import { OptionType } from 'components/option/option';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useUsersSearch } from './use-users-search';

const MIN_SEARCH_LENGTH = 2;
const NEXT_SEARCH_DELAY = 200;

function App() {
  const [query, setQuery] = useState('');

  const [value, setValue] = useState<OptionType | undefined>();

  const debouncedQuery = useDebounce(query, NEXT_SEARCH_DELAY);

  const shouldQueryUsers = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  const { data: users, isLoading } = useUsersSearch(debouncedQuery, {
    enabled: shouldQueryUsers,
  });

  const handleChangeTextField = (value: string) => setQuery(value);

  const handleSelect = (value?: OptionType) => setValue(value);

  const userOptions = useMemo(
    () => users.map((user) => ({ value: user.id, label: user.name })),
    [users],
  );

  return (
    <Container>
      <Card>
        <Label htmlFor="users">Search by user name:</Label>
        <AutoComplete
          id="users"
          loading={isLoading}
          onChangeTextField={handleChangeTextField}
          onSelect={handleSelect}
          options={userOptions}
          placeholder="For ex.: Sandra"
          value={value}
        />
        {value && (
          <pre>
            <code>{JSON.stringify(value)}</code>
          </pre>
        )}
      </Card>
    </Container>
  );
}

export default App;
