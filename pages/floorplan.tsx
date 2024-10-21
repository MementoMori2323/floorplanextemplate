'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell, Burger, Group, Image, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

import ArtixLogo from '@/components/images/Reportz Logo.png';
import NavbarSection from '@/components/Navbar/Navbar';
import SmplrSpaceViewer from './viewer';
import { supabase } from '@/Supabase/supabaseclient';

export default function FloorPlan() {
  const [opened, { toggle }] = useDisclosure();

  // Authentication process to access website----------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      } else {
        router.push('/');
        notifications.show({
          title: 'Error',
          message: 'Login to authenticate', // Display the ID of the new report
          color: 'red',
          icon: <IconX />,
        });
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }
  // -----------------------------------------------------------------

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 100, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Image src={ArtixLogo.src} alt="Reportz Logo" style={{ height: 60 }} />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarSection />
      </AppShell.Navbar>
      <AppShell.Main>
        <SmplrSpaceViewer />
      </AppShell.Main>
    </AppShell>
  );
}
