import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import '../styles/App.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, Loader, Center } from '@mantine/core';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';
import { IconX } from '@tabler/icons-react';
import { theme } from '../theme';
import { supabase } from '@/Supabase/supabaseclient';

// Context to provide user metadata and role across the app
export const UserDataContext = createContext(null);

// Custom hook to manage session
const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get the session data from Supabase
        const { data, error } = await supabase.auth.getSession();

        if (error || !data?.session) {
          const publicRoutes = ['/', '/signup', '/forgot'];
          const isPublicRoute = publicRoutes.includes(router.pathname);

          if (!isPublicRoute) {
            // Redirect to login page if session is missing and it's not a public route
            router.replace('/');
            notifications.show({
              title: 'Access Denied',
              message: 'You must login to authenticate.',
              color: 'red',
              icon: <IconX />,
            });
          }
        } else {
          // Session is available, set it
          setSession(data.session);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  return { session, loading };
};

// Main app component
export default function App({ Component, pageProps }: AppProps) {
  const { session, loading } = useSession(); // Use the session hook
  const [userMetadata, setUserMetadata] = useState(null);
  const [myRole, setmyRole] = useState(null); // State to hold user role

  // Once session is loaded, fetch the user metadata
  useEffect(() => {
    if (session) {
      const fetchUserMetadata = async () => {
        try {
          const { data: userData, error } = await supabase.auth.getUser();
          if (error) {
            console.error('Error fetching user data:', error);
          } else if (userData.user) {
            setUserMetadata(userData.user.user_metadata);
            // console.log('User metadata:', userData.user.user_metadata);

            // Fetch user role from profiles table
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', userData.user.id)
              .single();

            if (profileError) {
              console.error('Error fetching profile data:', profileError);
            } else {
              setmyRole(profileData.role); // Set the user's role
              // console.log('User role:', profileData.role);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserMetadata();
    }
  }, [session]);

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
        <UserDataContext.Provider value={{ userMetadata, myRole }}>
          <Component {...pageProps} />
        </UserDataContext.Provider>
      )}
    </MantineProvider>
  );
}
