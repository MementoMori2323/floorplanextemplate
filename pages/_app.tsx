import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import '../styles/App.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, Loader, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IconX } from '@tabler/icons-react';
import { theme } from '../theme';
import { supabase } from '@/Supabase/supabaseclient';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

// App authentication setup-------------------------------------------
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      const publicRoutes = ['/', '/signup', '/forgot'];
      const isPublicRoute = publicRoutes.includes(router.pathname);

      if (!user && !isPublicRoute) {
        // If user is not logged in and tries to access a protected page, redirect to login
        router.replace('/'); // Use replace to avoid storing the wrong history
        notifications.show({
          title: 'Access Denied',
          message: 'You must login to authenticate.',
          color: 'red',
          icon: <IconX />,
        });
      } else if (user && isPublicRoute) {
        // If the user is logged in and tries to access a public route like login/signup
        router.replace('/floorplan');
      } else {
        // If the session is valid, or the user is on a public route, no redirection
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);
// ------------------------------------------------------------------

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Head>
        <title>Artix - Floorplan App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      {/* Show loader while authentication check is in progress */}
      {loading ? (
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      ) : (
        <Component {...pageProps} />
      )}
    </MantineProvider>
  );
}
