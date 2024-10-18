import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
} from '@mantine/core';
import { supabase } from '@/Supabase/supabaseclient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(''); // Renamed to loginError
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setLoginError(''); // Reset the error state

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setLoginError(error.message); // Use the renamed error variable
    } else {
      router.push('/floorplan'); // Redirect to the homepage or dashboard after successful login
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>

      {loginError && <Alert title="Error" color="red" mb={15}>{loginError}</Alert>} {/* Use the renamed error variable */}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm" onClick={() => router.push('/forgot')}>
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin} loading={loading}>
          Sign in
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button" onClick={() => router.push('/signup')}>
            Create account
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
