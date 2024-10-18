'use client';

import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Anchor,
  Button,
  Alert,
  Group,
  Space,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/Supabase/supabaseclient';

export function Signup() {
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSignUp = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // Rename the destructured error variable to avoid shadowing
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          email,
        },
      },
    });

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
    } else {
      notifications.show({
        title: 'Account Created Successfully',
        message: 'You have successfully created an account.',
        color: 'green',
        icon: <IconCheck />,
      });
      router.push('/');
    }
  };

  const isLargeScreen = useMediaQuery('(min-width: 1366px)');
  const isMediumScreen = useMediaQuery('(min-width: 932px) and (max-width: 1365px)');
  const isSmallScreen = useMediaQuery('(max-width: 480px)');

  const getWidth = () => {
    if (isLargeScreen) return 170;
    if (isMediumScreen) return 300;
    if (isSmallScreen) return '100%';
    return 300;
  };
  return (
    <Container size={450} my={40}>
      <Title ta="center">Create an Account</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert icon={<IconAlertTriangle size={16} />} title="Error" color="red" mb={15}>
            {error}
          </Alert>
        )}

        <Group>
          <TextInput
            label="First Name"
            placeholder="Beatriz"
            required
            value={first_name}
            onChange={(e) => setFirstname(e.currentTarget.value)}
            w={getWidth()}
          />

          <TextInput
            label="Last Name"
            placeholder="Pinzón"
            required
            value={last_name}
            onChange={(e) => setLastname(e.currentTarget.value)}
            w={getWidth()}
          />
        </Group>

        <Space h="sm" />

        <TextInput
          label="Email"
          placeholder="you@example.com"
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
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          mt="md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <Button fullWidth mt="xl" onClick={handleSignUp} loading={loading}>
          Sign Up
        </Button>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component="button" onClick={() => router.push('/')}>
            Sign in
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}

export default Signup;
